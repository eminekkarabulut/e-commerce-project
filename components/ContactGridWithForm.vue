<template>
  <section class="px-5">
    <div class="container my-5">
      <div v-if="content" class="row">
        <div class="col-md-9 mb-md-0 mb-5 card p-5 form-card">
          <h3 v-if="_isEnglish">{{ content.contentDisplayTitle }}</h3>
          <h3 v-else>{{ content.contentTitle }}</h3>
          <form id="contact-form" name="contact-form" action="/" method="POST">
            <div class="row mt-3">
              <div class="col-md-12">
                <div class="md-form mb-0">
                  <input type="text" id="name" name="name" class="form-control" />
                  <label v-if="_isEnglish" for="name" class="">Full Name*</label>
                  <label v-else for="name" class="">Ad Soyad*</label>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-6">
                <div class="md-form mb-0">
                  <input type="text" id="email" name="email" class="form-control" />
                  <label v-if="_isEnglish" for="email" class="">Email Address</label>
                  <label v-else for="email" class="">Email Adresi</label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="md-form mb-0">
                  <input type="text" id="name" name="name" class="form-control" />
                  <label v-if="_isEnglish" for="name" class="">Phone Number*</label>
                  <label v-else for="name" class="">Telefon Numarası*</label>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-12">
                <div class="md-form mb-0">
                  <input type="text" id="subject" name="subject" class="form-control" />
                  <label v-if="_isEnglish" for="subject" class="">Subject</label>
                  <label v-else for="subject" class="">Konu</label>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-12">
                <div class="md-form">
                  <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                  <label v-if="_isEnglish" for="message">Message*</label>
                  <label v-else for="message">Mesaj*</label>
                </div>
              </div>
            </div>
            <div class="text-end">
              <a v-if="_isEnglish" class="btn btn-primary" onclick="document.getElementById('contact-form').submit();">Send</a>
              <a v-else class="btn btn-primary" onclick="document.getElementById('contact-form').submit();">Gönder</a>
            </div>
          </form>
        </div>
        <div class="col-md-3 my-auto">
          <ul v-if="company" class="list-unstyled">
            <li class="text-center">
              <BootstrapIcon name="geo-alt" class="mt-4 fs-1" />
              <p>
                <NuxtLink to="" class="link-style text-dark"> {{ company.companyAddress }}</NuxtLink>
              </p>
            </li>

            <li class="text-center">
              <BootstrapIcon name="envelope" class="mt-4 fs-1" />
              <p>
                <a :href="`mailto:${company.companyMail}`" class="link-style text-dark"> {{ company.companyMail }} </a>
              </p>
            </li>

            <li class="text-center">
              <BootstrapIcon name="telephone" class="mt-4 fs-1" />
              <p>
                <a :href="`tel:${company.companyPhone}`" class="link-style text-dark"> {{ company.companyPhone }} </a>
              </p>
            </li>

            <li class="text-center">
              <BootstrapIcon name="printer" class="mt-4 fs-1" />
              <p>
                <NuxtLink to="" class="link-style text-dark"> {{ company.companyFax }}</NuxtLink>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed } from "vue";
import { useInit } from "../stores/initStore";

const initStore = useInit();
const _isEnglish = computed(() => initStore._isEnglish);
const company = computed(() => initStore.companyData);

const props = defineProps({
  content: Object,
  page: Object,
});
</script>
