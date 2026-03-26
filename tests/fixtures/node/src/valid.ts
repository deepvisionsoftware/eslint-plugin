import { type Readable } from 'node:stream';

const stream: Readable = process.stdin;

export function greet(name: string): string {
  return `Hello, ${name}`;
}

export { stream };
