<template>
  <section class="px-5">
    <div class="container my-5">
      <div v-if="_isEnglish" class="row justify-content-center">
        <div v-for="item in items" class="col-lg-3 col-6 text-center">
          <img :src="item.itemMedia" class="img-fluid grid-image img-thumbnail w-75" />
          <h3 class="mt-4">{{ item.itemDisplayTitle }}</h3>
          <div v-html="item.itemDisplayText" class="grid-list"></div>
        </div>
      </div>
      <div v-else class="row justify-content-center">
        <div v-for="item in items" class="col-lg-3 col-6 text-center">
          <img :src="item.itemMedia" class="img-fluid grid-image img-thumbnail w-75" />
          <h3 class="mt-4">{{ item.itemTitle }}</h3>
          <div v-html="item.itemText" class="grid-list"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, ref, onMounted, defineProps, computed } from "vue";
import { useInit } from "../stores/initStore";
import { collection, getDocs } from "firebase/firestore";

const db = inject("firestore");
const initStore = useInit();

const _isEnglish = computed(() => initStore._isEnglish);

const items = ref([]);
const props = defineProps({
  content: Object,
  page: Object,
});

const GetItems = async () => {
  await getDocs(collection(db, `/pages/${props.page.id}/contents/${props.content.id}/items`)).then((response) => {
    items.value = [];
    response.forEach((doc) => {
      const item = doc.data();
      item.id = doc.id;
      items.value.push(item);
    });
  });
};

onMounted(() => {
  GetItems().then(() => {
    items.value = items.value.sort((a, b) => {
      return a.itemOrder - b.itemOrder;
    });
  });
});
</script>
