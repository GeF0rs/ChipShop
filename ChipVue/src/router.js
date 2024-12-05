import Vue from 'vue';
import VueRouter from 'vue-router';

import AppNotFound from './components/AppNotFound';
import AppMain from "./components/AppMain";
import AppDelivery from "./components/AppDelivery";
import AppPayments from "./components/AppPayments";
import AppContacts from "./components/AppContacts";
import AppAbout from "./components/AppAbout";
import AppLogin from "./components/AppLogin";
import AppRegister from "./components/AppRegister";
import AppShop from "./components/AppShop";
import AppCart from "./components/AppCart";
import store from './store'
import AppOrder from "./components/AppOrder";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { name: 'main', path: '/', component: AppMain},
    { name: 'login', path: '/login', component: AppLogin},
    { name: 'register', path: '/register', component: AppRegister},
    { name: 'shop', path: '/shop', component: AppShop },
    { name: 'shopCategory', path: '/shop/:categoryId', component: AppShop},
    { name: 'cart', path: '/cart', component: AppCart},
    { name: 'orders', path: '/orders', component: AppOrder},

    { name: 'delivery', path: '/delivery', component: AppDelivery},
    { name: 'payments', path: '/payments', component: AppPayments},
    { name: 'contacts', path: '/contacts', component: AppContacts},
    { name: 'about', path: '/about', component: AppAbout},

    { name: 'notFound', path: '*', component: AppNotFound}
  ]
});

router.beforeEach((to, from, next) => {
  const notPublicPages = ['/orders'];
  const authRequired = notPublicPages.includes(to.path);
  const loggedIn = store.state.auth.status.loggedIn;

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;

