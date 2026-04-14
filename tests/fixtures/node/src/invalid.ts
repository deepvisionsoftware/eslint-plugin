import { Readable } from "node:stream"

const stream: Readable = process.stdin
const value: any = "test"

export function sum(a: number, b: number): number {
  const total = a + b
  return total
}

export { stream, value }
