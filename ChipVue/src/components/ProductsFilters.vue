<template>
  <div class="form-inline">
    <select class="custom-select mb-2 mr-sm-2" v-model="filter.selectCategory" :disabled="this.$route.params.category">
        <option value = 0>Все категории</option>
        <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">{{ category.category_title }}</option>
    </select>

    <label class="control-label mb-2 mr-sm-2">Фильтр по цене</label>
    <input class="form-control mb-2 mr-sm-2 col-lg-2 col-md-2" v-model.number="filter.minPrice" type="number" min="0" />
    <input class="form-control mb-2 mr-sm-2 col-lg-2 col-md-2" v-model.number="filter.maxPrice" type="number" min="0" />

    <select class="custom-select mb-2 mr-sm-2 col-lg-2 col-md-2" v-model="filter.selectSort">
        <option v-for="rule in sortRules" :key="rule.key" :value="rule.key">{{ rule.title }}</option>
    </select>

    <button @click="clear" class="btn btn-danger btn-sm">Сбросить фильтры</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "ProductsFilters",
    data () {
      return {
        sortRules: [
          { key :'title:asc', title: 'По названию, A-Z' },
          { key :'title:desc', title: 'По названию, Z-A' },
          { key :'price:asc', title: 'По цене, сначала дешевые' },
          { key :'price:desc', title: 'По цене, сначала дорогие' }
        ],
        filter: {
          selectCategory: 0,
          minPrice: 0,
          maxPrice: 0,
          selectSort: 'title:asc'
        }
      }
    },
    computed: {
      ...mapGetters('products', {
        minPriceAll: 'minPrice',
        maxPriceAll: 'maxPrice'
      }),
      categories () {
        return this.$store.state.categories.all;
      }
    },
    mounted () {
       this.clear();
    },
    watch: {
      products () {
        this.filter.minPrice = this.minPriceAll;
        this.filter.maxPrice = this.maxPriceAll;
      },
      filter: {
        handler (newFilter) {
            this.$emit('filter', newFilter);
        },
        deep: true
      }
    },
    methods: {
      clear () {
        this.filter = {
          selectCategory: 0,
          minPrice: this.minPriceAll,
          maxPrice: this.maxPriceAll,
          selectSort: 'title:asc'
        }
      }
    }
  }
</script>

<style>

</style>
