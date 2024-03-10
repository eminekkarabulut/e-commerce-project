import { defineStore } from "pinia";

export const useInit = defineStore("init", {
  state: () => ({
    companyData: null,
    pageData: null,
    userData: null,
    basketData: null,
    basketItemsData: null,
    _isEnglish: true,
    _isLoad: false,
    headerMenus: null,
    footerMenus: null,
    showNotification: false,
    notificationMessage: "",
    notificationClass: "",
    showModal: false,
    showLogin: true,
  }),

  actions: {
    async SetCompany(company) {
      try {
        this.companyData = company;
        if (this.pageData != null) this._isLoad = true;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async SetPage(page) {
      try {
        this.pageData = page;
        this.headerMenus = page.filter((page) => page.headerShow == true);
        this.footerMenus = page.filter((page) => page.footerShow == true);
        if (this.companyData != null) this._isLoad = true;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async SetUser(user) {
      try {
        this.userData = user;
      } catch {
        console.log(error);
        return error;
      }
    },
    async SetBasket(basket) {
      try {
        this.basketData = basket;
      } catch {
        console.log(error);
        return error;
      }
    },
    async SetBasketItems(basketItems) {
      try {
        this.basketItemsData = basketItems;
      } catch {
        console.log(error);
        return error;
      }
    },
    async ChangeLang() {
      try {
        this._isEnglish = !this._isEnglish;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});
