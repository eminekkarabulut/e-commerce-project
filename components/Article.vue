<template>
  <section class="px-5">
    <div class="container my-5">
      <div class="row">
        <div v-if="_isEnglish" v-html="content.contentDisplayText"></div>
        <div v-else v-html="content.contentText"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useInit } from "../stores/initStore";

const initStore = useInit();
const _isEnglish = computed(() => initStore._isEnglish);

const props = defineProps({
  content: Object,
  page: Object,
});
</script>
