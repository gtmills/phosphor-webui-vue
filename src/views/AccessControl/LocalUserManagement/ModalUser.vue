<template>
  <b-modal id="modal-user" ref="modal" @ok="onOk" @hidden="resetForm">
    <template v-slot:modal-title>
      <template v-if="newUser">
        Add user
      </template>
      <template v-else>
        Edit user
      </template>
    </template>
    <b-form
      novalidate
      ref="form"
      :validated="formWasValidated"
      @submit="handleSubmit"
    >
      <b-container>
        <b-row>
          <b-col>
            <b-form-group label="Account status" :state="null">
              <b-form-radio
                v-model="form.status"
                name="user-status"
                value="true"
              >
                Enabled
              </b-form-radio>
              <b-form-radio
                v-model="form.status"
                name="user-status"
                value="false"
              >
                Disabled
              </b-form-radio>
            </b-form-group>
            <b-form-group label="Username" :invalid-feedback="invalidUsername">
              <b-form-text id="username-help-block">
                Cannot start with a number
                <br />
                No special characters except underscore
              </b-form-text>
              <b-form-input
                type="text"
                required
                maxlength="16"
                aria-describedby="username-help-block"
                v-model="form.username"
                :disabled="!newUser && form.username === 'root'"
              />
            </b-form-group>
            <b-form-group label="Privilege">
              <b-form-select
                required
                v-model="form.privilege"
                :options="privilegeTypes"
              >
              </b-form-select>
              <b-form-invalid-feedback>
                Field required
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="User password">
              <b-form-text id="password-help-block" text-variant="black">
                <!-- TODO: Should be dynamic values -->
                Password must between 8 – 20 characters
              </b-form-text>
              <b-form-input
                type="password"
                required
                v-model="form.password"
                aria-describedby="password-help-block"
              />
            </b-form-group>
            <b-form-group label="Confirm user password">
              <b-form-input type="password" required v-model="form.password" />
              <b-form-invalid-feedback>
                Field required
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
    <template v-slot:modal-ok>
      <template v-if="newUser">
        Add user
      </template>
      <template v-else>
        Save
      </template>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      privilegeTypes: ['Administrator', 'Operator', 'ReadOnly', 'NoAccess'],
      formWasValidated: false
    };
  },
  computed: {
    newUser() {
      return this.user ? false : true;
    },
    form() {
      return {
        originalUsername: this.newUser ? null : this.user.username,
        status: this.newUser
          ? true
          : this.user.status === 'Enabled'
          ? true
          : false,
        username: this.newUser ? '' : this.user.username,
        privilege: this.newUser ? '' : this.user.privilege,
        password: ''
      };
    },
    invalidUsername() {
      const username = this.form.username;
      if (username.length === 0) {
        return 'Field required';
      }
      return '';
    }
  },
  methods: {
    handleSubmit() {
      const isFormValid = this.validateForm();
      if (!isFormValid) {
        this.formWasValidated = true;
        return;
      }
      this.$emit('ok', { isNewUser: this.newUser, userData: this.form });
      // manually close modal
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    resetForm() {
      this.formWasValidated = false;
      this.form.username = '';
      this.form.privilege = '';
      this.form.password = '';
    },
    validateForm() {
      if (this.form.username && this.form.privilege && this.form.password) {
        return true;
      }
      return false;
    },
    onOk(bvModalEvt) {
      // prevent modal close
      bvModalEvt.preventDefault();
      this.handleSubmit();
    }
  }
};
</script>
