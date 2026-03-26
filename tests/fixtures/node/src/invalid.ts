import { Readable } from "node:stream"

const stream: Readable = process.stdin
const value: any = "test"

export { stream, value }
