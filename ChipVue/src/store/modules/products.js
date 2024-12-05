import _ from 'lodash';
import axios from 'axios';

const state = {
    all: []
};

const getters = {
    minPrice: (state) => {
        return state.all.length
            ? Number(_.minBy(state.all, 'price').price)
            : 0;
    },
    maxPrice: (state) => {
        return state.all.length
            ? Number(_.maxBy(state.all, 'price').price)
            : 0;
    },
    getProductsByFilter: state => filter => {
        // Фильтруем товары

        let filtered = state.all
            // По категории
            .filter(product => {
                return parseInt(filter.selectCategory) === 0 ||
                                product.categoryCategoryId === filter.selectCategory;
            })

            // По ценам
            .filter(product => {
                return Number(product.price) >= filter.minPrice &&
                              Number(product.price) <= filter.maxPrice;
            });

        // Сортируем
        let sortKey = filter.selectSort.split(':')[0];
        let sortDir = filter.selectSort.split(':')[1];

        let sorted = _.sortBy(filtered, product => {
            return Number(product[sortKey]);
        });

        // При необходимости сортируем в обратном направлении
        if (sortDir === 'desc') {
            sorted = sorted.reverse();
        }

        return sorted;
    }
};

const mutations = {
  SET_PRODUCTS (state, products) {
    state.all = products;
  }
};

const actions = {
  getProducts (context) {
    return axios
        .get('Products')
        .then(response => {
            context.commit('SET_PRODUCTS', response.data)
        });

  },
  getProductsByCategory (context, category) {
    return axios
      .get('Products/Category/' + category.categoryid)
      .then(response => {
        context.commit('SET_PRODUCTS', response.data)
      });
  },
  getProductsSearch (context, search) {
    return axios
      .get('Products/Search', { params: { searchString: search.searchString } })
      .then(response => {
        context.commit('SET_PRODUCTS', response.data)
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
