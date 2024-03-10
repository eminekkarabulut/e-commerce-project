<template>
  <section class="product-detail-section">
    <div v-if="product" class="container">
      <div class="row">
        <div class="col-lg-6">
          <img :src="product.productImage" class="img-fluid" />
        </div>
        <div class="col-lg-6">
          <h2>{{ product.productName }}</h2>
          <p class=""><strong>Stock Code:</strong> {{ product.stockCode }}</p>
          <hr />
          <p>{{ product.productDesc }}</p>
          <p class="fs-3 fw-bold">
            {{ product.productPrice }} <span>{{ product.currency }}</span>
          </p>
          <div v-if="basketItem">
            <button @click="Decrease(basketItem)" class="btn"><BootstrapIcon name="plus-circle-fill fs-3 text-success"></BootstrapIcon></button>
            <span class="fs-3 mx-3">{{ basketItem.itemCount }}</span>
            <button @click="Increase(basketItem)" class="btn"><BootstrapIcon name="dash-circle-fill fs-3 text-danger"></BootstrapIcon></button>
          </div>
          <button v-else @click="AddItem(product)" class="btn btn-success">Add To Card</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { collection, getDocs } from "firebase/firestore";
import { useInit } from "../../stores/initStore";

const db = inject("firestore");

const route = useRoute();
const initStore = useInit();

const { AddItem, Increase, Decrease } = useUtils();

const product = ref();
const basketItem = computed(() => (initStore.basketItemsData != null && product.value != null ? initStore.basketItemsData.filter((i) => i.productId == product.value.productId)[0] : null));

watch(
  basketItem,
  (oldValue, newValue) => {
    console.log("oldValue, newValue", oldValue, newValue);
  },
  { immediate: true }
);

onMounted(() => {
  GetProduct();
});

const GetProduct = async () => {
  await getDocs(collection(db, "products")).then((response) => {
    const products = ref([]);
    response.forEach((doc) => {
      const prod = doc.data();
      prod.id = doc.id;
      products.value.push(prod);
    });
    product.value = products.value.filter((p) => p.id == route.params.id)[0];
  });
};
</script>
