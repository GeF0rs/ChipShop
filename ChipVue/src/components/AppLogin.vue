<template>
  <form @submit.prevent="handleLogin">
    <div class="container content-seection">
      <h2 class="g-font-size-25 ml-3 mt-2">Авторизация</h2>
      <div class="clearfix"></div>
      <div>
        <hr />
        <div class="form-group">
          <label class="control-label col-md-2" for="Email">E-Mail</label>
          <div class="col-md-10">
            <input
              class="form-control text-box single-line"
              id="Email"
              name="Email"
              type="text"
              v-model.trim="$v.loginUser.email.$model">
            <div v-if="$v.loginUser.email.$dirty">
              <span class="field-validation-valid text-danger" v-if="!$v.loginUser.email.email">Неверный формат Email</span>
              <span class="field-validation-valid text-danger" v-if="!$v.loginUser.email.required">Заполните поле - E-Mail</span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-md-2" for="Pass">Пароль</label>
          <div class="col-md-10">
            <input
              class="form-control text-box single-line password"
              id="Pass"
              name="Pass"
              type="password"
              v-model="$v.loginUser.password.$model">
            <div v-if="$v.loginUser.password.$dirty">
              <span class="field-validation-valid text-danger" v-if="!$v.loginUser.password.required">Password is required.</span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-md-offset-2 col-md-10">
            <input type="submit" value="Войти" class="btn btn-default" />
          </div>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
        <br>
      </div>
      <div class="clearfix"></div>
    </div>
  </form>
</template>

<script>

import {required, email} from 'vuelidate/lib/validators'

export default {
  name: "AppLogin",
  data() {
    return {
      loginUser: {
        email: null,
        password: null
      },
      message: ''
    };
  },
  computed: {

  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  validations: {
    loginUser: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    handleLogin() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch('auth/login', this.loginUser).then(
          () => {
            this.$router.push('/');
          },
          error => {
            this.message = error.response.data.errorText;
          }
        );
      }
    }
  }
}
</script>

<style scoped>

</style>
