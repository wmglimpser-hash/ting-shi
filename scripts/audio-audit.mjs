import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import decode from '@audio/decode-mp3'
import FFT from 'fft.js'

const inputDir = path.resolve(process.argv[2] || 'mp3')
const outputFile = path.resolve(process.argv[3] || 'docs/audio-inspection-report.md')
const centerByTrack = { 1: 'E', 2: 'E', 3: 'D', 4: 'D', 5: 'C', 6: 'C', 7: 'G', 8: 'G', 9: 'A', 10: 'A', 11: 'G', 12: 'G' }
const noteOffsets = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 }
const allowedNotes = ['C', 'D', 'E', 'G', 'A']
const forbiddenNotes = ['F', 'B']
const A4 = 440

const noteFrequency = (note, octave) => A4 * 2 ** (((octave - 4) * 12 + noteOffsets[note]) / 12)
const db = value => 20 * Math.log10(Math.max(value, 1e-12))
const round = (value, digits = 2) => Number(value.toFixed(digits))
const percentile = (values, point) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * point))]
}

function spectralFeatures(signal, sampleRate, center) {
  const size = 4096
  const fft = new FFT(size)
  const input = new Array(size)
  const steps = 16
  const chroma = { C: 0, D: 0, E: 0, F: 0, G: 0, A: 0, B: 0 }
  let centroidTotal = 0

  for (let step = 0; step < steps; step += 1) {
    const start = Math.max(0, Math.min(signal.length - size, Math.floor((signal.length - size) * step / (steps - 1))))
    for (let index = 0; index < size; index += 1) {
      const window = 0.5 - 0.5 * Math.cos(2 * Math.PI * index / (size - 1))
      input[index] = signal[start + index] * window
    }

    const spectrum = fft.createComplexArray()
    fft.realTransform(spectrum, input)
    fft.completeSpectrum(spectrum)

    let totalPower = 0
    let weightedFrequency = 0
    for (let bin = 1; bin < size / 2; bin += 1) {
      const real = spectrum[2 * bin]
      const imaginary = spectrum[2 * bin + 1]
      const power = real * real + imaginary * imaginary
      const frequency = bin * sampleRate / size
      if (frequency > 40 && frequency < 5000) {
        totalPower += power
        weightedFrequency += frequency * power
      }
    }
    centroidTotal += totalPower ? weightedFrequency / totalPower : 0

    for (const note of Object.keys(chroma)) {
      for (let octave = 3; octave <= 5; octave += 1) {
        const targetBin = Math.round(noteFrequency(note, octave) * size / sampleRate)
        let power = 0
        for (let bin = Math.max(1, targetBin - 2); bin <= Math.min(size / 2 - 1, targetBin + 2); bin += 1) {
          const real = spectrum[2 * bin]
          const imaginary = spectrum[2 * bin + 1]
          power += real * real + imaginary * imaginary
        }
        chroma[note] += power
      }
    }
  }

  const totalChroma = Object.values(chroma).reduce((sum, value) => sum + value, 0) || 1
  const poolRatio = allowedNotes.reduce((sum, note) => sum + chroma[note], 0) / totalChroma
  const forbiddenRatio = forbiddenNotes.reduce((sum, note) => sum + chroma[note], 0) / totalChroma
  return { centroid: centroidTotal / steps, poolRatio, forbiddenRatio, centerRatio: chroma[center] / totalChroma }
}

async function inspectFile(file) {
  const bytes = fs.readFileSync(file)
  const decoded = await decode(bytes)
  const left = decoded.channelData[0]
  const right = decoded.channelData[1] || left
  const mono = new Float32Array(left.length)
  const blockSize = 4096
  const blockRms = []
  let peak = 0
  let squareSum = 0
  let clippedSamples = 0
  let silentBlocks = 0
  let correlationNumerator = 0
  let leftPower = 0
  let rightPower = 0

  for (let start = 0; start < left.length; start += blockSize) {
    const end = Math.min(left.length, start + blockSize)
    let blockSquareSum = 0
    for (let index = start; index < end; index += 1) {
      const sample = (left[index] + right[index]) / 2
      mono[index] = sample
      const absolute = Math.abs(sample)
      peak = Math.max(peak, absolute)
      squareSum += sample * sample
      blockSquareSum += sample * sample
      if (absolute >= 0.999) clippedSamples += 1
      if (decoded.channelData.length > 1) {
        correlationNumerator += left[index] * right[index]
        leftPower += left[index] * left[index]
        rightPower += right[index] * right[index]
      }
    }
    const rms = Math.sqrt(blockSquareSum / Math.max(1, end - start))
    blockRms.push(rms)
    if (db(rms) < -60) silentBlocks += 1
  }

  const trackNumber = Number.parseInt(path.basename(file), 10)
  const spectral = spectralFeatures(mono, decoded.sampleRate, centerByTrack[trackNumber] || 'C')
  const correlation = decoded.channelData.length > 1
    ? correlationNumerator / Math.sqrt(Math.max(leftPower * rightPower, 1e-12))
    : 1

  return {
    name: path.basename(file),
    duration: left.length / decoded.sampleRate,
    sampleRate: decoded.sampleRate,
    channels: decoded.channelData.length,
    bitrate: Math.round((bytes.length * 8) / (left.length / decoded.sampleRate) / 1000),
    peakDb: db(peak),
    rmsDb: db(Math.sqrt(squareSum / left.length)),
    p10RmsDb: db(percentile(blockRms, 0.1)),
    p90RmsDb: db(percentile(blockRms, 0.9)),
    silenceRatio: silentBlocks / blockRms.length,
    clippedSamples,
    correlation,
    ...spectral,
  }
}

const files = fs.readdirSync(inputDir)
  .filter(file => file.toLowerCase().endsWith('.mp3'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

if (!files.length) throw new Error(`No MP3 files found in ${inputDir}`)

const results = []
for (const file of files) results.push(await inspectFile(path.join(inputDir, file)))

const rows = results.map(result => {
  const flags = []
  if (result.peakDb > 0) flags.push('过载风险')
  else if (result.peakDb > -0.5) flags.push('峰值余量不足')
  if (result.duration < 210) flags.push('短于 3:30')
  if (result.poolRatio < 0.6) flags.push('五音池代理值偏低')
  return `| ${result.name} | ${round(result.duration, 1)} s | ${round(result.rmsDb)} dBFS | ${round(result.peakDb)} dBFS | ${round(result.poolRatio * 100, 1)}% | ${flags.join('；') || '—'} |`
}).join('\n')

const report = `# MP3 音频检查报告\n\n检查目录：\`${inputDir}\`\n\n## 总体结论\n\n- 共检查 ${results.length} 首 MP3。\n- 当前脚本完成格式、时长、响度、峰值、静音比例、立体声相关性和五声音高池频谱代理检查。\n- “五音池代理值”受乐器泛音、混响和复音影响，只能作为初筛，不等于 MIDI 音符证明。\n- 建议将峰值控制到 true peak 不高于 -1 dBTP，并用 MIDI 或分轨复核 C-D-E-G-A。\n\n## 结果\n\n| 文件 | 时长 | 平均 RMS | 峰值 | C-D-E-G-A 代理比例 | 标记 |\n|---|---:|---:|---:|---:|---|\n${rows}\n\n## 说明\n\n- 全部音频应进一步用播放器或 Sonic Visualiser 进行人工听检。\n- 如果要判断古琴、箫、埙的音色真实性，以及旋律是否符合时辰气质，需要音频输入或人工听辨，不能只依赖频谱数字。\n`

fs.mkdirSync(path.dirname(outputFile), { recursive: true })
fs.writeFileSync(outputFile, report, 'utf8')
console.log(`Wrote ${outputFile}`)
