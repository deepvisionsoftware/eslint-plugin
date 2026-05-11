import { Readable } from "node:stream"
import { writeFile, readFile } from "node:fs/promises"

const stream: Readable = process.stdin
const value: any = "test"

export function sum(a: number, b: number): number {
  const total = a + b
  return total
}

export async function save(content: string): Promise<void> {
  const data = await readFile("config.json", "utf8")
  await writeFile("out.json", data + content)
}

export { stream, value }
