import axios from 'axios';
import authHeader from "../../services/auth-header";

const state = {
  all: []
};

const getters = {
  orderTotalPrice: state => order => {
    let findOrder = state.all.find(o => o.orderId === order.orderId);
    if (!findOrder){
      return 0;
    }

    let value = findOrder.orderDetails.reduce(function (sum, current) {
      return sum + current.productPrice * current.productCount;
    }, 0);
    return value.toFixed(2);

  }
};

const mutations = {
  SET_ORDERS (state, orders) {
    state.all = orders;
  },
  SET_TO_PAY (state, payload) {
    let findOrder = state.all.find(o => o.orderId === payload.order.orderId);
    if (findOrder) {
      findOrder.paymentDate = payload.dateTimePay;
    }
  },
  DELETE_ORDER (state, order) {
    const index = state.all.indexOf(order)
    if (index > -1) {
      state.all.splice(index, 1);
    }
  }
};

const actions = {
  getOrders (context) {
    return axios
      .get('Orders', { headers: authHeader() })
      .then(response => {
        context.commit('SET_ORDERS', response.data)
      });
  },
  toPayOrder(context, order) {
    return axios
      .post('Orders/ToPay', { }, { headers: authHeader(), params: { id: order.orderId }})
      .then(response => {
         context.commit('SET_TO_PAY', {dateTimePay: response.data.paymentDate,
                                       order: order});
      });
  },
  cancelOrder(context, order) {
    return axios
      .delete('Orders/' + order.orderId, { headers: authHeader() })
      .then(({response, status}) => {
        context.commit('DELETE_ORDER', order)
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
