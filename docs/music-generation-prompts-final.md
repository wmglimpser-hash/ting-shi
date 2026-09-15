# 听时：十二时辰音乐生成提示词（正式版 v1.0）

本文件是可直接复制使用的正式提示词版本。每首提示词均为独立文本，不依赖其他章节。

## 五音的现代音高转译

本项目固定使用 C 宫五声音高池：

```text
宫 = 1 = Do = C4
商 = 2 = Re = D4
角 = 3 = Mi = E4
徵 = 5 = Sol = G4
羽 = 6 = La = A4
```

所有曲目只允许使用以下五个音级及其相邻八度：

```text
C、D、E、G、A
```

所有曲目禁止使用：

```text
F、B、半音经过音、西方大小调功能和声、强烈属—主终止
```

这里的 C4、D4、E4、G4、A4 是面向音乐生成模型的现代转译。传统五声音级通常对应现代简谱的 1、2、3、5、6；本项目进一步为每个五音指定一个现代中心音，便于模型执行。[乐理参考](https://szzy.7lue.cn/read/fd7dcb3e973001ea49af0cbb3b83aa5.md)

## 01｜子时 · 松影初生

**角 / 木｜中心音 E4｜音级 C-D-E-G-A｜42—48 BPM｜古琴、箫、埙**

```text
Create a 3 minute 50 second Chinese traditional ambient instrumental track titled “松影初生 / Pine Shadows Begin”. The scene is midnight in a remote mountain forest, with the mountain silhouette disappearing into ink-black darkness. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use E4 as the primary tonal center and emphasize the E-G-A-C-D modal color. The main melodic register is E3 to A4, with occasional xiao tones above A4; do not use F, B, chromatic passing tones, Western functional harmony or a strong dominant-to-tonic cadence.

Make guqin the intimate main instrument. Use sparse single-note plucks, natural harmonics, gentle slides and audible wood and string resonance; do not play virtuosic arpeggios. Place a very distant xiao behind it with long breathy tones and no fast runs. Let xun appear only once or twice as a low rounded shadow. Use free rubato phrasing with an implied 44 BPM breath, no drum beat and no fixed groove.

Structure the track in four stages: 0:00–0:45 one fragile two- or three-note E-centered motif; 0:45–2:10 slow upward fragments and open intervals; 2:10–3:15 a few more harmonics and distant xiao layers without increasing loudness; 3:15–3:50 gradual subtraction until only one quiet guqin resonance remains. Use close wooden-room sound for guqin, wide distant mountain reverb for xiao, low dynamics, long natural decay and a clean silence at the end. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, spoken voice, drums, EDM, pop structure, bright cheerful melody, heroic climax, cinematic trailer build, horror sound design, dense arrangement, synthetic lead, excessive echo, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 02｜丑时 · 埙息未明

**角 / 木｜中心音 E4｜音级 C-D-E-G-A｜38—44 BPM｜埙、古琴、箫**

```text
Create a 4 minute 05 second Chinese traditional ambient instrumental track titled “埙息未明 / Xun Breath Before Dawn”. The scene is the deepest part of the night just before dawn, with dark earth, slow breathing and no visible horizon. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use E4 as the primary tonal center, with the E-G-A-C-D modal color. Keep the principal melodic register between E3 and G4; do not use F, B, chromatic passing tones, Western functional harmony or a strong cadence.

Make xun the closest and most important instrument. Use warm, rounded, breathy low notes with long pauses and slight natural pitch movement. Use muted guqin plucks sparingly, mostly below E4, as thoughts appearing and disappearing. Place xiao far behind the xun as a thin cold stream of air, using long tones only. Use free rubato with an implied 40 BPM breath, no percussion and no repeating rhythmic pattern.

Structure the track in four stages: 0:00–0:55 low xun breaths around E4 and G3; 0:55–2:15 isolated guqin notes and faint upward E-centered fragments; 2:15–3:20 slightly more open xiao air while keeping the same low density; 3:20–4:05 remove layers and leave an unfinished upward contour. Use a dark peaceful room, soft low-mid resonance, restrained dynamics and short-to-medium natural reverb. The result should feel like hidden life before sunrise, not sadness or illness. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, spoken voice, beat, drums, sadness manipulation, horror, funeral mood, dramatic low bass, fast melody, bright dawn climax, lush orchestra, synthetic pad, excessive reverb, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 03｜寅时 · 窗隙见白

**商 / 金｜中心音 D4｜音级 C-D-E-G-A｜52—58 BPM｜箫、笛、古琴**

```text
Create a 3 minute 45 second Chinese traditional ambient instrumental track titled “窗隙见白 / White Light Through the Window”. The scene is the hour before sunrise, when dark blue slowly turns into blue-gray and the first light appears through a narrow window gap. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use D4 as the primary tonal center and emphasize the D-E-G-A-C modal color. Keep the main melodic register between D4 and A5; do not use F, B, chromatic passing tones, Western functional harmony or a major/minor pop cadence.

Make xiao the main voice with precise but gentle attacks, quiet breath noise and long clean tones. Add a few soft dizi harmonics in the upper register, never a virtuosic run. Let guqin answer with short dry phrases around D4 and A3, leaving large gaps between gestures. Use a loose 4/4 pulse around 56 BPM without drums, claps or bass groove.

Structure the track in four stages: 0:00–0:40 dark blue silence and one D4-centered xiao phrase; 0:40–1:55 short shang-colored phrases and pale dizi harmonics; 1:55–3:00 gradual opening of the upper register; 3:00–3:45 return to transparent space with one final D4 resonance. Use a cool transparent room, moderate natural decay, clear attacks and a wide but quiet stereo image. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, fast flute solo, festive morning music, harsh metallic noise, ritual grandeur, pop rhythm, dramatic crescendo, digital coldness, dense reverb wash, synthetic lead, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 04｜卯时 · 露落清商

**商 / 金｜中心音 D4｜音级 C-D-E-G-A｜58—64 BPM｜笛、箫、磬、古琴**

```text
Create a 3 minute 40 second Chinese traditional ambient instrumental track titled “露落清商 / Dew Falling in Clear Shang”. The scene is early morning after sunrise, with dew still on grass and a clean breeze moving through pale leaves. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use D4 as the primary tonal center and emphasize the D-E-G-A-C modal color. Keep the melodic register between D4 and A5; do not use F, B, chromatic passing tones, Western functional harmony or a strong final cadence.

Let dizi lead with soft airy phrases, precise entrances and no fast runs. Use xiao to lengthen the space between phrases. Add one or two very distant qing tones in the entire track as quiet points of light, never as a ritual pattern. Let guqin provide a few dry D4-centered plucked replies. Use a barely perceptible 60 BPM pulse, but no drum kit, shaker or repeated groove.

Structure the track in four stages: 0:00–0:35 dew-like silence and one clear D4 tone; 0:35–1:45 short dizi phrases with clean pauses; 1:45–2:55 a slightly brighter upper register with more air, not more volume; 2:55–3:40 gradual reduction of density and one distant qing decay. Use transparent morning ambience, light natural reverb, restrained dynamics and clear silence between phrases. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, Chinese festival sound, rapid dizi runs, loud bells, ceremonial grandeur, commercial relaxation music, pop drums, heroic melody, icy digital texture, excessive echo, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 05｜辰时 · 山腹承光

**宫 / 土｜中心音 C4｜音级 C-D-E-G-A｜54—60 BPM｜笙、埙、古琴**

```text
Create a 4 minute 10 second Chinese traditional ambient instrumental track titled “山腹承光 / The Mountain Holds the Light”. The scene is mid-morning in a broad mountain valley, when sunlight becomes stable and the air feels supported by the earth. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use C4 as the primary tonal center and emphasize the C-D-E-G-A gong-mode color. Keep the main register between C3 and E5; do not use F, B, chromatic passing tones, Western functional harmony or a strong dominant-to-tonic cadence.

Let sheng create a soft sustained breath-like bed without becoming an organ or synth pad. Let xun add warm rounded low-mid notes around C3 and G3. Use guqin for sparse grounded phrases that repeatedly return to C4. Use a slow 56 BPM internal breath with no visible percussion and no repeating bass groove.

Structure the track in four stages: 0:00–0:50 one centered C4 tone and distant valley air; 0:50–2:05 sheng breath enters and establishes the earth-like floor; 2:05–3:20 guqin adds a few balanced phrases while the center remains stable; 3:20–4:10 remove the upper detail and settle gently on C4. Use a wide valley reverb with a clear central image, warm medium frequencies, low dynamic contrast and natural acoustic texture. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, temple ceremony, funeral mood, horror, heavy sub-bass drone, orchestral swell, dense ornament, dramatic climax, synthetic ambient pad, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 06｜巳时 · 溪石温声

**宫 / 土｜中心音 C4｜音级 C-D-E-G-A｜62—68 BPM｜古琴、笙、箫、极轻水声**

```text
Create a 3 minute 55 second Chinese traditional ambient instrumental track titled “溪石温声 / Warm Voices of Stream Stones”. The scene is late morning beside a shallow stream, where stones have warmed in the sunlight and water carries sound into the distance. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use C4 as the primary tonal center and emphasize the C-D-E-G-A gong-mode color. Keep the melodic register between C3 and G4; do not use F, B, chromatic passing tones, Western functional harmony or a pop-style cadence.

Use guqin as the main melodic instrument with rounded unhurried phrases, soft slides and audible plucked transients. Let sheng provide a quiet sustained breath. Add occasional xiao lines that follow the direction of the stream, using long tones rather than fast melodies. Include only a subtle natural water texture below the music. Use a gentle 64 BPM flow with no drum groove.

Structure the track in four stages: 0:00–0:40 stable C4 and distant water; 0:40–1:50 guqin phrases establish a warm center; 1:50–3:00 xiao and sheng create more flowing motion without changing the tonal center; 3:00–3:55 the stream remains while the instruments return to sparse C4-centered gestures. Use warm medium frequencies, clear plucks, a sunlit outdoor reverb and modest stereo movement. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, new-age water cliché, spa music, heavy percussion, fast arpeggios, dramatic melody, exaggerated river sound, synthetic bells, commercial Chinese-style arrangement, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 07｜午时 · 日中有弦

**徵 / 火｜中心音 G4｜音级 C-D-E-G-A｜70—76 BPM｜琵琶、笛、古琴**

```text
Create a 3 minute 50 second Chinese traditional ambient instrumental track titled “日中有弦 / Strings in Midday Light”. The scene is noon on a clear mountain day, with abundant light and sharply visible contours. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use G4 as the primary tonal center and emphasize the G-A-C-D-E zhi-mode color. Keep the principal register between G3 and C5; do not use F, B, chromatic passing tones, Western functional harmony or a heroic cadence.

Let pipa provide sparse precise plucked particles and gentle forward motion, never a virtuosic solo. Let dizi open the upper register with warm sunlit phrases. Let guqin leave quiet space between the brighter gestures and occasionally return to G4. Use a light 72 BPM articulated pulse without drum kit, trap beat or pop groove.

Structure the track in four stages: 0:00–0:35 clear G4 and one bright pipa gesture; 0:35–1:45 pipa and dizi begin a restrained forward flow; 1:45–3:05 the register opens and the light reaches its clearest point; 3:05–3:50 remove the pipa motion and release into open air. Keep the sound acoustic, transparent and energetic without becoming loud. Use a bright outdoor room with short-to-medium natural reverb. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, EDM, pop drums, action soundtrack, heroic climax, aggressive pipa virtuosity, festival music, brass, large orchestra, commercial advertisement sound, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 08｜未时 · 坡风流金

**徵 / 火｜中心音 G4｜音级 C-D-E-G-A｜76—84 BPM｜琵琶、笛、古琴、极少磬声**

```text
Create a 4 minute 00 second Chinese traditional ambient instrumental track titled “坡风流金 / Golden Wind Over the Slope”. The scene is afternoon wind moving down a long sunlit hillside, carrying a warm golden color and the first hint of the day turning westward. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use G4 as the primary tonal center and emphasize the G-A-C-D-E zhi-mode color. Keep the melodic register between G3 and D5; do not use F, B, chromatic passing tones, Western functional harmony or a triumphant cadence.

Let pipa create repeating but spacious plucked patterns suggesting walking wind, never a busy ostinato. Let dizi answer in long phrases, and let guqin soften transitions with sparse low G-centered notes. Add no more than two very quiet qing accents in the entire track, like distant light. Use a natural 80 BPM forward motion with no modern drum beat and no bass groove.

Structure the track in four stages: 0:00–0:40 open slope and a sparse G4 pulse; 0:40–1:50 pipa establishes a broken, spacious walking pattern; 1:50–3:00 dizi opens the air while the pipa remains restrained; 3:00–4:00 the upper register and brightness gradually fall away into wind and one long resonance. Use warm stereo movement, moderate outdoor reverb and clear acoustic transients. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, dance beat, folk festival, rapid pipa virtuosity, action or travel soundtrack, heroic melody, loud percussion, bright advertising music, synthetic bass, abrupt ending, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 09｜申时 · 云过深碧

**羽 / 水｜中心音 A4｜音级 C-D-E-G-A｜54—60 BPM｜箫、古琴、埙**

```text
Create a 3 minute 58 second Chinese traditional ambient instrumental track titled “云过深碧 / Clouds Over Deep Green Water”. The scene is late afternoon, when cloud shadows become longer and blue-green distance begins to replace the brightness of noon. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use A4 as the primary tonal center and emphasize the A-C-D-E-G yu-mode color. Keep the principal melodic register between A3 and E5; do not use F, B, chromatic passing tones, Western functional harmony or a tragic minor-key cadence.

Let xiao carry long remote lines with gentle descending gestures and audible breath. Let guqin provide sparse close plucks with natural string decay. Let xun add only a low rounded undertone at important transitions. Use a free-rubato feel with an implied 56 BPM breath, no beat-driven rhythm and no repeating bass pattern.

Structure the track in four stages: 0:00–0:45 distant A4-centered xiao and open silence; 0:45–1:55 close guqin notes enter as moving reflections; 1:55–3:10 xun deepens the lower field while the melody descends and returns; 3:10–3:58 remove the lower layer and let the final A4 resonance dissolve. Use layered distance: guqin close, xiao far, xun beneath. Keep the mood fluid and contemplative rather than sad. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, sadness manipulation, horror ambience, thunder, heavy cinematic bass, sleep-music cliché, dense low drone, excessive echo, dramatic ending, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 10｜酉时 · 钟沉暮水

**羽 / 水｜中心音 A4｜音级 C-D-E-G-A｜44—50 BPM｜箫、磬、古琴、埙**

```text
Create a 4 minute 15 second Chinese traditional ambient instrumental track titled “钟沉暮水 / A Bell Sinks Into Evening Water”. The scene is sunset and early dusk, when the mountain silhouette closes and one distant sound travels over mist. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use A4 as the primary tonal center and emphasize the A-C-D-E-G yu-mode color. Keep the melodic register between A3 and D5; do not use F, B, chromatic passing tones, Western functional harmony or a dramatic final cadence.

Make xiao the main distant voice with slow descending lines and long breath. Let guqin appear close and sparse in the foreground, using isolated A4-centered plucks. Add only one or two qing tones across the entire piece; each must decay for a long time and feel far away, never ceremonial. Let xun support the lowest register very gently. Use free time with an implied 46 BPM breath, very low density and no repeating beat.

Structure the track in four stages: 0:00–0:55 empty dusk air and the first distant xiao phrase; 0:55–2:05 one close guqin phrase and one qing resonance; 2:05–3:20 wider mist, slower descending xiao and extremely soft xun; 3:20–4:15 no new material, only the final resonance disappearing by itself. Make the space larger than the melody: wide dusk air, soft mist, natural long decay and clear silence. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, temple ritual, bell choir, horror, funeral music, cinematic sadness, heavy reverb wash, bass swell, constant percussion, dramatic resolution, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 11｜戌时 · 灯影未冷

**徵·余烬 / 火｜中心音 G4｜音级 C-D-E-G-A｜42—48 BPM｜古琴、箫、极少琵琶**

```text
Create a 3 minute 45 second Chinese traditional ambient instrumental track titled “灯影未冷 / The Lamp Shadow Is Still Warm”. The scene is early night indoors, with a small lamp connecting warm human space to the surrounding darkness. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use G4 as the primary tonal center, but keep the G-A-C-D-E zhi-mode color subdued and inward. Keep the main melodic register between G3 and C5; do not use F, B, chromatic passing tones, Western functional harmony or a bright fire-like cadence.

Let guqin be the closest and primary instrument, with slow intimate plucks, soft resonance and very restrained slides. Use xiao only as a distant breath at the edges. Allow one or two isolated pipa notes to suggest fading warmth rather than rhythm. Use an almost absent pulse around 44 BPM, with no drums and no repeating pattern.

Structure the track in four stages: 0:00–0:45 one warm G4-centered guqin phrase in a small room; 0:45–1:55 sparse xiao breath enters around the edges; 1:55–3:00 one or two pipa sparks appear and fade; 3:00–3:45 gradually reduce high frequencies, brightness and activity until only room tone remains. Use a small wooden room, gentle natural reverb, close perspective and a quiet ending that feels held rather than closed. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, lullaby cliché, sentimental film score, bright fire music, repetitive pipa rhythm, drums, dramatic chord progression, dark horror, synthetic pad, excessive echo, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 12｜亥时 · 月行归寂

**徵·余烬 / 火｜中心音 G4｜音级 C-D-E-G-A｜38—44 BPM｜箫、古琴、埙**

```text
Create a 4 minute 20 second Chinese traditional ambient instrumental track titled “月行归寂 / The Moon Returns to Silence”. The scene is deep night beneath a high moon, with pale light crossing a quiet room and the last warmth of the day turning inward. Use A=440 Hz as the modern reference pitch. Use only the C-D-E-G-A pentatonic pitch collection in all octaves; use G4 as the primary tonal center, with a very subdued G-A-C-D-E zhi-mode color. Keep the principal melodic register between G3 and D5; do not use F, B, chromatic passing tones, Western functional harmony or a tragic minor-key cadence.

Alternate between long xiao breaths and sparse guqin phrases. Use xun only as a soft low shadow near the middle. Favor slow descending and returning gestures that eventually settle near G4. Use free rubato with an implied 40 BPM breath, almost no pulse, no percussion and no repeating accompaniment.

Structure the track in four stages: 0:00–0:55 intimate guqin and a faint G4-centered warmth; 0:55–2:05 xiao opens a moonlit distance; 2:05–3:20 xun briefly deepens the lower register while the melody descends and returns; 3:20–4:20 remove every layer except one final G4-related resonance and clean silence. Avoid tragedy: the emotional direction is release, not sorrow. Use natural acoustic decay, restrained dynamics and a gradual widening of space. Instrumental only, no vocals.
```

```text
Negative prompt: vocals, lyrics, chanting, sleep-music cliché, tragic film score, horror, heavy bass, dramatic ending, dense orchestration, synthetic lead, constant flute melody, excessive echo, F, B, chromatic notes, Western functional chord progression, healing or medical claims.
```

## 生成后检查

每首生成后必须检查：

- 是否真的围绕指定中心音停留，而不是只呈现“中国风”音色。
- 是否出现 F、B 或明显半音经过音。
- 是否出现西方大小调式的强烈终止。
- 主导乐器是否符合提示词中的近景/远景关系。
- 五音差异是否体现在旋律运动，而不仅是音色差异。
- 是否仍然保持 3:30—4:30、纯器乐、低戏剧性和可持续聆听。

文字提示可以提高五音遵循度，但不能保证生成模型百分之百遵守音高。若模型支持 MIDI、音符约束或后期编辑，应进一步用 C-D-E-G-A 的 MIDI 音符集合进行校验。
