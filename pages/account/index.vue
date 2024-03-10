<template>
  <section>
    <div class="container">
      <div class="row"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useInit } from "../../stores/initStore";
const initStore = useInit();

const { GetAccountModal } = useUtils();

const user = ref();

onMounted(() => {
  if (initStore.userData == null) {
    GetAccountModal(true);
  } else {
    user = initStore.userData;
  }
});
</script>
