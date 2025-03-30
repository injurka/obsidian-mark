### JS
 
```js
<script setup>
defineProps({
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  a: Number,
  // Multiple possible types
  b: [String, Number],
  // Required string
  v: {
    type: String,
    required: true,
  },
  // Number with a default value
  d: {
    type: Number,
    default: 100,
  },
  // Object with a default value
  e: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default(rawProps) {
      return { message: 'hello' };
    },
  },
  // Custom validator function
  // full props passed as 2nd argument in 3.4+
  f: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value);
    },
  },
  // Function with a default value
  g: {
    type: Function,
    // Unlike object or array default, this is not a factory
    // function - this is a function to serve as a default value
    default() {
      return ['one, two'];
    },
  },
});
</script>

```

### TS

```ts
<script setup lang="ts">
interface Props {
  a?: number;
  b?: string | number;
  c: string;
  d?: number;
  e?: { message: 'string' };
  f?: 'success' | 'warning' | 'danger';
  g?: Array<string>;
}

withDefaults(
	defineProps<Props>(), 
	{ d: 100, e: { message: 'hello' }, 
	g: () => ['one', 'two'] }
);
</script>
```
