<template>
  <div class="breadcrumb-banner">
    <img :src="content.contentMedia" class="breadcrumb-background" />
    <div class="container-fluid">
      <div class="breadcrumb-title text-center">
        <ul>
          <li class="me-0">
            <a href="/" class="text-decoration-none text-light fs-6">
              <small v-if="_isEnglish">Home</small>
              <small v-else>Anasayfa</small>
            </a>
          </li>
          <li class="text-light fs-6 m-1"><small> / </small></li>
          <li class="text-light fs-6">
            <small v-if="_isEnglish">{{ content.contentDisplayTitle }}</small>
            <small v-else>{{ content.contentTitle }}</small>
          </li>
        </ul>
        <h1 v-if="_isEnglish" class="text-light">{{ content.contentDisplayTitle }}</h1>
        <h1 v-else class="text-light">{{ content.contentTitle }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useInit } from "../stores/initStore";

const initStore = useInit();
const _isEnglish = computed(() => initStore._isEnglish);

const props = defineProps({
  content: Object,
  page: Object,
});
</script>
