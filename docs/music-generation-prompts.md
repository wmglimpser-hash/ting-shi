# 听时：音乐生成提示词设计稿 v0.1（已归档）

> 正式可复制版本已迁移至 [music-generation-prompts-final.md](./music-generation-prompts-final.md)。本文件保留早期讨论过程，不再作为生成提示词的唯一依据。

## 设计结论

本项目先设计 **5 个五音母体**，再由它们生成 **12 个时辰变体**。

这样做的原因是：

- 五音负责建立项目统一的声音语法。
- 时辰负责改变光线、密度、速度、音区和空间。
- 传统乐器负责提供具体的音色与呼吸。
- 每首曲子仍然可以有独立标题和独立情绪，不会变成同一首音乐的简单复制。

这里的中医理论用于构建审美和叙事关系，不用于诊断、治疗或承诺具体健康功效。提示词中使用“木性的生发感”“水性的深远感”等艺术描述，不使用“调理肝脏”“疏通经络”“治疗失眠”等医学承诺。

## 现代音高约束（正式采用）

为了让音乐模型真正理解五音，本项目采用一套明确的现代音高转译：

```text
宫 = 1 = Do = C4
商 = 2 = Re = D4
角 = 3 = Mi = E4
徵 = 5 = Sol = G4
羽 = 6 = La = A4
```

基础音高池固定为：

```text
C4 - D4 - E4 - G4 - A4
```

也就是现代简谱的 `1、2、3、5、6`，明确排除 `4（F）` 和 `7（B）`。这是一种面向音乐生成模型的固定转译，不是声称古代所有乐律都以现代 C4 为绝对音高。

五种音乐不是换五套完全不同的音阶，而是使用同一组五声音高，并改变中心音：

| 五音母体 | 简谱位置 | 现代中心音 | 生成时的中心感 |
|---|---:|---|---|
| 宫 / 土 | 1 | C4 | C4 为稳定落点，C-D-E-G-A 为音高池 |
| 商 / 金 | 2 | D4 | D4 为主要停留音，D-E-G-A-C 为旋律重心 |
| 角 / 木 | 3 | E4 | E4 为主要停留音，E-G-A-C-D 向上生发 |
| 徵 / 火 | 5 | G4 | G4 为明亮中心，G-A-C-D-E 向外展开 |
| 羽 / 水 | 6 | A4 | A4 为深远中心，A-C-D-E-G 向下回返 |

因此，提示词中必须同时出现三类信息：

1. `固定音高池：C4, D4, E4, G4, A4 only`
2. `中心音：例如 E4 / jue / 角`
3. `禁止音：no F4, no B4, no chromatic passing tones`

“角音”在本项目中不再只写成 jue mode，而是明确写成：

```text
Use E4 as the primary tonal center. Use only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4. Emphasize E4 and the E-G-A-C-D modal color. Do not use F, B, chromatic passing tones, or Western functional chord progressions.
```

## 统一生成规格

所有曲目默认遵循以下共同条件：

- 纯器乐，无人声、无歌词、无吟唱。
- 时长约 3:30—4:30。
- 以中国五声音阶为基础，但不要求模型机械地重复五个音。
- 旋律有呼吸、有留白、有微小变化。
- 主要使用自然声学乐器，避免现代合成器抢占主体。
- 不追求戏剧性高潮，重点是持续聆听和缓慢展开。
- 不做“影视配乐式中国风”，不使用过度宏大的情绪。
- 保留乐器真实的摩擦、气息、触弦和余韵。

### 通用负面提示词

```text
no vocals, no lyrics, no chanting, no pop song structure, no EDM beat, no trap drums, no cinematic trailer build, no heroic climax, no epic orchestra, no fantasy soundtrack, no excessive percussion, no bright commercial Chinese music, no virtuosic show-off solo, no synthetic lead, no healing or medical claims
```

---

## 五个音乐母体

### 01｜角：青枝未醒

**五行：木**  
**核心气质：生发、舒展、向上、尚未完成**  
**适合时辰：子、丑，也可作为春晨类声音的基础**  
**主要乐器：古琴、箫，少量笛**

#### 音乐行为

- 旋律从一个很小的动机开始，逐渐向上展开。
- 使用开放音程和不完全解决，保留“正在生长”的感觉。
- 低密度开始，中段增加少量泛音、气息和高音区。
- 不要明亮到像白昼，角音在深夜应是“潜在的生机”。

#### 生成提示词

```text
Chinese traditional ambient instrumental, centered on the expressive character of the jue mode, associated with wood and quiet growth. Guqin as the intimate main voice, sparse xiao breath in the distance, occasional very soft dizi harmonics. Begin with one small fragile motif, then slowly unfold through gentle upward motion and open pentatonic intervals. The music should feel like a young branch moving in night air, restrained, spacious, organic and unfinished. Low density, slow breathing, subtle wooden resonance, long natural decay, intimate mountain-night atmosphere, no strong beat, no dramatic resolution, no climax, no vocals.
```

#### 负面约束

```text
avoid cheerful spring music, avoid bright festival atmosphere, avoid fast flute melodies, avoid sentimental film score, avoid obvious major-key triumph, avoid dense arrangement
```

---

### 02｜商：露落清商

**五行：金**  
**核心气质：清肃、明净、收束、边界清楚**  
**适合时辰：寅、卯**  
**主要乐器：箫、笛、磬，古琴作细线条**

#### 音乐行为

- 起音清楚，旋律线条比角音更短、更有边界。
- 让高频泛音和空气感成为“晨光”而不是刺耳的明亮。
- 少量磬或金石声作为时间标点，不要持续敲击。
- 旋律可以有短暂停顿，像露水在叶面上停住。

#### 生成提示词

```text
Chinese traditional ambient instrumental, centered on the expressive character of the shang mode, associated with metal, clarity and autumn-like purity. Xiao and dizi create a clean morning-air texture, with very sparse qing stone chimes and delicate guqin responses. Use a restrained Chinese pentatonic language, precise attacks, open space between phrases, clear high harmonics and a cool transparent room. The music should feel like pale dawn light and dew on leaves, calm, lucid, disciplined and quietly awake. Moderate-slow tempo, no heavy pulse, no sentimental swell, no vocals.
```

#### 负面约束

```text
avoid harsh metallic noise, avoid ritual grandeur, avoid bright celebratory melody, avoid fast virtuosic dizi, avoid cold digital ambience, avoid dense reverb wash
```

---

### 03｜宫：山腹承光

**五行：土**  
**核心气质：居中、承托、厚重、平和**  
**适合时辰：辰、巳**  
**主要乐器：埙、笙、古琴**

#### 音乐行为

- 以稳定的宫音或低中音持续感作为重心。
- 旋律不急于向外扩张，强调回到中心和稳定落点。
- 笙可以提供连续的“气”，埙提供圆润、土质和身体感。
- 允许有温暖的中频，但不能变成厚重的宗教音乐。

#### 生成提示词

```text
Chinese traditional ambient instrumental, centered on the expressive character of the gong mode, associated with earth, the center and quiet support. Xun provides a warm rounded low register, sheng offers a soft sustained breath-like harmonic bed, and guqin adds sparse grounded plucked phrases. Build the composition around a stable tonal center and calm returns, with gentle pentatonic movement, warm medium-low resonance and a spacious valley atmosphere. It should feel like sunlight gradually warming mountain stones, steady, generous, balanced and quietly alive. Slow to moderate tempo, subtle pulse, no vocals, no dramatic climax.
```

#### 负面约束

```text
avoid dark horror mood, avoid temple ceremony, avoid heavy low-frequency drone, avoid overly solemn funeral tone, avoid busy melodic ornament, avoid orchestral grandeur
```

---

### 04｜徵：长日流光

**五行：火**  
**核心气质：明亮、温暖、流动、向外展开**  
**适合时辰：午、未；戌、亥使用它的余烬版本**  
**主要乐器：琵琶、笛、古琴，极少量编钟或磬**

#### 音乐行为

- 五个母体中节奏最有流动性，但仍然不使用强烈鼓点。
- 琵琶负责清晰颗粒和行进，笛负责光线，古琴负责留白。
- 午时可以更开放、更明亮；戌时则保留火的温度，收掉外放感。
- 让“火”表现为光和气流，而不是激烈、燃烧或战争。

#### 生成提示词

```text
Chinese traditional ambient instrumental, centered on the expressive character of the zhi mode, associated with fire, warmth and clear daylight. Sparse pipa patterns create gentle forward motion, soft dizi phrases carry warm light, and guqin leaves quiet spaces between gestures. Use a flowing Chinese pentatonic language with a lightly articulated pulse, gradually opening register and warm natural resonance. The mood is a long sunlit day over a mountain slope: bright but not loud, alive but not restless, generous and transparent. No vocals, no heavy drums, no heroic climax, no pop rhythm.
```

#### 负面约束

```text
avoid action soundtrack, avoid festive folk dance, avoid aggressive pipa virtuosity, avoid fast percussion, avoid fiery anger, avoid bright commercial advertisement music
```

---

### 05｜羽：云影入水

**五行：水**  
**核心气质：深远、含蓄、下沉、回返**  
**适合时辰：申、酉**  
**主要乐器：箫、埙、古琴、磬**

#### 音乐行为

- 旋律以缓慢下行、回旋和长尾为主。
- 音区可以较低，但不能混浊；要保留水面一样的透明层次。
- 箫负责远景和气息，埙负责深度，古琴负责近处的触弦声。
- 磬只作为很远的时间回声，不作为主旋律。

#### 生成提示词

```text
Chinese traditional ambient instrumental, centered on the expressive character of the yu mode, associated with water, depth and inward listening. Xiao carries long distant breath-like lines, xun adds a dark rounded undertone, guqin provides sparse close plucks, and one or two very distant qing tones appear like reflections across water. Use a restrained Chinese pentatonic language, slow descending gestures, long silences, soft low register, transparent layers and deep natural reverb. The music should feel like cloud shadows moving across a quiet lake at dusk, remote, fluid, contemplative and understated. No vocals, no beat-driven rhythm, no dramatic ending.
```

#### 负面约束

```text
avoid sadness manipulation, avoid horror ambience, avoid thunder, avoid heavy cinematic bass, avoid overly dark drone, avoid sleep-music cliché, avoid excessive echo
```

---

## 十二时辰变体

下面的文字作为对应母体提示词的附加段落使用。生成时，将“母体提示词 + 时辰变体 + 通用负面提示词 + 母体负面约束”合并。

| 时辰 | 曲目名 | 母体 | 时辰变体提示词 |
|---|---|---|---|
| 子 | 松影初生 | 角 | 深夜山色入墨，旋律刚刚出现，古琴泛音稀疏，箫像远处穿过松针的风，极低密度，几乎没有节拍。 |
| 丑 | 埙息未明 | 角 | 黎明前的土色与呼吸，埙比箫更靠前，旋律更低、更慢，只在尾部出现极弱的向上倾向。 |
| 寅 | 窗隙见白 | 商 | 天色由墨蓝向青灰打开，箫的起音清晰但克制，加入少量高音泛音，像第一束尚未照满房间的光。 |
| 卯 | 露落清商 | 商 | 露水和晨风，笛的气息稍微增加，句子更短更清楚，空间透明，保留大片空白。 |
| 辰 | 山腹承光 | 宫 | 日光开始稳定，笙形成温和持续的气息，古琴围绕宫音落点展开，山谷回声宽而不空。 |
| 巳 | 溪石温声 | 宫 | 溪边石面渐暖，加入很轻的水声质感，旋律比辰时更流动，但仍然以宫音作为安定中心。 |
| 午 | 日中有弦 | 徵 | 正午光线丰沛，琵琶颗粒清楚但不炫技，笛的音区打开，节奏有轻微脉搏，整体明亮而不喧闹。 |
| 未 | 坡风流金 | 徵 | 午后的风自坡顶落下，琵琶和笛形成向前的流动，速度略快于午时，结尾留下金色余韵。 |
| 申 | 云过深碧 | 羽 | 云影变长，旋律开始下行，箫和古琴的距离拉开，声音像光在水面缓慢移动。 |
| 酉 | 钟沉暮水 | 羽 | 暮色收拢山形，加入一两次极远的磬声，低密度、长尾、少旋律，让空间比声音本身更明显。 |
| 戌 | 灯影未冷 | 徵·余烬 | 火不再向外扩张，只保留灯火的温度，古琴靠前、琵琶极少出现，音区回落，节奏几乎消失。 |
| 亥 | 月行归寂 | 徵·余烬 | 月光穿过窗棂，保留徵音的暖意但转为内收，箫和古琴交替，旋律缓慢回返到一个安静中心。 |

## 十二首正式曲目与完整提示词

以下提示词已经把母体、时辰、乐器、速度、结构、空间和负面约束合并，可以单独复制到音乐生成模型中使用。提示词使用英文，是为了兼容更多音乐生成模型；曲名和设计意图保留中文。

### 01｜子时 · 松影初生

**角 / 木｜42—48 BPM｜古琴、箫、埙**

```text
Create a 3 minute 50 second Chinese traditional ambient instrumental track titled "松影初生 / Pine Shadows Begin". The scene is midnight in a remote mountain forest, with the mountain silhouette disappearing into ink-black darkness. Use the expressive character of the jue mode, associated with wood and a life force that has not yet fully awakened. Use E4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize E4 and the E-G-A-C-D modal color, with no F, B, chromatic passing tones or Western functional chord progressions. Make guqin the intimate main instrument, with sparse natural harmonics and delicate finger noise; place a very distant xiao breath behind it, and let the xun appear only once or twice as a low rounded shadow. Begin with one fragile two- or three-note motif, then unfold through very slow upward fragments and open pentatonic intervals, never fully resolving. Keep the density extremely low, around 42 to 48 BPM without a distinct drum beat. Use a close wooden room for the guqin and a wide, distant mountain reverb for the xiao. The form should gently emerge, breathe, develop a few subtle layers, and dissolve into silence without a climax. Preserve natural acoustic imperfections, quiet string resonance and long decay. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no drums, no EDM, no pop structure, no bright cheerful melody, no heroic climax, no cinematic trailer build, no horror sound design, no dense arrangement, no synthetic lead, no excessive echo, no healing or medical claims.
```

### 02｜丑时 · 埙息未明

**角 / 木｜38—44 BPM｜埙、古琴、箫**

```text
Create a 4 minute 05 second Chinese traditional ambient instrumental track titled "埙息未明 / Xun Breath Before Dawn". The scene is the deepest part of the night just before dawn, with dark earth, slow breathing and no visible horizon. Use the jue mode as a hidden tendency rather than an obvious melody. Use E4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize E4 and the E-G-A-C-D modal color, with no F, B, chromatic passing tones or Western functional chord progressions. The music should contain a very faint upward impulse buried inside a low and quiet sound field. Let the xun be the closest and most important instrument, with warm, rounded, earthy notes and natural breath noise. Use muted guqin plucks sparingly, almost like thoughts appearing and disappearing, and place the xiao far behind the xun as a thin cold stream of air. Keep the tempo around 38 to 44 BPM, with no percussion and long pauses between gestures. The arrangement should stay low and intimate for most of the track, becoming only slightly more open near the final minute. End with an unfinished upward contour, not a resolution. Use soft low-mid resonance, restrained dynamics and a dark but peaceful room. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no beat, no drums, no sadness manipulation, no horror, no funeral mood, no dramatic low bass, no fast melody, no bright dawn climax, no lush orchestra, no synthetic pad, no excessive reverb, no healing or medical claims.
```

### 03｜寅时 · 窗隙见白

**商 / 金｜52—58 BPM｜箫、笛、古琴**

```text
Create a 3 minute 45 second Chinese traditional ambient instrumental track titled "窗隙见白 / White Light Through the Window". The scene is the hour before sunrise, when dark blue slowly turns into blue-gray and the first light appears through a narrow window gap. Use the expressive character of the shang mode, associated with metal, clarity and clean boundaries. Use D4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize D4 and the D-E-G-A-C modal color, with no F, B, chromatic passing tones or Western functional chord progressions. Make xiao the main voice with precise but gentle attacks, supported by a few quiet dizi harmonics that feel like pale air rather than a bright melody. Let guqin answer with short, clean phrases and plenty of silence. Use a restrained Chinese pentatonic language, clear articulation and a gradual opening of the upper register. Keep the tempo around 52 to 58 BPM, with no obvious beat. The track should move from shadow to transparency in three stages: quiet emergence, lucid middle section, then a soft return to open space. Use a cool transparent room with moderate natural decay. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no fast flute solo, no festive morning music, no harsh metallic noise, no ritual grandeur, no pop rhythm, no dramatic crescendo, no digital coldness, no dense reverb wash, no synthetic lead, no healing or medical claims.
```

### 04｜卯时 · 露落清商

**商 / 金｜58—64 BPM｜笛、箫、磬、古琴**

```text
Create a 3 minute 40 second Chinese traditional ambient instrumental track titled "露落清商 / Dew Falling in Clear Shang". The scene is early morning after sunrise, with dew still on grass and a clean breeze moving through pale leaves. Use the shang mode as a clear but restrained tonal character. Use D4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize D4 and the D-E-G-A-C modal color, with no F, B, chromatic passing tones or Western functional chord progressions. Shape the music with short phrases, precise entrances, bright upper harmonics and elegant pauses. Let dizi lead with soft airy phrases, never virtuosic; use xiao to lengthen the space between phrases; add one or two very distant qing tones as quiet points of light, and let guqin provide a few dry plucked replies. Keep the tempo around 58 to 64 BPM with a barely perceptible pulse. The music should feel transparent, disciplined and awake, with more clarity than emotion. Use a spacious morning room, light natural reverb and a gradual reduction of density toward the ending. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no Chinese festival sound, no rapid dizi runs, no loud bells, no ceremonial grandeur, no commercial relaxation music, no pop drums, no heroic melody, no icy digital texture, no excessive echo, no healing or medical claims.
```

### 05｜辰时 · 山腹承光

**宫 / 土｜54—60 BPM｜笙、埙、古琴**

```text
Create a 4 minute 10 second Chinese traditional ambient instrumental track titled "山腹承光 / The Mountain Holds the Light". The scene is mid-morning in a broad mountain valley, when sunlight becomes stable and the air feels supported by the earth. Use the gong mode as the tonal center, associated with earth, the middle and quiet support. Use C4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize C4 and the C-D-E-G-A modal color, with no F, B, chromatic passing tones or Western functional chord progressions. Let sheng create a soft, continuous breath-like harmonic bed; let xun add a warm rounded low-mid color; use guqin for sparse grounded phrases that repeatedly return to a calm central tone. The harmony should feel stable without becoming a static drone. Keep the tempo around 54 to 60 BPM with a very soft internal pulse and no visible percussion. Begin with a single centered tone, slowly add sheng breath and guqin detail, reach a warm balanced middle, then return to spacious stability. Use a wide valley reverb with a clear center and natural acoustic texture. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no temple ceremony, no funeral mood, no horror, no heavy sub-bass drone, no orchestral swell, no dense ornament, no dramatic climax, no synthetic ambient pad, no healing or medical claims.
```

### 06｜巳时 · 溪石温声

**宫 / 土｜62—68 BPM｜古琴、笙、箫、极轻水声**

```text
Create a 3 minute 55 second Chinese traditional ambient instrumental track titled "溪石温声 / Warm Voices of Stream Stones". The scene is late morning beside a shallow stream, where stones have warmed in the sunlight and water carries sound into the distance. Keep C4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize the C-D-E-G-A gong-mode color, with no F, B, chromatic passing tones or Western functional chord progressions. Keep the gong mode as a stable center, but allow more movement than the earlier morning piece. Use guqin as the main melodic instrument with rounded, unhurried phrases; let sheng provide a soft sustained breath; add occasional xiao lines that follow the direction of the stream. Include only a very subtle natural water texture, never a loud field recording. Keep the tempo around 62 to 68 BPM with gentle flowing motion and no drum groove. Let the track grow from a stable center into a slightly more mobile middle section, then settle back onto the gong center. Use warm medium frequencies, clear plucked transients and a sunlit outdoor reverb. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no new-age water cliché, no spa music, no heavy percussion, no fast arpeggios, no dramatic melody, no exaggerated river sound, no synthetic bells, no commercial Chinese-style arrangement, no healing or medical claims.
```

### 07｜午时 · 日中有弦

**徵 / 火｜70—76 BPM｜琵琶、笛、古琴**

```text
Create a 3 minute 50 second Chinese traditional ambient instrumental track titled "日中有弦 / Strings in Midday Light". The scene is noon on a clear mountain day, with abundant light and sharply visible contours. Use the expressive character of the zhi mode, associated with fire, warmth and outward clarity. Use G4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize G4 and the G-A-C-D-E modal color, with no F, B, chromatic passing tones or Western functional chord progressions. Let pipa provide sparse, precise plucked particles and a gentle forward motion, not a virtuosic solo. Let dizi open the upper register with warm sunlit phrases, while guqin leaves quiet space between the brighter gestures. Use a Chinese pentatonic language with a lightly articulated pulse around 70 to 76 BPM, but do not use a drum kit or pop groove. The arrangement should gradually open in register and brightness, reach a clear but modest peak of light, then release without a dramatic ending. Keep the sound acoustic, transparent and energetic without becoming loud. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no EDM, no pop drums, no action soundtrack, no heroic climax, no aggressive pipa virtuosity, no festival music, no brass, no large orchestra, no commercial advertisement sound, no healing or medical claims.
```

### 08｜未时 · 坡风流金

**徵 / 火｜76—84 BPM｜琵琶、笛、古琴、极少磬声**

```text
Create a 4 minute 00 second Chinese traditional ambient instrumental track titled "坡风流金 / Golden Wind Over the Slope". The scene is afternoon wind moving down a long sunlit hillside, carrying a warm golden color but also the first hint of the day turning westward. Use G4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize the G-A-C-D-E zhi-mode color, with no F, B, chromatic passing tones or Western functional chord progressions. Use the zhi mode with a flowing, warm and lightly rhythmic character. Let pipa create repeating but spacious plucked patterns that suggest walking wind, never becoming a busy ostinato. Let dizi answer in long phrases, and let guqin soften the transitions with sparse low notes. Add no more than two very quiet qing accents in the entire track, like distant light. Keep the tempo around 76 to 84 BPM with a natural forward motion and no modern drum beat. Develop from a clear open register into a gently moving middle, then allow the final minute to lose brightness and become more spacious. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no dance beat, no folk festival, no rapid pipa virtuosity, no action or travel soundtrack, no heroic melody, no loud percussion, no bright advertising music, no synthetic bass, no abrupt ending, no healing or medical claims.
```

### 09｜申时 · 云过深碧

**羽 / 水｜54—60 BPM｜箫、古琴、埙**

```text
Create a 3 minute 58 second Chinese traditional ambient instrumental track titled "云过深碧 / Clouds Over Deep Green Water". The scene is late afternoon, when cloud shadows become longer and blue-green distance begins to replace the brightness of noon. Use the expressive character of the yu mode, associated with water, depth and inward listening. Use A4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize A4 and the A-C-D-E-G modal color, with no F, B, chromatic passing tones or Western functional chord progressions. Let xiao carry long, remote lines with gentle descending gestures; let guqin provide sparse close plucks with audible string decay; let xun add only a low rounded undertone at important transitions. Use a restrained Chinese pentatonic language, soft low-to-middle register, long pauses and a slow tempo around 54 to 60 BPM. The music should feel like light moving across a deep lake, fluid and contemplative rather than sad. Use layered distance: guqin close, xiao far, xun beneath. Let the ending descend gently without resolving into darkness. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no sadness manipulation, no horror ambience, no thunder, no heavy cinematic bass, no sleep-music cliché, no dense low drone, no excessive echo, no dramatic ending, no healing or medical claims.
```

### 10｜酉时 · 钟沉暮水

**羽 / 水｜44—50 BPM｜箫、磬、古琴、埙**

```text
Create a 4 minute 15 second Chinese traditional ambient instrumental track titled "钟沉暮水 / A Bell Sinks Into Evening Water". The scene is sunset and early dusk, when the mountain silhouette closes and one distant sound travels over mist. Use A4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize the A-C-D-E-G yu-mode color, with no F, B, chromatic passing tones or Western functional chord progressions. Use the yu mode as a deep, understated tonal world with slow descending lines and long returns. Make xiao the main distant voice, with guqin appearing close and sparse in the foreground. Add only one or two isolated qing tones across the entire piece; each tone must decay for a long time and feel far away, never ceremonial. Let xun support the lowest register very gently. Keep the tempo around 44 to 50 BPM, with very low density and no repeating beat. Make the space larger than the melody: wide dusk air, soft mist, natural long decay, clear silence. End by allowing the final resonance to disappear on its own. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no temple ritual, no bell choir, no horror, no funeral music, no cinematic sadness, no heavy reverb wash, no bass swell, no constant percussion, no dramatic resolution, no healing or medical claims.
```

### 11｜戌时 · 灯影未冷

**徵·余烬 / 火｜42—48 BPM｜古琴、箫、极少琵琶**

```text
Create a 3 minute 45 second Chinese traditional ambient instrumental track titled "灯影未冷 / The Lamp Shadow Is Still Warm". The scene is early night indoors, with a small lamp connecting warm human space to the surrounding darkness. Use G4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize the subdued G-A-C-D-E zhi-mode color, with no F, B, chromatic passing tones or Western functional chord progressions. Use the zhi mode in its ember phase: retain warmth and a faint inner glow, but remove the outward brightness of noon. Let guqin be the closest and primary instrument, with slow intimate plucks and soft resonance. Use xiao only as a distant breath at the edges, and allow one or two isolated pipa notes to suggest fading warmth rather than rhythm. Keep the tempo around 42 to 48 BPM, with the pulse nearly absent. The tonal center should feel warm but inward, and the arrangement should gradually reduce high frequencies and brightness. Use a small wooden room, gentle natural reverb and a quiet ending that feels held rather than closed. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no lullaby cliché, no sentimental film score, no bright fire music, no repetitive pipa rhythm, no drums, no dramatic chord progression, no dark horror, no synthetic pad, no excessive echo, no healing or medical claims.
```

### 12｜亥时 · 月行归寂

**徵·余烬 / 火｜38—44 BPM｜箫、古琴、埙**

```text
Create a 4 minute 20 second Chinese traditional ambient instrumental track titled "月行归寂 / The Moon Returns to Silence". The scene is deep night beneath a high moon, with pale light crossing a quiet room and the last warmth of the day turning inward. Use G4 as the primary tonal center and only the fixed Chinese pentatonic pitch pool C4, D4, E4, G4, A4; emphasize the subdued G-A-C-D-E zhi-mode color, with no F, B, chromatic passing tones or Western functional chord progressions. Use the zhi mode as a very subtle ember: keep a trace of warm light, but let the music gradually return to silence and a calm central tone. Alternate between long xiao breaths and sparse guqin phrases, with xun appearing only as a soft low shadow near the middle. Use slow, descending and returning melodic gestures, a very low density, almost no pulse and a tempo around 38 to 44 BPM. The sound should be intimate at first, then widen into moonlit distance, and finally leave a single quiet resonance. Avoid a tragic mood; this is release, not sorrow. Use natural acoustic decay, restrained dynamics and a clean silence at the end. Instrumental only, no vocals.
```

```text
Negative prompt: no vocals, no lyrics, no chanting, no sleep-music cliché, no tragic film score, no horror, no heavy bass, no dramatic ending, no dense orchestration, no synthetic lead, no constant flute melody, no excessive echo, no healing or medical claims.
```

## 生成提示词模板

后续每首音乐可以按以下结构生成：

```text
[母体提示词]

Time and scene:
[时辰变体提示词]

Musical behavior:
[速度、音区、旋律运动、密度、动态]

Pitch constraint:
Use only C4, D4, E4, G4, A4. Set [中心音] as the primary tonal center. Do not use F4, B4, chromatic passing tones or Western functional chord progressions.

Sound design:
[空间、混响、近远关系、自然声]

Duration:
3:30 to 4:30, gradual development, no abrupt ending.

Negative prompt:
[通用负面提示词]
[母体负面约束]
```

## 第一批建议生成顺序

不要一次生成全部 12 首。先生成以下 5 首母体样片，确认五音之间是否真的听得出差异：

1. 松影初生 —— 角 / 木
2. 露落清商 —— 商 / 金
3. 山腹承光 —— 宫 / 土
4. 日中有弦 —— 徵 / 火
5. 云过深碧 —— 羽 / 水

如果这 5 首的音色、运动方式和空间感已经拉开差异，再生成其余 7 首时辰变体。否则应该先调整母体提示词，而不是继续增加曲目数量。

## 评估标准

每次生成后，从以下六项各打 1—5 分：

- 五音气质是否清楚。
- 主导乐器是否明确。
- 时辰氛围是否成立。
- 是否有足够留白。
- 是否具有真实的传统乐器质感。
- 是否摆脱了俗套“中国风”或影视配乐感。

单首达到 22 分以上，且没有明显的负面项，才进入项目曲库。

## 理论说明

本项目采用的是一种面向声音设计的转译：五音决定旋律行为和情绪方向，五行决定意象与材料感，时辰决定光线和动态，传统乐器决定具体音色。它是艺术系统，不是临床音乐疗法。

传统关系可参照《黄帝内经·素问·金匮真言论》关于五脏、五行、五方、五时与五音的对应，以及《乐书》卷一百五对五声性格和音响特征的整理。不同文献和后世体系可能存在差异，因此本文件中的乐器分配和生成参数属于本项目的创作规则。
