<template>
  <section>
    <div class="contaier-fluid">
      <iframe :src="company.companyMap" width="100%" height="500" style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </section>
</template>
<script setup>
import { computed } from "vue";
import { useInit } from "../stores/initStore";

const initStore = useInit();
const company = computed(() => initStore.companyData);
</script>
