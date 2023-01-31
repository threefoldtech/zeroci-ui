<template>
  <v-form v-model="$.valid">
    <v-text-field label="Domain" focus v-model="$.domain" />
    <v-text-field label="Version Control System Host" v-model="$.host" />
    <v-text-field label="Version Control System Token" v-model="$.token" />
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "VersionCtrlSystem",
})
export default class VersionCtrlSystem extends Vue {
  get $() {
    return this.$store.state.ZeroConfigStore.versionCtrlSystem;
  }
}
</script>
