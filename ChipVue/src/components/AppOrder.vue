<template>
  <div class="container content-seection">
    <h2 class="g-font-size-25">Заказы</h2>
    <div class="clearfix"></div>
    <br>
    <template v-if="this.$store.state.orders.all.length">
    <table class="table">
      <thead>
      <tr>
        <th>
          Перечень ваших заказов
        </th>
        <th>
          Действия
        </th>
        <th></th>
      </tr>
      </thead>
      <tbody>

        <order-item
          v-for="order in this.$store.state.orders.all"
          :key="order.orderId"
          :orderData = "order"
        />

      </tbody>
    </table>
    </template>
    <template v-else>
      <p><span class="errortext">У вас нет заказов</span></p>
    </template>
    <br>
  </div>
</template>

<script>
import OrderItem from "./OrderItem";

export default {
  name: "AppOrder",
  components: {
    OrderItem
  },
  data() {
    return {

    };
  },
  created() {
    this.$store.dispatch('orders/getOrders')
      .then(() => {

      })
      .catch(error => {
        console.log('Я тута!');
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
</script>

<style>

</style>
