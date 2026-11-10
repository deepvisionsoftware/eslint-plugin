<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ items: string[] }>();
const unused = ref(0);
const value: any = undefinedGlobal();
</script>

<template>
  <ul>
    <li v-for="item in props.items">{{ item }} {{ value }}</li>
  </ul>
</template>
