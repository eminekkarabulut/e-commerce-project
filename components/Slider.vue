<template>
  <Carousel :items-to-show="1" :wrap-around="true">
    <Slide v-for="item in items" :key="item.id" :class="{ active: index == 0 }">
      <img :src="item.itemMedia" class="img-fluid w-100" />
    </Slide>

    <template #addons>
      <Navigation />
      <!-- <Pagination /> -->
    </template>
  </Carousel>
</template>
<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { inject, ref, onMounted, defineProps } from "vue";
import { collection, getDocs } from "firebase/firestore";

const db = inject("firestore");

const items = ref([]);
const props = defineProps({
  content: Object,
  page: Object,
});

onMounted(() => {
  GetItems().then(() => {
    items.value = items.value.sort((a, b) => {
      return a.itemOrder - b.itemOrder;
    });
  });
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
</script>
