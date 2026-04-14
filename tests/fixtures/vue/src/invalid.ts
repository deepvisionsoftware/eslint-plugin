import { Ref } from "vue"

const count: Ref = {} as Ref
const value: any = "test"

export function double(n: number): number {
  const result = n * 2
  return result
}

export { count, value }
