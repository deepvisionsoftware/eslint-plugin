import { type Ref } from 'vue';

const count: Ref<number> = { value: 0 } as Ref<number>;

export function increment(ref: Ref<number>): void {
  ref.value++;
}

export { count };
