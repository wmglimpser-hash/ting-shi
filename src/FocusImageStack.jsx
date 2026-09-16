import { useEffect, useRef } from "react";
import { focusLayers } from "./focusLayers";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function FocusImageStack({ element = "木", playing = false }) {
  const rootRef = useRef(null);
  const layer = focusLayers[element] || focusLayers.木;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const paint = () => {
      frame = 0;
      root.style.setProperty("--pointer-x", `${targetX.toFixed(2)}px`);
      root.style.setProperty("--pointer-y", `${targetY.toFixed(2)}px`);
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      const rect = root.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = clamp(normalizedX * 6, -3, 3);
      targetY = clamp(normalizedY * 4, -2, 2);
      if (!frame) frame = requestAnimationFrame(paint);
    };

    root.addEventListener("pointermove", handlePointerMove);
    root.addEventListener("pointerleave", reset);

    return () => {
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerleave", reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [element]);

  return (
    <div
      ref={rootRef}
      className={`focus-image-stack ${layer.className} ${playing ? "is-playing" : ""}`}
      aria-hidden="true"
    >
      <div className="focus-image-aura" />
      <div className="focus-image-shadow" />
      <div className="focus-image-subject">
        <img key={layer.src} src={layer.src} alt="" draggable="false" />
      </div>
      <div className="focus-image-sheen" />
      <div className="focus-image-motes" />
      <div className="focus-image-ripple" />
    </div>
  );
}
