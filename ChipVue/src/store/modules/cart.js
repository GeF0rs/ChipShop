import axios from 'axios';
import authHeader from "../../services/auth-header";

let cartlocalStorage = window.localStorage.getItem('cart');

const state = {
  all: cartlocalStorage ? JSON.parse(cartlocalStorage) : []
};

const getters = {
  cartTotalPrice: () => {
    let value = state.all.reduce(function (sum, current) {
      return sum + current.product.price * current.quantity;
    }, 0);
    return value.toFixed(2);
  }
};

const mutations = {
  SET_TO_CART (state, payload) {
    let founded = state.all.find(p => p.product.productId === payload.product.productId);
    if(!founded){
      state.all.push({
        product: payload.product,
        quantity: payload.quantity
      })
    }
    else {
      founded.quantity += payload.quantity;
    }
  },
  DELETE_FROM_CART (state, payload) {
    const index = state.all.indexOf(payload.cart)
    if (index > -1) {
      state.all.splice(index, 1);
    }
  },
  SAVE_CART_TO_STORE (state) {
    localStorage.setItem('cart', JSON.stringify(state.all));
  },
  SET_CHECKOUT (state){
    state.all.splice(0, state.all.length);
    localStorage.removeItem('cart');
  }
};

const actions = {
  addToCart(context, payload) {
    context.commit('SET_TO_CART', payload);
    context.commit('SAVE_CART_TO_STORE');
  },
  deleteFromCart(context, payload) {
    context.commit('DELETE_FROM_CART', payload);
    context.commit('SAVE_CART_TO_STORE');
  },
  createOrder(context) {
    let arrOfProducts = [];
    state.all.map(function(cartItem) {
      arrOfProducts.push(
        {
          productTitle: cartItem.product.title,
          productDescription: cartItem.product.description,
          productPrice: cartItem.product.price,
          productUnits: cartItem.product.units,
          productCount: cartItem.quantity
        }
      );

    });

    return axios
      .post('Orders', arrOfProducts, { headers: authHeader() })
      .then(({response, status}) => {
        context.commit('SET_CHECKOUT')
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
