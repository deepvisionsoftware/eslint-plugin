<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ items: string[] }>();
const count = ref(0);
</script>

<template>
  <ul>
    <li
      v-for="item in props.items"
      :key="item"
      class="item"
      @click="count++"
    >
      {{ item }} {{ count }}
    </li>
  </ul>
  <input
    type="text"
    disabled
  />
</template>
