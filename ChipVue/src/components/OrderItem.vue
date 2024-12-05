<template>
  <tr>
  <td>
    <a class="btn btn-outline-primary" @click="isOpen = !isOpen" role="button" href = "javascript:;">
      Заказ № {{ orderData.orderId }} от {{moment(orderData.dateDoc).locale("ru").format('lll')}} на сумму: {{ this.$store.getters["orders/orderTotalPrice"](orderData) }} руб.
    </a>
    <transition name="slide" >
    <div class="collapse show v-fade" v-show = "isOpen">
      <div class="card card-body">

        <table class="table table-sm">
          <thead>
          <tr>
            <th class="text-left g-font-size-13">Наименование</th>
            <th class="text-center g-font-size-13">Цена</th>
            <th class="text-center g-font-size-13">Количество</th>
            <th class="text-right g-font-size-13">Сумма</th>
            <th></th>
          </tr>
          </thead>
          <tbody>

          <tr
            v-for="orderDetail in orderData.orderDetails"
            :key="orderDetail.orderDetailId">
            <td class="text-left">
              <span class="g-font-size-15">{{ orderDetail.productTitle }}</span>
              <p class="g-font-size-10">{{ orderDetail.productDescription }}</p>
            </td>
            <td class="text-center g-font-size-14">{{ orderDetail.productPrice }} руб.</td>
            <td class="text-center g-font-size-14">{{ orderDetail.productCount }} {{ orderDetail.productUnits }}.</td>
            <td class="text-right g-font-size-14">
              {{ orderDetail.productCount * orderDetail.productPrice }} руб.
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    </transition>
  </td>
  <td>
    <template v-if="orderData.paymentDate">
      <button class = "btn btn-sm btn-info" @click="getCheck">
        Показать чек
      </button>
    </template>
    <template v-else>
      <button class = "btn btn-sm btn-success" @click="toPay">
        Оплатить
      </button>
      <button class = "btn btn-sm btn-danger" @click="cancelOrder">
        Отменить
      </button>
    </template>
  </td>
  </tr>
</template>

<script>
import moment from 'moment'
import OrderCheck from "./OrderCheck";

export default {
  name: "OrderItem",
  props: {
    orderData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    moment,
    getCheck() {
      this.$modal.show(
        OrderCheck,
        { orderData: this.orderData, totalSum: this.$store.getters["orders/orderTotalPrice"](this.orderData) },
        { draggable: true, scrollable: true, height: "auto", width: 400 }
      )
    },
    toPay() {
      this.$store.dispatch('orders/toPayOrder', this.orderData)
        .then(() => {
          this.$notify({
            text: 'Заказ успешно оплачен!',
            type: 'success'
          })
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
    },
    cancelOrder() {
      this.$store.dispatch('orders/cancelOrder', this.orderData)
        .then(() => {
          this.$notify({
            text: 'Заказ успешно удалён!',
            type: 'success'
          })
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
    },
  }
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: opacity .2s ease-in-out, transform .2s ease-in-out;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-group {
  position: relative;
}

.slide-item {
  position: absolute;
}
</style>
