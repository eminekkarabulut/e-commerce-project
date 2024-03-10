<template>
  <footer class="px-5">
    <div class="container border-top">
      <div class="row pt-5 text-muted">
        <div v-if="company" class="col-lg-6 col-12 mb-3">
          <img class="img-fluid mb-3" :src="company.companyLogo" :alt="company.companyName" :title="company.companyName" />
          <p v-if="_isEnglish">{{ company.companyDisplayDesc }}</p>
          <p v-else>{{ company.companyDesc }}</p>
        </div>

        <div v-if="pages" class="col-lg-2 col-6 mb-3">
          <h5 v-if="_isEnglish">MENUS</h5>
          <h5 v-else>MENÜLER</h5>

          <ul class="nav flex-column">
            <li v-for="page in pages" :key="page.id" class="nav-item mb-3">
              <NuxtLink v-if="_isEnglish" :to="page.routeLink" class="nav-link text-muted p-0"> {{ page.pageDisplayName }}</NuxtLink>
              <NuxtLink v-else :to="page.routeLink" class="nav-link text-muted p-0"> {{ page.pageName }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="col-lg-4 col-6 mb-3">
          <h5 v-if="_isEnglish">CONTACT</h5>
          <h5 v-else>İLETİŞİM</h5>
          <ul v-if="company" class="nav flex-column">
            <li class="nav-item mb-3">
              <BootstrapIcon name="geo-alt" class="me-1" />
              <NuxtLink to="" class="link-style text-dark"> {{ company.companyAddress }}</NuxtLink>
            </li>
            <li class="nav-item mb-3">
              <BootstrapIcon name="envelope" class="me-1" />
              <a :href="`mailto:${company.companyMail}`" class="link-style text-dark"> {{ company.companyMail }} </a>
            </li>
            <li class="nav-item mb-3">
              <BootstrapIcon name="telephone" class="me-1" />
              <a :href="`tel:${company.companyPhone}`" class="link-style text-dark"> {{ company.companyPhone }} </a>
            </li>
            <li class="nav-item mb-3">
              <BootstrapIcon name="printer" class="me-1" />
              <NuxtLink to="" class="link-style text-dark"> {{ company.companyFax }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="company" class="row justify-content-between border-top">
        <div class="col-6">
          <span v-if="_isEnglish" class="text-muted">2022 © {{ company.companyName }}, All Rights Reserved.</span>
          <span v-else class="text-muted">2022 © {{ company.companyName }}, Tüm Hakları Saklıdır.</span>
        </div>
        <div class="col-6">
          <ul class="list-group list-group-horizontal list-unstyled float-end">
            <li class="ms-3">
              <a :href="company.companyFacebook" class="link-dark" target="_blank"> <BootstrapIcon name="facebook" /> </a>
            </li>
            <li class="ms-3">
              <a :href="company.companyTwitter" class="link-dark" target="_blank"> <BootstrapIcon name="twitter" /> </a>
            </li>
            <li class="ms-3">
              <a :href="company.companyInstagram" class="link-dark" target="_blank"> <BootstrapIcon name="instagram" /> </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { useInit } from "../stores/initStore";
import { computed } from "vue";

const initStore = useInit();

const _isEnglish = computed(() => initStore._isEnglish);
const company = computed(() => initStore.companyData);
const pages = computed(() => initStore.footerMenus);
</script>
