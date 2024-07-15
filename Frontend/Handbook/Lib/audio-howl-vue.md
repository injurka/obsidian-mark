> player.ts
```ts
import { Howl, type HowlOptions } from 'howler'

export type PlayerOptions = HowlOptions & { title?: string }

export function useAudioPlayer() {
  const playerParams = ref<PlayerOptions | null>(null)
  const player = ref<Howl | null>(null)

  const isPlaying = computed(() => player.value?.playing())
  const isLoaded = computed(() => player.value?.state())

  function createPlayer(params: PlayerOptions) {
    playerParams.value = params
    player.value?.stop()

    player.value = new Howl({
      preload: 'metadata',
      html5: true,
      ...params,
    })
    
    addMetadata()
    
    return player.value
  }

  function play() {
    if (isPlaying.value)
      return

    player.value?.play()
  }

  function pause() {
    if (!isPlaying.value)
      return

    player.value?.pause()
  }

  function changeAudioState() {
    if (isPlaying.value)
      pause()
    else
      play()
  }

  function addMetadata() {
    const { title = '' } = playerParams.value ?? {}

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist: '',
        album: '',
        artwork: [{ src: '' }],
      })
    }
  }

  return {
    isPlaying,
    isLoaded,
    player,
    createPlayer,
    changeAudioState,
    play,
    pause,
  }
}
```

---

> playlist.ts
```ts
export function useAudioPlaylist(audios: string[], startIndex = 0) {
  const { player, createPlayer, changeAudioState, pause, play } = useAudioPlayer()

  const trackIndex = ref<number>(startIndex)

  const stopTrack = () => {
    player.value?.stop()
  }

  const playTrack = (index: number) => {
    createPlayer({ src: audios[index] }).play()
  }

  const previousTrack = () => {
    if (trackIndex.value <= 0)
      return

    stopTrack()
    playTrack(--trackIndex.value)
  }

  const nextTrack = () => {
    if (trackIndex.value >= audios.length - 1)
      return

    stopTrack()
    playTrack(++trackIndex.value)
  }

  const control = {
    play,
    pause,
    stop: stopTrack,
    toggle: changeAudioState,
    previous: previousTrack,
    next: nextTrack,
  }

  onMounted(() => {
    createPlayer({ src: audios[trackIndex.value], title: 'Nice' })

    navigator.mediaSession.setActionHandler('previoustrack', previousTrack)
    navigator.mediaSession.setActionHandler('nexttrack', nextTrack)
  })

  onUnmounted(() => {
    navigator.mediaSession.setActionHandler('previoustrack', null)
    navigator.mediaSession.setActionHandler('nexttrack', null)
  })

  return {
    trackIndex,
    control,
    player,
  }
}
```