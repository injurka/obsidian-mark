```ts
// Utilities
import { getCurrentInstance as _getCurrentInstance } from 'vue'

// Types
import type { VNode } from 'vue'

export function getCurrentInstance(name: string, message?: string) {
  const vm = _getCurrentInstance()

  if (!vm)
    throw new Error(`[Lib] ${name} ${message || 'must be called from inside a setup function'}`)

  return vm
}

export function useRender(render: () => VNode): void {
  const vm = getCurrentInstance('useRender') as any
  vm.render = render
}

export const Word = defineComponent({
  name: 'Word',
  setup(props) {

 return () => (
	<div> ... </div>
    )
  },
})
```