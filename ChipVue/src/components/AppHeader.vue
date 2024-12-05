<template>
  <header>
    <div class="header-section">
      <div class="container">
        <div class="row br1">
          <div class="col-lg-3">
            <div class="row">
              <a title="Интернет-магазин электронных компонентов и радиодеталей CHIP.RU">
                <div class="elm logo">
										<span class="value">
											<span class="blue">CHIP</span><span class="orange">.ru</span>
										</span>
                </div>
                <div class="elm label">
                  <span class="value">Интернет-магазин электронных компонентов</span>
                </div>
              </a>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="row">
              <nav class="top-nav-container">
                <ul class="nav-list-1-lvl">
                  <li class="nav-1-lvl">
                    <router-link :to="{name: 'main'}" active-class="active">
                        <span>
													Главная
												</span>
                    </router-link>
                  </li>
                  <li class="nav-1-lvl ">
                    <router-link :to="{name: 'delivery'}" active-class="active">
                        <span>
													Доставка
												</span>
                    </router-link>
                  </li>
                  <li class="nav-1-lvl ">
                    <router-link :to="{name: 'payments'}" active-class="active">
                        <span>
													Оплата
												</span>
                    </router-link>
                  </li>
                  <li class="nav-1-lvl ">
                    <router-link :to="{name: 'contacts'}" active-class="active">
                        <span>
													Контакты
												</span>
                    </router-link>
                  </li>
                  <li class="nav-1-lvl">
                    <router-link :to="{name: 'about'}" active-class="active">
                        <span>
													О нас
												</span>
                    </router-link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div class="col-lg-1">
            <div class="row">
              <router-link :to="{name: 'cart'}" id="sticky_cart1">
									<span class="icon">
										<div id="widget">
											<span class="counter">{{ this.$store.state.cart.all.length }}</span>
										</div>
										<i class="fa fa-shopping-cart  g-color-blue1 g-font-size-38"></i>
									</span>
              </router-link>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col-lg-3">
            <div class="row">
              <router-link :to="{name: 'shop'}" class="link_catalog col-11">
                Каталог товаров
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row">
              <div class="elm search_area">
                <div class="searchtitle">

                  <div class="input-group">
                    <input
                      type="text"
                      v-model.trim="filter.inputSearch"
                      class = "form-control"
                      placeholder="Введите название искомого элемента" />
                    <span class="input-group-btn">
										  <button class="btn btn-default btn-primary" @click="searchStart"><i class="fa fa-search"></i>  Найти</button>
										</span>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3">
            <div v-if="!currentUser">
              <i class="fa fa-user-circle-o  g-color-blue1 g-font-size-30"></i>
              <router-link :to="{name: 'login'}">
                Войти
              </router-link> |
              <router-link :to="{name: 'register'}">
                Регистрация
              </router-link>
            </div>
            <div v-if="currentUser">
              <i class="fa fa-user-circle-o  g-color-blue1 g-font-size-30"></i>
              <span>Привет, {{ currentUser.displayName }}</span> |
              <router-link :to="{name: 'orders'}">
                Заказы
              </router-link> |
              <a href @click.prevent="logOut">Выйти</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
    import ProductsFilters from "./ProductsFilters";

    export default {
      name: "AppHeader",

      data() {
        return {
          filter: {
            inputSearch: ''
          },
        };
      },
      computed: {
        currentUser() {
          return this.$store.state.auth.user;
        }
      },
      methods: {
        searchStart() {
          this.$router.push({ name: 'shop', query: { searchStr: this.filter.inputSearch } })
        },
        logOut() {
          this.$store.dispatch('auth/logout');
          this.$router.push('/');
        }
      }
    }
</script>

<style scoped>
nav a:hover {
  color: #fff;
  background-color: #ff7e00;
}
nav a.router-link-active,
nav a.router-link-exact-active {
  color: #ff7e00;
}
</style>
