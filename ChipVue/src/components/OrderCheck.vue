<template>
  <div>
    <p style="font-size:20px;font-weight: bold">
      Чек об оплате
    </p>

    Платёж № {{ orderData.orderId }}
    <br>
    принят {{ moment(orderData.paymentDate).locale("ru").format('lll') }}
    <br>
    <br>
    Приём платежа в пользу
    <br>
    ООО "Chip"
    <br>
    р/с 12345678910111213141
    <br>
    в ОАО БАНК ВТБ В Г.МОСКВА
    <br>
    БИК 040407777
    <br>
    ИНН 5504122776
    <br>
    Средство оплаты: Банковская карта
    <br>
    Сумма к зачислению: {{totalSum}} руб.
  </div>
</template>

<script>

import moment from "moment";

export default {
  name: "OrderCheck",
  props: {
    orderData: {
      type: Object,
      default() {
        return {}
      }
    },
    totalSum: {
      default() {
        return ''
      }
    }
  },
  methods: {
    moment
  }
}
</script>

<style scoped>

</style>
