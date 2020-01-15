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
    <b-form novalidate @submit="handleSubmit">
      <b-container>
        <b-row>
          <b-col>
            <b-form-group label="Account status">
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
            <b-form-group label="Username">
              <b-form-text id="username-help-block">
                Cannot start with a number
                <br />
                No special characters except underscore
              </b-form-text>
              <b-form-input
                type="text"
                aria-describedby="username-help-block"
                v-model="form.username"
                @input="$v.form.username.$touch()"
                :state="getValidationState('username')"
                :disabled="!newUser && form.username === 'root'"
              />
              <b-form-invalid-feedback role="alert">
                <template v-if="!$v.form.username.required">
                  Field required
                </template>
                <template v-else-if="!$v.form.username.maxLength">
                  Length must be between 1 – 16 characters
                </template>
                <template v-else-if="!$v.form.username.pattern">
                  Invalid format
                </template>
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Privilege">
              <b-form-select
                v-model="form.privilege"
                :options="privilegeTypes"
                :state="getValidationState('privilege')"
              >
              </b-form-select>
              <b-form-invalid-feedback role="alert">
                <template v-if="!$v.form.privilege.required">
                  Field required
                </template>
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
                @input="$v.form.password.$touch()"
                :state="getValidationState('password')"
              />
              <b-form-invalid-feedback role="alert">
                <template v-if="!$v.form.password.required">
                  Field required
                </template>
                <template
                  v-if="
                    !$v.form.password.minLength || !$v.form.password.maxLength
                  "
                >
                  Length must be between 8 – 20 characters
                </template>
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Confirm user password">
              <b-form-input
                type="password"
                v-model="form.passwordConfirmation"
                @input="$v.form.passwordConfirmation.$touch()"
                :state="getValidationState('passwordConfirmation')"
              />
              <b-form-invalid-feedback role="alert">
                <template v-if="!$v.form.passwordConfirmation.required">
                  Field required
                </template>
                <template
                  v-else-if="!$v.form.passwordConfirmation.sameAsPassword"
                >
                  Passwords do not match
                </template>
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
import {
  required,
  maxLength,
  minLength,
  sameAs,
  helpers
} from 'vuelidate/lib/validators';

export default {
  props: ['user'],
  data() {
    return {
      privilegeTypes: ['Administrator', 'Operator', 'ReadOnly', 'NoAccess'],
      form: {
        originalUsername: '',
        status: true,
        username: '',
        privilege: '',
        password: '',
        passwordConfirmation: ''
      }
    };
  },
  watch: {
    user: function(value) {
      if (value === null) return;
      this.form.originalUsername = value.username;
      this.form.username = value.username;
      this.form.status = value.status === 'Enabled' ? true : false;
      this.form.privilege = value.privilege;
    }
  },
  computed: {
    newUser() {
      return this.user ? false : true;
    }
  },
  validations: {
    form: {
      username: {
        required,
        maxLength: maxLength(16),
        pattern: helpers.regex('pattern', /^([a-zA-Z_][a-zA-Z0-9_]*)/)
      },
      privilege: {
        required
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(20)
      },
      passwordConfirmation: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      this.$emit('ok', { isNewUser: this.newUser, userData: this.form });
      // manually close modal
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    getValidationState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form.originalUsername = '';
      this.form.status = true;
      this.form.username = '';
      this.form.privilege = '';
      this.form.password = '';
      this.form.passwordConfirmation = '';
      this.$v.$reset();
    },
    onOk(bvModalEvt) {
      // prevent modal close
      bvModalEvt.preventDefault();
      this.handleSubmit();
    }
  }
};
</script>
