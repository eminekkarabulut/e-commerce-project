<template>
  <div class="card">
    <div class="card-header">
      <h6>CATEGORIES</h6>
    </div>
    <div class="card-body">
      <ul v-if="_isEnglish">
        <li v-for="cat in categories" :key="cat.id">{{ cat.categoryDisplayName }}</li>
      </ul>
      <ul v-else>
        <li v-for="cat in categories" :key="cat.id">{{ cat.categoryName }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useInit } from "../stores/initStore";

const initStore = useInit();
const _isEnglish = computed(() => initStore._isEnglish);

const props = defineProps({
  categories: Object,
});
</script>
