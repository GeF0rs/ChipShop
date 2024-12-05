<template>
  <form @submit.prevent="handleRegister">
    <div class="container content-seection">
      <h2 class="g-font-size-25 ml-3 mt-2">Регистрация</h2>
      <div class="clearfix"></div>
      <div>
        <hr />
        <div class="form-group">
          <label class="control-label col-md-2" for="Name">Имя*</label>
          <div class="col-md-10">
            <input
              class="form-control text-box single-line"
              id="Name"
              name="Name"
              type="text"
              v-model.trim="$v.registerUser.name.$model">
            <div v-if="$v.registerUser.name.$dirty">
              <span class="field-validation-valid text-danger" v-if="!$v.registerUser.name.required">Заполните поле - Имя</span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-md-2" for="Surname">Фамилия*</label>
          <div class="col-md-10">
            <input
              class="form-control text-box single-line"
              id="Surname"
              name="Surname"
              type="text"
              v-model.trim="$v.registerUser.surname.$model">
            <div v-if="$v.registerUser.surname.$dirty">
              <span class="field-validation-valid text-danger" v-if="!$v.registerUser.surname.required">Заполните поле - Фамилия</span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-md-2" for="Email">E-Mail*</label>
          <div class="col-md-10">
            <input
              class="form-control text-box single-line"
              id="Email"
              name="Email"
              type="text"
              v-model.trim="$v.registerUser.email.$model">
            <div v-if="$v.registerUser.email.$dirty">
              <span class="field-validation-valid text-danger" v-if="!$v.registerUser.email.email">Неверный формат Email</span>
              <span class="field-validation-valid text-danger" v-if="!$v.registerUser.email.required">Заполните поле - E-Mail</span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-md-2" for="Pass">Пароль*</label>
          <div class="col-md-10">
            <input
              class="form-control text-box single-line"
              id="Pass"
              name="Pass"
              type="password"
              v-model="$v.registerUser.password.$model">
            <div v-if="$v.registerUser.password.$dirty">
              <span class="field-validation-valid text-danger" v-if="!$v.registerUser.password.required">Заполните поле - Пароль</span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-md-2" for="PassConfirm">Подтверждение пароля*</label>
          <div class="col-md-10">
            <input
              class="form-control text-box single-line"
              id="PassConfirm"
              name="PassConfirm"
              type="password"
              v-model="$v.registerUser.passConfirm.$model">
            <div v-if="$v.registerUser.passConfirm.$dirty">
              <span class="field-validation-valid text-danger" v-if="!$v.registerUser.passConfirm.required">Заполните поле - Подтверждение пароля</span>
              <p><span class="field-validation-valid text-danger" v-if="!$v.registerUser.passConfirm.sameAsPassword">Пароли не совпадают</span></p>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="col-md-offset-2 col-md-10">
            <input type="submit" value="Регистрация" class="btn btn-default" />
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

import {required, email, sameAs} from 'vuelidate/lib/validators'

export default {
  name: "AppRegister",
  data() {
    return {
      registerUser: {
        name: null,
        surname: null,
        email: null,
        password: null,
        passConfirm: null
      },
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  validations: {
    registerUser: {
      name: {
        required
      },
      surname: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required
      },
      passConfirm: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    handleRegister() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch('auth/register', this.registerUser).then(
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
