<template>
  <b-modal id="modal-user" @ok="$emit('ok', user)" @hidden="$emit('hidden')">
    <template v-slot:modal-title>
      <template v-if="newUser">
        Add user
      </template>
      <template v-else>
        Edit user
      </template>
    </template>
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
  props: ["user"],
  computed: {
    newUser() {
      return this.user ? false : true;
    }
  }
};
</script>
