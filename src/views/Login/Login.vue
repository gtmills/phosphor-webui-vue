<template>
  <b-container class="login-container" fluid>
    <b-row class="login-row" align-v="center">
      <b-col class="login-branding mt-5 mb-5" md="6">
        <div class="login-branding__container">
          <img
            class="logo"
            width="200px"
            src="@/assets/images/openbmc-logo.svg"
            alt=""
          />
          <h1>OpenBMC</h1>
        </div>
      </b-col>

      <b-col class="login-form" md="6">
        <b-form @submit.prevent="login" novalidate>
          <b-alert
            class="login-error"
            v-if="errorMsg.title"
            show
            variant="danger"
          >
            <h2>{{ errorMsg.title }}</h2>
            <p v-if="errorMsg.action">{{ errorMsg.action }}</p>
          </b-alert>
          <b-form-group
            id="username-group"
            label="Username"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="userInfo.username"
              type="text"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="password-group"
            label="Password"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="userInfo.password"
              type="password"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-button
            type="submit"
            :disabled="disableSubmitButton"
            variant="primary"
            >Login</b-button
          >
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      errorMsg: {
        title: null,
        action: null
      },
      userInfo: {
        username: null,
        password: null
      },
      disableSubmitButton: false,
      submitButtonText: 'Login'
    };
  },
  methods: {
    validateForm: function() {
      this.errorMsg.title = null;
      this.errorMsg.action = null;

      if (!this.userInfo.username || !this.userInfo.password) {
        this.errorMsg.title = 'Username and password required.';
      }

      if (!this.errorMsg.title) {
        return true;
      }

      return false;
    },
    login: function() {
      const isValidForm = this.validateForm();
      if (isValidForm) {
        const username = this.userInfo.username;
        const password = this.userInfo.password;
        this.disableSubmitButton = true;
        this.$store
          .dispatch('authentication/login', [username, password])
          .then(() => {
            this.$router.push('/');
          })
          .catch(error => {
            this.errorMsg.title = 'Invalid username or password.';
            this.errorMsg.action = 'Please try again.';
            console.log(error);
          })
          .finally(() => {
            this.disableSubmitButton = false;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';

.login-container {
  @include media-breakpoint-up(md) {
    background: linear-gradient(
      to right,
      var(--light) 50%,
      var(--secondary-light) 50%
    );
  }
}

.login-row {
  @include media-breakpoint-up(md) {
    min-height: 100vh;
  }
}

.login-branding__container {
  @include media-breakpoint-up(md) {
    float: right;
    margin-right: 4rem;
  }
}

.login-form form {
  max-width: 360px;
  margin-right: auto;
  margin-left: auto;

  @include media-breakpoint-up(md) {
    margin-left: 4rem;
  }
}

.login-error {
  h2 {
    font-size: 1rem;
    margin-bottom: 0;
  }

  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
}

.login-branding {
  text-align: center;
}
</style>
