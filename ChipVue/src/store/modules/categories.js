import axios from 'axios';

const state = {
    all: []
};

const getters = {
    getCategory: state => id => {
        return _.find(state.all, { id: id });
    }
};

const mutations = {
    SET_CATEGORIES (state, categories) {
        state.all = categories;
    }
};

const actions = {
  getCategories (context) {
    return axios
      .get('categories')
      .then(response => {
          context.commit('SET_CATEGORIES', response.data)
      })
      .catch(errors => {
        console.log(errors)
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
