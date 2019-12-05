<template>
  <b-table bordered small head-variant="dark" :items="items" :fields="fields">
    <template v-slot:cell(administrator)="data">
      <template v-if="data.value">
        <Checkmark20 />
      </template>
    </template>
    <template v-slot:cell(operator)="data">
      <template v-if="data.value">
        <Checkmark20 />
      </template>
    </template>
    <template v-slot:cell(readonly)="data">
      <template v-if="data.value">
        <Checkmark20 />
      </template>
    </template>
    <template v-slot:cell(callback)="data">
      <template v-if="data.value">
        <Checkmark20 />
      </template>
    </template>
  </b-table>
</template>

<script>
import Checkmark20 from "@carbon/icons-vue/es/checkmark/20";

export default {
  components: {
    Checkmark20
  },
  data() {
    return {
      items: [
        {
          description: "Configure components managed by this service",
          administrator: true,
          operator: false,
          readonly: false,
          callback: false
        },
        {
          description: "Configure manager resources",
          administrator: true,
          operator: false,
          readonly: false,
          callback: false
        },
        {
          description: "Update password for current user account",
          administrator: true,
          operator: true,
          readonly: true,
          callback: false
        },
        {
          description: "Update password for current user account",
          administrator: true,
          operator: true,
          readonly: true,
          callback: false
        },
        {
          description: "Configure users and their accounts",
          administrator: true,
          operator: false,
          readonly: false,
          callback: false
        },
        {
          description: "Log in to the service and read resources",
          administrator: true,
          operator: true,
          readonly: true,
          callback: false
        },
        {
          description: "IPMI access point",
          administrator: true,
          operator: true,
          readonly: true,
          callback: true
        },
        {
          description: "Redfish access point",
          administrator: true,
          operator: true,
          readonly: true,
          callback: false
        },
        {
          description: "SSH access point",
          administrator: true,
          operator: true,
          readonly: true,
          callback: false
        },
        {
          description: "WebUI access point",
          administrator: true,
          operator: true,
          readonly: true,
          callback: false
        }
      ],
      fields: [
        { key: "description", label: "" },
        { key: "administrator", label: "Administrator", class: "text-center" },
        { key: "operator", label: "Operator", class: "text-center" },
        { key: "readonly", label: "ReadOnly", class: "text-center" },
        { key: "callback", label: "Callback", class: "text-center" }
      ]
    };
  }
};
</script>
