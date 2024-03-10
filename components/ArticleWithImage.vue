<template>
  <section class="px-5">
    <div class="container my-5">
      <div class="row">
        <div class="col-lg-6">
          <client-only>
            <Vue3Lottie animationLink="https://lottie.host/faa66263-d3ae-4863-8710-da5d430468f7/Co8USEW3HT.json" :height="300" :width="500" />
          </client-only>
        </div>
        <div class="col-lg-6">
          <div v-if="_isEnglish" class="article-title">
            <div v-html="content.contentDisplayTitle"></div>
          </div>
          <div v-else class="article-title">
            <div v-html="content.contentTitle"></div>
          </div>
        </div>
      </div>

      <div v-if="_isEnglish" class="article-text">
        <div v-html="content.contentDisplayText"></div>
      </div>
      <div v-else class="article-text">
        <div v-html="content.contentText"></div>
      </div>

      <div v-if="items" class="container">
        <div class="row">
          <div v-for="item in items" class="col-lg-4 mt-3">
            <div class="article-item-image w-100" @mouseover="RotateDiv($event.currentTarget)" :style="`background-image: url(${item.itemMedia})`">
              <div class="article-item-text">
                <h4 v-if="_isEnglish" class="text-center">{{ item.itemDisplayTitle }}</h4>
                <h4 v-else class="text-center">{{ item.itemTitle }}</h4>
                <div v-if="_isEnglish" v-html="item.itemDisplayText"></div>
                <div v-else v-html="item.itemText"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, ref, onMounted, defineProps, computed } from "vue";
import { useInit } from "../stores/initStore";
import { collection, getDocs } from "firebase/firestore";
import { gsap } from "gsap";

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

const RotateDiv = (el) => {
  gsap.to(el, { rotation: 360, duration: 1 });
};
</script>
