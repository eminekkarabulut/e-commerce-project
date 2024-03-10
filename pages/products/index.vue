<template>
  <section class="product-section">
    <div class="container">
      <div class="row">
        <div class="col-3">
          <CategoryList :categories="data.categories"></CategoryList>
        </div>
        <div class="col-9">
          <div class="row">
            <div v-for="product in data.products" class="col-lg-4 mb-3">
              <NuxtLink :to="`/products/${product.id}`" class="text-decoration-none">
                <div class="card">
                  <div class="card-header text-center bg-white">
                    <img class="img-fluid" :src="product.productImage" />
                  </div>
                  <div class="card-body text-center">
                    <p class="fs-6 text-center">{{ product.productName }}</p>
                    <p class="fs-5 fw-bold text-center">
                      {{ product.productPrice }} <span>{{ product.currency }}</span>
                    </p>
                    <div v-if="product.itemCount > 0">
                      <button @click="Decrease(product)" class="btn"><BootstrapIcon name="plus-circle-fill fs-3 text-success"></BootstrapIcon></button>
                      <span class="fs-3 mx-3">{{ product.itemCount }}</span>
                      <button @click="Increase(product)" class="btn"><BootstrapIcon name="dash-circle-fill fs-3 text-danger"></BootstrapIcon></button>
                    </div>
                    <button v-else @click="AddItem(product)" class="btn btn-success">Add To Card</button>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { useInit } from "../../stores/initStore";

const initStore = useInit();
const db = inject("firestore");

const { AddItem, Increase, Decrease } = useUtils();

const data = reactive({
  categories: [],
  products: [],
});

onMounted(() => {
  GetCategories();
  GetProducts();
});

const GetCategories = async () => {
  await getDocs(collection(db, "categories")).then((response) => {
    data.categories = [];
    response.forEach((doc) => {
      const category = doc.data();
      category.id = doc.id;
      data.categories.push(category);
    });
  });
};

const GetProducts = async () => {
  await getDocs(collection(db, "products")).then((response) => {
    data.products = [];
    response.forEach((doc) => {
      const product = doc.data();
      product.id = doc.id;
      data.products.push(product);
    });
    data.products.forEach((p) => (p.itemCount = initStore.basketItemsData.filter((f) => f.productId == p.productId)[0].itemCount));
  });
};
</script>
