import { useMemo, useState, useCallback, useRef } from 'react'
import { useWavesurfer } from '@wavesurfer/react'
// import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';

export default function Hello() {
  const formatTime = (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')
  const containerRef = useRef(null)
  const audioUrl='https://p.scdn.co/mp3-preview/0ba9d38f5d1ad30f0e31fc8ee80c1bebf0345a0c'
  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    url: audioUrl
    // plugins: useMemo(() => [TimelinePlugin.create()], []),
  })

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  return (
    <div>
      <div ref={containerRef} />

      <p>Current audio: {audioUrl}</p>

      <p>Current time: {formatTime(currentTime)}</p>

      <div style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>
  

        <button onClick={onPlayPause} style={{ minWidth: '5em' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  )
}