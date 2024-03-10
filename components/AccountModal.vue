<template>
  <div class="modal d-block" tabindex="-1" v-if="showModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Account</h5>
          <button @click="showModal = false" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form v-if="showLogin">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" v-model="email" class="form-control" id="email" aria-describedby="email" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Şifre</label>
              <input type="password" v-model="password" class="form-control" id="password" />
            </div>
          </form>
          <form v-else>
            <div class="form-group row mb-3">
              <div class="form-group col-md-12">
                <label for="name">Ad Soyad</label>
                <input v-model="name" type="text" class="form-control" id="name" placeholder="Ad Soyad" />
              </div>
            </div>
            <div class="form-group row mb-3">
              <div class="form-group col-md-12">
                <label for="phoneNumber">Telefon Numarası</label>
                <input v-model="phoneNumber" type="text" class="form-control" id="phoneNumber" placeholder="Telefon Numarası" />
              </div>
            </div>
            <div class="form-group row mb-3">
              <div class="form-group col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="email" class="form-control" id="email" aria-describedby="email" />
              </div>
              <div class="form-group col-md-6">
                <label for="password" class="form-label">Şifre</label>
                <input type="password" v-model="password" class="form-control" id="password" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <div class="d-flex justify-content-between" v-if="showLogin">
            <button type="submit" @click="Login" class="btn btn-primary">Giriş Yap</button>
            <button type="button" @click="initStore.showLogin = false" class="btn btn-secondary me-3">Üye Değil Misin? Üye Ol</button>
          </div>
          <div class="d-flex justify-content-between" v-else>
            <button type="submit" @click="Register" class="btn btn-primary">Üye Ol</button>
            <button type="button" @click="initStore.showLogin = true" class="btn btn-secondary ms-auto">Zaten Üye Misin? Giriş Yap</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useInit } from "../../stores/initStore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const { Notify, GetUser, GetUserBasket, GetBasketItems } = useUtils();

const auth = inject("auth");
const db = inject("firestore");

const initStore = useInit();

const showModal = computed(() => initStore.showModal);
const showLogin = computed(() => initStore.showLogin);

const email = ref("");
const password = ref("");
const phoneNumber = ref("");
const name = ref("");

const Register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
      initStore.showLogin = true;
      CreateUser(userCredential.user);
    });
  } catch (error) {
    Notify("Üyelik işlemi başarısız", "bg-danger");
  }
};

const Login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
      initStore.showModal = false;
      GetUser(userCredential.user).then(() => {
        GetUserBasket().then(() => {
          GetBasketItems();
        });
      });
    });
  } catch (error) {
    Notify("Giriş işlemi Başarısız", "bg-danger");
  }
};

const CreateUser = async (user) => {
  await addDoc(collection(db, "users"), {
    userId: user.uid || "",
    createdDate: new Date(),
    email: email.value || "",
    password: password.value || "",
    phoneNumber: phoneNumber.value || "",
    name: name.value || "",
  }).then(() => {
    Notify("Üyelik işlemi başarılı. Girişe yönlendiriliyorsunuz.", "bg-success");
  });
};
</script>
