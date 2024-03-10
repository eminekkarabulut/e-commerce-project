<template>
  <section class="px-5">
    <div class="container my-5">
      <div class="row">
        <h3 v-if="_isEnglish">{{ content.contentDisplayTitle }}</h3>
        <h3 v-else>{{ content.contentTitle }}</h3>
        <div v-if="items.length" class="container px-5">
          <Carousel :items-to-show="itemsToShow" :wrap-around="true" :autoplay="4000">
            <Slide v-for="item in items" :key="item.id" class="m-3">
              <img :src="item.itemMedia" class="img-fluid" @click="ShowModal(item.itemMedia)" />
            </Slide>

            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
        <div v-if="_isEnglish" v-html="content.contentDisplayText"></div>
        <div v-else v-html="content.contentText"></div>
      </div>
    </div>
  </section>
  <div v-if="modalShow" class="modal-wrapper">
    <div class="modal-expanded">
      <button class="btn" @click="CloseModal">
        <BootstrapIcon name="x" class="modal-text" />
      </button>
      <img :src="imageUrl" class="img-fluid" />
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, defineProps, computed } from "vue";
import { useInit } from "../stores/initStore";
import { collection, getDocs } from "firebase/firestore";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const db = inject("firestore");

const initStore = useInit();
const _isEnglish = computed(() => initStore._isEnglish);

const items = ref([]);
const props = defineProps({
  content: Object,
  page: Object,
});

const itemsToShow = ref(5);

const modalShow = ref(false);
const imageUrl = ref("");

const ShowModal = (itemMedia) => {
  modalShow.value = true;
  imageUrl.value = itemMedia;
};

const CloseModal = () => {
  modalShow.value = false;
};

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

  window.addEventListener("resize", HandleResize);
  HandleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", HandleResize);
});

const HandleResize = () => {
  if (window.innerWidth < 768) {
    itemsToShow.value = 1;
  } else {
    itemsToShow.value = 5;
  }
};
</script>
