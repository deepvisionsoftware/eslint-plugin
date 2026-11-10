import { Readable } from 'node:stream';

let stream: Readable = process.stdin;
const value: any = 'test';
const unused = 1;

export { stream, value };
