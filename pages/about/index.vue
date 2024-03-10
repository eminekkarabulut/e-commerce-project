<template>
  <component v-for="(component, index) in asyncComponents" :key="index" :is="component" :content="page.contents[index]" :page="page.model[0]" />
</template>

<script setup>
import { inject, ref, onMounted, reactive, defineAsyncComponent } from "vue";
import { useInit } from "../../stores/initStore";
import { collection, getDocs } from "firebase/firestore";

const db = inject("firestore");
const initStore = useInit();

const _isLoad = computed(() => initStore._isLoad);
const pages = ref([]);
const page = reactive({
  model: [],
  contents: [],
});

const asyncComponents = ref([]);

onMounted(() => {
  watch(
    _isLoad,
    (newValue) => {
      if (newValue) {
        pages.value = initStore.pageData;
        page.model = pages.value.filter((page) => page.pageId == 2);

        GetContents().then(() => {
          asyncComponents.value = page.contents.map((content) => defineAsyncComponent(() => import(`../../components/${content.componentName}.vue`)));
        });
      }
    },
    { immediate: true }
  );
});

const GetContents = async () => {
  await getDocs(collection(db, `pages/${page.model[0].id}/contents`)).then((response) => {
    page.contents = [];
    response.forEach((doc) => {
      const content = doc.data();
      content.id = doc.id;
      page.contents.push(content);
    });
    page.contents = page.contents.sort((a, b) => {
      return a.contentOrder - b.contentOrder;
    });
  });
};
</script>
