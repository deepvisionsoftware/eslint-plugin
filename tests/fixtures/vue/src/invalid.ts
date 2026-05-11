import { reactive, Ref, computed } from "vue"
import { Readable } from "node:stream"

const count: Ref = {} as Ref
const stream: Readable = {} as Readable
const value: any = "test"
const state = reactive({ n: 0 })
const doubled = computed(() => state.n * 2)

export function double(n: number): number {
  const result = n * 2
  return result
}

export { count, doubled, state, stream, value }
