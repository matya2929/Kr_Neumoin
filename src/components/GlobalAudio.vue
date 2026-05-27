<template>
  <div class="global-audio-player" v-if="audioSrc">
    <audio
      ref="audioEl"
      :src="audioSrc"
      preload="metadata"
      @loadedmetadata="syncDuration"
      @timeupdate="updateProgress"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @ended="onEnded"
    />

    <div class="player-title">
      <span class="signal">Гимн Супер-Земли</span>
      <span class="time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
    </div>

    <div class="controls">
      <button class="ghost small" @click="togglePlay">
        {{ isPlaying ? 'Пауза' : 'Воспроизвести' }}
      </button>
      <input
        class="progress"
        type="range"
        min="0"
        :max="duration || 0"
        step="0.1"
        :value="currentTime"
        @input="seek"
        aria-label="Позиция гимна"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import audioSrc from '../assets/audio/gimn-super-zemli.mp3'

const audioEl = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
let channel = null

function syncDuration() {
  duration.value = Number.isFinite(audioEl.value?.duration) ? audioEl.value.duration : 0
}

function updateProgress() {
  currentTime.value = audioEl.value?.currentTime || 0
}

function togglePlay() {
  if (isPlaying.value) {
    pauseAudio(true)
  } else {
    playAudio(true)
  }
}

function playAudio(broadcast = true) {
  if (!audioEl.value) return
  audioEl.value.play().then(() => {
    isPlaying.value = true
    if (broadcast && channel) channel.postMessage({ command: 'play' })
  }).catch(() => {})
}

function pauseAudio(broadcast = true) {
  if (!audioEl.value) return
  audioEl.value.pause()
  isPlaying.value = false
  if (broadcast && channel) channel.postMessage({ command: 'pause' })
}

function seek(event, broadcast = true) {
  if (!audioEl.value) return
  const nextTime = Number(event.target.value)
  audioEl.value.currentTime = nextTime
  currentTime.value = nextTime
  if (broadcast && channel) channel.postMessage({ command: 'seek', time: nextTime })
}

function onEnded() {
  isPlaying.value = false
  currentTime.value = 0
}

function formatTime(value) {
  const safe = Number.isFinite(value) ? Math.floor(value) : 0
  const minutes = Math.floor(safe / 60)
  const seconds = String(safe % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

onMounted(() => {
  if ('BroadcastChannel' in window) {
    channel = new BroadcastChannel('audio_channel')
    channel.onmessage = (event) => {
      if (event.data.command === 'play') playAudio(false)
      if (event.data.command === 'pause') pauseAudio(false)
      if (event.data.command === 'seek' && audioEl.value) {
        audioEl.value.currentTime = Number(event.data.time) || 0
        currentTime.value = audioEl.value.currentTime
      }
    }
  }
})

onBeforeUnmount(() => {
  if (channel) channel.close()
})
</script>

<style scoped>
.global-audio-player {
  position: sticky;
  top: 56px;
  z-index: 45;
  display: grid;
  grid-template-columns: minmax(180px, 280px) 1fr;
  align-items: center;
  gap: 1rem;
  margin: 0;
  padding: 0.75rem 0.9rem;
  background: linear-gradient(180deg, rgba(10,12,16,0.96), rgba(0,0,0,0.96));
  border-left: 0;
  border-right: 0;
  border: 1px solid var(--gold-deep);
  box-shadow: 0 12px 32px rgba(0,0,0,0.55), 0 0 18px rgba(245,197,24,0.08);
  backdrop-filter: blur(8px);
}
.player-title {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}
.signal {
  font-family: var(--font-display);
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.85rem;
}
.time {
  font-family: var(--font-mono);
  color: var(--text-muted);
  font-size: 0.72rem;
}
.controls {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.8rem;
}
button.small {
  padding: 0.45em 0.9em;
  font-size: 0.72rem;
  white-space: nowrap;
}
.progress {
  appearance: none;
  height: 8px;
  background: var(--bg-1);
  border: 1px solid var(--gold-deep);
  padding: 0;
  cursor: pointer;
}
.progress::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 18px;
  background: var(--gold);
  border: 1px solid #000;
}
.progress::-moz-range-thumb {
  width: 14px;
  height: 18px;
  background: var(--gold);
  border: 1px solid #000;
  border-radius: 0;
}
@media (max-width: 720px) {
  .global-audio-player {
    top: 49px;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .controls { grid-template-columns: 1fr; }
}
</style>
