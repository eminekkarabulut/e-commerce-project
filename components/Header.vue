<template>
  <header class="sticky-header">
    <div class="app-header">
      <div class="container">
        <div v-if="company" class="row w-100 justify-content-between align-items-center">
          <div class="col-4 text-start">
            <NuxtLink to="/" class="nav-brand">
              <img :src="company.companyLogo" class="mr-3 h-6 sm:h-9" :alt="company.companyName" :title="company.companyName" />
            </NuxtLink>
          </div>

          <div class="col-4 text-center">
            <nav class="navbar navbar-expand-lg navbar-light justify-content-center">
              <button @click="NavbarToggle" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                <ul class="navbar-nav">
                  <li v-if="pages" v-for="page in pages" :key="page.id" class="nav-item">
                    <NuxtLink v-if="_isEnglish" :to="page.routeLink" class="nav-link text-dark"> {{ page.pageDisplayName }}</NuxtLink>
                    <NuxtLink v-else :to="page.routeLink" class="nav-link text-dark"> {{ page.pageName }}</NuxtLink>
                  </li>
                  <li class="nav-item">
                    <NuxtLink v-if="_isEnglish" @click="ChangeLang()" class="nav-link text-dark"> ENG </NuxtLink>
                    <NuxtLink v-else @click="ChangeLang()" class="nav-link text-dark"> TR </NuxtLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="col-4 text-end">
            <NuxtLink to="/basket" class="link-style text-dark fw-bold me-3"> <BootstrapIcon name="cart" /> <span>Cart</span></NuxtLink>
            <NuxtLink to="/account" class="link-style text-dark fw-bold"> <BootstrapIcon name="person" /> <span>Account</span></NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useInit } from "../stores/initStore";
import { computed } from "vue";

const initStore = useInit();

const _isEnglish = computed(() => initStore._isEnglish);
const company = computed(() => initStore.companyData);
const pages = computed(() => initStore.headerMenus);

const ChangeLang = () => {
  initStore.ChangeLang();
};

const NavbarToggle = () => {
  const navbar = document.getElementById("navbarSupportedContent");
  if (navbar) {
    if (navbar.style.display === "block") {
      navbar.style.display = "none";
    } else {
      navbar.style.display = "block";
    }
  }
};
</script>
