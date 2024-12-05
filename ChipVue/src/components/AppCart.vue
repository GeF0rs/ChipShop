<template>
  <div class="container content-seection">
    <h2 class="g-font-size-25">Моя корзина</h2>
    <div class="clearfix"></div>
    <br>

    <template v-if="this.$store.state.cart.all.length">

    <table class="table">
      <thead>
      <tr>
        <th class="text-left g-font-size-16">Наименование</th>
        <th class="text-center g-font-size-16">Цена</th>
        <th class="text-center g-font-size-16">Количество</th>
        <th class="text-right g-font-size-16">Сумма</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        <tr
          v-for="cart in this.$store.state.cart.all"
          :key="cart.product.productId"
        >
          <td class="text-left">
            <img class="basket-item-image" :src="'src/assets' + cart.product.image">
            <span class="g-font-size-18">{{ cart.product.title }}</span>
            <p class="g-font-size-13">{{ cart.product.description }}</p>
          </td>
          <td class="text-center g-font-size-17">{{ cart.product.price }} руб.</td>
          <td class="text-center g-font-size-17">{{ cart.quantity }} {{ cart.product.units }}</td>
          <td class="text-right g-font-size-17">
            {{ (cart.product.price * cart.quantity).toFixed(2) }} руб.
          </td>
          <td>
            <input class="btn btn-sm btn-danger" type="submit" value="Удалить" @click="deleteFromCart(cart)" />
          </td>
        </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="3" class="text-right g-font-size-20">Итого:</td>
        <td class="text-right g-font-size-20">
          {{ this.$store.getters["cart/cartTotalPrice"] }} руб.
        </td>
      </tr>
      </tfoot>
    </table>

    <div class="text-center">
      <router-link :to="{name: 'shop'}" class="btn btn-default">
        Продолжить покупки
      </router-link>
      <button class = "btn btn-default" @click="createOrder">
        Оформить заказ
      </button>
    </div>

    </template>
    <template v-else>
      <p><span class="errortext">Ваша корзина пуста</span></p>
    </template>
    <br>
  </div>
</template>

<script>

export default {
  name: "AppCart",
  methods: {
    deleteFromCart(cart) {
      this.$store.dispatch('cart/deleteFromCart', {  cart: cart });
    },
    createOrder() {
      if (!this.$store.state.auth.status.loggedIn) {
        this.$router.push('login');
        return;
      }

      this.$store.dispatch('cart/createOrder')
      .then(() => {
        this.$notify({
          text: 'Заказ успешно оформлен!',
          type: 'success'
        });
        this.$router.push('orders');
      })
      .catch(error => {

        if (error.response) {
          if(error.response.status === 401) {
            this.$notify({
              title: 'Необходима авторизация',
              text: (error.response ? error.response.data.errorText : ''),
              type: 'error'
            });
            this.$store.dispatch('auth/logout');
            this.$router.push('login');
          } else
          {
            this.$notify({
              title: 'Что-то пошло не так',
              text: (error.response ? error.response.data.errorText : ''),
              type: 'error'
            })
          }
        }

      });
    }
  }
}
</script>

<style>

</style>
