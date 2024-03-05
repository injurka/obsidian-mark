## Исходники

```ts
enum EVENT_LIST {
  ALL = 'allEvent',
}

type AllEventData = any

type IEventDataMap<T> = {
  [EVENT_LIST.ALL]: AllEventData
} & T

type EventCallback<T> = (event: T) => void

type EventMap<T> = {
  [K in keyof IEventDataMap<T>]: IEventDataMap<T>[K];
}

type EventCallbackMap<T> = {
  [K in keyof EventMap<T>]: EventCallback<EventMap<T>[K]>;
}

export interface IEmitter<T> {
  on: <K extends keyof EventCallbackMap<T>>(event: K, callback: EventCallbackMap<T>[K]) => void
  emit: <K extends keyof EventMap<T>>(eventType: K, payload?: IEventDataMap<T>[K]) => void
}

export type Events<T> = {
  [K in keyof EventCallbackMap<T>]: Array<EventCallbackMap<T>[K]>;
}

export function useObservable<T>() {
  const events = { [EVENT_LIST.ALL]: [] } as unknown as Events<T>

  const emitter: IEmitter<T> = {
    on(event, callback) {
      if (!events[event])
        events[event] = []

      events[event].push(callback)
    },

    emit(event, payload) {
      if (payload)
        events[event]?.forEach(listener => listener(payload))

      if (event !== EVENT_LIST.ALL) {
        events[EVENT_LIST.ALL].forEach((cb: EventCallbackMap<T>[EVENT_LIST.ALL]) =>
          cb(event as EventMap<T>[EVENT_LIST.ALL]),
        )
      }
    },
  }

  return { events, emitter }
}
```

## Примеры использования

```ts
export enum EVENT_LIST {
  END = 'end',
}

export interface IEventDataMap {
  [EVENT_LIST.END]: number
}

const { emitter } = useObservable<IEventDataMap>()

emitter.on(EVENT_LIST.END, 1)
emitter.emit(EVENT_LIST.END, payload)
```