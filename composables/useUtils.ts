import { useInit } from "../stores/initStore";
import { ref } from "vue";
import { collection, getDocs, doc, deleteDoc, setDoc, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export const useUtils = () => {
  const Notify = (notificationMessage: string, notificationClass: string) => {
    const initStore = useInit();
    initStore.notificationMessage = notificationMessage;
    initStore.notificationClass = notificationClass;
    initStore.showNotification = !initStore.showNotification;
    setTimeout(() => {
      initStore.showNotification = !initStore.showNotification;
    }, 3000);
  };

  const GetAccountModal = (showLogin: boolean) => {
    const initStore = useInit();
    initStore.showModal = true;
    initStore.showLogin = showLogin;
  };

  const GetUser = async (user: object) => {
    const initStore = useInit();
    const db = getFirestore();
    await getDocs(collection(db, "users")).then((response) => {
      const users = ref([]);
      response.forEach((doc) => {
        const u = doc.data();
        u.id = doc.id;
        users.value.push(u);
      });
      initStore.SetUser(users.value.filter((u) => u.userId == user.uid)[0]);
      Notify("Giriş işlemi başarılı.", "bg-success");
    });
  };

  const GetUserBasket = async () => {
    const initStore = useInit();
    const db = getFirestore();
    await getDocs(collection(db, "baskets"))
      .then((response) => {
        const baskets = ref([]);
        response.forEach((doc) => {
          const b = doc.data();
          b.id = doc.id;
          baskets.value.push(b);
        });
        initStore.SetBasket(baskets.value.filter((f) => f.userId == initStore.userData.userId)[0]);
      })
      .then(() => {
        GetBasketItems().then(() => {
          SetBasketTotal();
        });
      });
  };

  const GetBasketItems = async () => {
    const initStore = useInit();
    const db = getFirestore();
    await getDocs(collection(db, "baskets", initStore.basketData.id, "items")).then((response) => {
      const basketItems = ref([]);
      response.forEach((doc) => {
        const bi = doc.data();
        bi.id = doc.id;
        basketItems.value.push(bi);
      });
      initStore.SetBasketItems(basketItems.value);
    });
  };

  const ClearBasket = async () => {
    const initStore = useInit();
    const db = getFirestore();
    await deleteDoc(doc(db, "baskets", initStore.basketData.id)).then(() => {
      GetUserBasket().then(() => {
        GetBasketItems();
      });
    });
  };

  const Decrease = async (item: object) => {
    const initStore = useInit();
    const db = getFirestore();
    await setDoc(doc(db, "baskets", initStore.basketData.id, "items", item.id), {
      itemCount: item.itemCount + 1,
      productName: item.productName,
      productId: item.productId,
      currency: item.currency,
      productImage: item.productImage,
      productPrice: item.productPrice,
    }).then(() => {
      GetUserBasket();
      Notify("Sepet başarıyla güncellendi.", "bg-success");
    });
  };

  const Increase = async (item: object) => {
    const initStore = useInit();
    const db = getFirestore();
    if (item.itemCount - 1 == 0) {
      await deleteDoc(doc(db, "baskets", initStore.basketData.id, "items", item.id)).then(() => {
        console.log("Basket item was deleted!");
      });
    } else {
      await setDoc(doc(db, "baskets", initStore.basketData.id, "items", item.id), {
        itemCount: item.itemCount - 1,
        productName: item.productName,
        productId: item.productId,
        currency: item.currency,
        productImage: item.productImage,
        productPrice: item.productPrice,
      }).then(() => {
        GetUserBasket();
        Notify("Sepet başarıyla güncellendi.", "bg-success");
      });
    }
  };

  const AddItem = async (item: object) => {
    const initStore = useInit();
    if (initStore.userData == null) {
      GetAccountModal(true);
    } else {
      if (initStore.basketData == null) {
        CreateBasket().then(() => {
          SetBasket(item);
        });
      } else {
        SetBasket(item);
      }
    }
  };

  const CreateBasket = async () => {
    const initStore = useInit();
    const db = getFirestore();
    await addDoc(collection(db, "baskets"), {
      userId: initStore.userData.userId,
      createdDate: new Date(),
      currency: "₺",
      basketTotal: 0,
    }).then(() => {
      GetUserBasket();
    });
  };

  const SetBasket = async (item: object) => {
    const initStore = useInit();
    const db = getFirestore();
    await addDoc(collection(db, "baskets", initStore.basketData.id, "items"), {
      itemCount: 1,
      productName: item.productName,
      productId: item.productId,
      currency: item.currency,
      productImage: item.productImage,
      productPrice: item.productPrice,
    }).then(() => {
      Notify("Ürün başarıyla sepete eklendi.");
      GetUserBasket();
    });
  };

  const SetBasketTotal = async () => {
    const initStore = useInit();
    const db = getFirestore();

    const basketTotal = ref(0);
    initStore.basketItemsData.forEach((i) => (basketTotal.value += i.itemCount * i.productPrice));
    await setDoc(doc(db, "baskets", initStore.basketData.id), {
      basketTotal: basketTotal.value,
      createdDate: initStore.basketData.createdDate,
      userId: initStore.basketData.userId,
      currency: initStore.basketData.currency,
    }).then(() => {
      GetUserBasket();
    });
  };

  return { Notify, GetAccountModal, GetUser, GetUserBasket, GetBasketItems, ClearBasket, Decrease, Increase, AddItem, CreateBasket, SetBasket };
};
