<template>
  <div v-if="showNotification" class="notification" :class="notificationClass">
    {{ notificationMessage }}
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useInit } from "../../stores/initStore";

const initStore = useInit();

const showNotification = computed(() => initStore.showNotification);
const notificationClass = computed(() => initStore.notificationClass);
const notificationMessage = computed(() => initStore.notificationMessage);
</script>
