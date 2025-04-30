## [npm](https://www.npmjs.com/package/mitt)

## Примеры использования

```ts
import mitt, { Emitter } from 'mitt';

type Events = {
  foo: string;
  bar?: number;
};

const emitter: Emitter<Events> = mitt<Events>(); // inferred as Emitter<Events>

emitter.on('foo', (e) => {}); // 'e' has inferred type 'string'
emitter.emit('foo', 'nice');
```

## Альтернатива

- ### [[on-emit]]