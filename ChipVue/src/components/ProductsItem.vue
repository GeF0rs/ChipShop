<template>
  <div class="col-12 col-lg-3 col-md-4 col-sm-6 ">
    <div class="product-item-container">
      <div class="product-item text-center">
        <img class="img-fluid" :src="'src/assets' + productData.image" :alt="productData.title">
        <br>
        <div class="product-item-title">
          <a href="">{{ productData.title }}</a>
        </div>
        <div class="clearfix"></div>
        <div class="product-item-info-container product-item-price-container col-xs-12">
          <span class="product-item-price-current">
              {{ productData.price }} руб.
          </span>
        </div>

        <div class="col-xs-12 g-font-size-11">
          <div>
            {{ productData.description }}
          </div>
        </div>

        <div class="clearfix"></div>
        <hr>

        <div class="product-item-info-container">
          <div class="product-item-amount">
            <div class="product-item-amount-field-container">
              <input
                class = "product-item-amount-field"
                min = "1"
                v-model.number = quantity
                type = "number">
                <span class="product-item-amount-description-container">
                  <span>
                      {{ productData.units }}
                  </span>
                </span>
            </div>
          </div>
        </div>

        <div class="product-item-info-container">
          <div class="product-item-button-container">
            <button class="btn btn-default btn-sm" @click="addToCart()"> В корзину </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsItem",
  data () {
    return {
      quantity: 1
    }
  },
  props: {
    productData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    addToCart() {
      this.$store.dispatch('cart/addToCart',
        {  product: this.productData,
          quantity: this.quantity
        }
      )
      .then(() => {
        this.$notify({
          text: 'Товар успешно добавлен в корзину!',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style>

</style>
