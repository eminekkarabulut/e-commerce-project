<template>
  <section class="basket-section">
    <div class="container">
      <div class="row">
        <div v-if="basketItems" class="col-lg-9">
          <table class="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Item Price</th>
                <th>Amount</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="basketItem in basketItems" :key="basketItem.id">
                <td>
                  <img :src="basketItem.productImage" width="50" height="50" />
                  {{ basketItem.productName }}
                </td>
                <td>
                  <button @click="Decrease(basketItem)" class="btn"><BootstrapIcon name="plus-circle-fill fs-3 text-success"></BootstrapIcon></button>
                  <span class="fs-3 mx-3">{{ basketItem.itemCount }}</span>
                  <button @click="Increase(basketItem)" class="btn"><BootstrapIcon name="dash-circle-fill fs-3 text-danger"></BootstrapIcon></button>
                </td>
                <td>{{ basketItem.productPrice }} {{ basketItem.currency }}</td>
                <td>{{ basketItem.productPrice }} {{ basketItem.currency }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="basket" class="col-lg-3">
          <div class="card">
            <div class="card-body bg-light-secondary">
              <h3>Summary</h3>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <span>Total: </span>
                  <span class="ms-auto">{{ basket.basketTotal }} {{ basket.currency }}</span>
                </li>
              </ul>
              <div class="row m-3">
                <button class="btn btn-success" @click="CreateOrder">Create Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { doc, setDoc } from "firebase/firestore";
import { useInit } from "../../stores/initStore";

const db = inject("firestore");
const initStore = useInit();
const { Notify, GetAccountModal, GetUserBasket, GetBasketItems, ClearBasket, Increase, Decrease } = useUtils();

const basket = computed(() => initStore.basketData);
const basketItems = computed(() => initStore.basketItemsData);

onMounted(() => {
  if (initStore.userData == null) {
    GetAccountModal(true);
  } else {
    GetUserBasket().then(() => {
      GetBasketItems();
    });
  }
});

const CreateOrder = async () => {
  await setDoc(doc(db, "orders", initStore.basketData.id, "items", basketItem.value.id), {
    basketId: initStore.basketData.id,
    userId: initStore.userData.id,
  }).then(() => {
    ClearBasket();
    Notify("Sipariş başarıyla oluşturuldu.", "bg-success");
  });
};
</script>
