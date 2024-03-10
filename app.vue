<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Teleport to="body">
      <Notification />
      <AccountModal />
    </Teleport>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import { useInit } from "../stores/initStore";
import { collection, getDocs } from "firebase/firestore";

const db = inject("firestore");
const initStore = useInit();

const showNotification = computed(() => initStore.showNotification);
const notificationMessage = computed(() => initStore.notificationMessage);
const notificationClass = computed(() => initStore.notificationClass);

onMounted(() => {
  GetCompany();
  GetPages();
});

const GetCompany = async () => {
  getDocs(collection(db, "company")).then((response) => {
    const companies = ref([]);
    response.forEach((doc) => {
      const company = doc.data();
      company.id = doc.id;
      companies.value.push(company);
    });
    initStore.SetCompany(companies.value[0]);
  });
};

const GetPages = async () => {
  getDocs(collection(db, "pages")).then((response) => {
    const pages = ref([]);
    response.forEach((doc) => {
      const page = doc.data();
      page.id = doc.id;
      pages.value.push(page);
    });
    pages.value = pages.value.sort((a, b) => {
      return a.pageOrder - b.pageOrder;
    });
    initStore.SetPage(pages.value);
  });
};
</script>
