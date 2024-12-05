<template>
  <div class="goods_list1 row">
    <div
      v-for="category in categories"
      :key="category.categoryId"
      class="col-xs-12 col-sm-4 col-md-3 col-lg-2">
      <div class="item">
          <span class="image">
            <router-link :to="{name: 'shopCategory', params: {categoryId: category.categoryId, category: category}}">
              <img :src="'src/assets' + category.image" :alt="category.category_title" >
            </router-link>
          </span>
        <router-link :to="{name: 'shopCategory', params: {categoryId: category.categoryId, category: category}}">
          {{ category.category_title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
        categories () {
            return this.$store.state.categories.all;
        }
    },
    methods: {
    }
  }
</script>
