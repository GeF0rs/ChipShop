<template>
    <div class="container content-seection">
      <h2 class="g-font-size-25">Каталог товаров<span class="g-font-size-20"> >> {{getCategoryName}}</span></h2>
      <div class="clearfix"></div>
      <products-filters v-if="isLoad" @filter="getFilteredProducts"></products-filters>
      <div class="row">
        <products-item
          v-for="product in filteredProducts"
          :key="product.productId"
          :productData = "product"
        />
      </div>

      <div v-if="!filteredProducts.length">
        <br>
        <p><span class="errortext">Не найдено ни одного товара</span></p>
      </div>
    </div>
</template>

<script>

import ProductsFilters from "./ProductsFilters";
import ProductsItem from "./ProductsItem";

export default {
  name: "AppShop",
  data () {
    return {
      filteredProducts: [],
      isLoad: false
    }
  },
  components: {
    ProductsFilters,
    ProductsItem
  },
  computed: {
    getCategoryName() {
      if (this.$route.query.searchStr) {
        return "Поиск: " + this.$route.query.searchStr;
      }
      else if (this.$route.params.category) {
        return this.$route.params.category.category_title
      }
      else
        return "Все";
    },
    productCount: {
      get(){
        return this.value;
      },
      set(newVal){
        this.value = this.value+1;
      }
    }
  },
  methods: {
    getFilteredProducts (filter) {
      this.filteredProducts = this.$store.getters['products/getProductsByFilter'](filter);
    },
    loadProducts() {
      if (this.$route.query.searchStr)
      {
        this.$store.dispatch('products/getProductsSearch',
          { searchString: this.$route.query.searchStr }
        )
          .then(() => { this.isLoad = true} );
      }
      else if (this.$route.params.category)
      {
        this.$store.dispatch('products/getProductsByCategory',
          { categoryid: this.$route.params.category.categoryId }
        )
          .then(() => { this.isLoad = true} );
      }
      else
      {
        this.$loading(true)
        this.$store.dispatch('products/getProducts')
          .then(() => { this.$loading(false);  this.isLoad = true} )
          .catch(() => { this.$loading(false) } );
      }
    }
  },
  mounted() {

  },
  watch: {
    $route(to, from) {
      this.isLoad = false;
      this.loadProducts();
    }
  },
  created () {
    this.loadProducts();
  }
}
</script>

<style>

</style>
