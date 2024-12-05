<template>
  <div class="container content-seection">
    <div>
      <div class="advantages_main">
        <div class="row">
          <div class="adv_block_box col-xs-12 col-lg-3 col-md-4">
            <div class="adv_block_box2">
              <div class="adv_block">
                <p class="adv_block_text">5 лет на рынке электронных компонентов</p>
              </div>
            </div>
          </div>
          <div class="adv_block_box col-xs-12 col-lg-2 col-md-4">
            <div class="adv_block_box2">
              <div class="adv_block">
                <p class="adv_block_text">Более 100 000 товаров от 1000 производителей</p>
              </div>
            </div>
          </div>
          <div class="adv_block_box col-xs-12 col-lg-2 col-md-4">
            <div class="adv_block_box2">
              <div class="adv_block">
                <p class="adv_block_text">Наличие на складе в Москве</p>
              </div>
            </div>
          </div>
          <div class="adv_block_box col-xs-12 col-lg-2 col-md-4">
            <div class="adv_block_box2">
              <div class="adv_block">
                <p class="adv_block_text">Работаем с физическими и юридическими лицами</p>
              </div>
            </div>
          </div>
          <div class="adv_block_box col-xs-12 col-lg-2 col-md-4">
            <div class="adv_block_box2">
              <div class="adv_block">
                <p class="adv_block_text">Нет минимальной суммы заказа</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>

      <div class="orangtit">Категории товара</div>
        <AppCategories />
        <div class="clearfix"></div>

      <h2>Электронные компоненты оптом и в розницу</h2>
      <p>
        Интернет-магазин CHIP уже более 5 лет осуществляет торговлю электронными компонентами. Мы имеем многолетние налаженные контакты с большим числом производителей радиодеталей и крупных дистрибьюторов в Европе и во всем мире. В нашем Интернет-магазине могут удовлетворить свой спрос как простые радиолюбители, так и крупные НИИ и КБ, заводы по производству электроники, промышленные предприятия, торговые компании. Товар может быть поставлен как оптовой партией, так и розничным количеством.
      </p>
      <p>
        Мы предлагаем огромный ассортимент радиоэлектронных компонентов, включая микросхемы, диоды, резисторы, конденсаторы, предохранители, дроссели, разъемы, переключатели, реле, блоки питания, батареи и аккумуляторы, вентиляторы, инструменты, модули автоматики и сопутствующие аксессуары. В базе магазина содержится более 100 тысяч наименований электронных компонентов с техническим описанием. Усовершенствованная система поиска облегчает навигацию по сайту и нахождение требуемых компонентов. В случае затруднений, мы поможем Вам найти нужные компоненты в минимально возможные сроки и по оптимальной цене, поможем подобрать необходимые детали по заданным параметрам или аналоги, в особых случаях проведем переговоры с производителями для изменения параметров компонентов либо создания их по спецзаказу, и доставим их в любую точку Российской федерации и Таможенного союза.
      </p>
      <br>
    </div>
    <div class="clearfix"></div>

  </div>
</template>

<script>
import AppCategories from "./AppCategories";

export default {
  name: "AppMain",
  components: {
    AppCategories
  },
}
</script>

<style>

</style>
