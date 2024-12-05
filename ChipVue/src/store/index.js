import Vue from 'vue';
import Vuex from 'vuex';

import categories from './modules/categories';
import { auth } from './modules/auth.module';
import products from './modules/products';
import cart from "./modules/cart";
import orders from "./modules/orders";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    categories,
    products,
    cart,
    orders
  }
});
