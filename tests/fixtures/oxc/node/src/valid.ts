import { type Readable } from 'node:stream';

const stream: Readable = process.stdin;

export function greet(name: string, excited: boolean): string {
  const greeting = excited ? `Hello, ${name}!` : `Hello, ${name}`;

  return greeting;
}

export { stream };
