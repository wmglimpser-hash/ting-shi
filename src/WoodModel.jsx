import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const MODEL_URL = "/models/wood.glb";

export default function WoodModel({
  playing,
  breathing,
  visible,
  onReady,
  onError,
}) {
  const mountRef = useRef(null);
  const playingRef = useRef(playing);
  const breathingRef = useRef(breathing);
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    breathingRef.current = breathing;
  }, [breathing]);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    let resizeObserver;
    let animationFrame = 0;
    let disposed = false;
    let modelRoot;
    let loadedScene;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
      camera.position.set(0, 0.08, 4.6);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.domElement.setAttribute("aria-hidden", "true");
      mount.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xd9d5c4, 0x131912, 1.8));

      const keyLight = new THREE.DirectionalLight(0xffead1, 3.1);
      keyLight.position.set(-3.5, 4.5, 5);
      scene.add(keyLight);

      const warmFill = new THREE.PointLight(0xb87955, 1.3, 8);
      warmFill.position.set(3, 0.5, 2.5);
      scene.add(warmFill);

      const coolRim = new THREE.DirectionalLight(0x78958b, 1.6);
      coolRim.position.set(0, 3, -4);
      scene.add(coolRim);

      modelRoot = new THREE.Group();
      modelRoot.rotation.y = -0.18;
      scene.add(modelRoot);

      const resize = () => {
        if (!renderer) return;
        const rect = mount.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);

      new GLTFLoader().load(
        MODEL_URL,
        (gltf) => {
          if (disposed) return;

          loadedScene = gltf.scene;
          const bounds = new THREE.Box3().setFromObject(loadedScene);
          const size = bounds.getSize(new THREE.Vector3());
          const center = bounds.getCenter(new THREE.Vector3());
          const largestSide = Math.max(size.x, size.y, size.z) || 1;

          loadedScene.position.set(-center.x, -center.y, -center.z);
          loadedScene.scale.setScalar(2.5 / largestSide);
          loadedScene.traverse((object) => {
            if (!object.isMesh) return;
            object.frustumCulled = false;
            object.castShadow = true;
            object.receiveShadow = true;
          });

          modelRoot.add(loadedScene);
          onReadyRef.current?.();
        },
        undefined,
        () => {
          if (!disposed) onErrorRef.current?.();
        },
      );

      const startedAt = performance.now();
      const animate = () => {
        if (disposed) return;

        const elapsed = (performance.now() - startedAt) / 1000;
        if (modelRoot) {
          const canBreathe = breathingRef.current;
          const playbackPulse = playingRef.current && canBreathe
            ? Math.sin(elapsed * 2.2) * 0.012
            : 0;
          const float = canBreathe ? Math.sin(elapsed * 0.72) * 0.018 : 0;

          modelRoot.rotation.y = -0.18 + Math.sin(elapsed * 0.16) * 0.065;
          modelRoot.rotation.x = Math.sin(elapsed * 0.22) * 0.012;
          modelRoot.position.y = canBreathe ? Math.sin(elapsed * 0.7) * 0.022 : 0;
          modelRoot.scale.setScalar(1 + float + playbackPulse);
        }

        renderer.render(scene, camera);
        animationFrame = requestAnimationFrame(animate);
      };

      animate();
    } catch {
      onErrorRef.current?.();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();

      if (loadedScene) {
        loadedScene.traverse((object) => {
          if (!object.isMesh) return;
          object.geometry?.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => {
            if (!material) return;
            Object.values(material).forEach((value) => {
              if (value?.isTexture) value.dispose();
            });
            material.dispose();
          });
        });
      }

      renderer?.dispose();
      renderer?.forceContextLoss?.();
      if (renderer?.domElement?.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={"wood-model-canvas " + (visible ? "is-visible" : "")}
    />
  );
}
