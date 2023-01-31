<template>
  <v-form v-model="vcs.valid">
    <v-text-field
      label="Domain"
      v-model="vcs.domain"
      :rules="[isDomain('Please provide a valid domain.')]"
    />
    <v-text-field
      label="Version Control System Host"
      v-model="vcs.host"
      :rules="[isDomain('Please provide a valid Version Control System Host.')]"
    />
    <v-text-field
      type="password"
      no-resize
      label="Version Control System Token"
      v-model="vcs.token"
      :rules="[(v) => (v ? true : 'Version Control System Token is required.')]"
    />
    <v-btn @click="next" color="primary" :disabled="!vcs.valid"> Next </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { isDomain } from "@/utils/validators";

@Component({
  name: "VersionCtrlSystem",
  methods: {
    isDomain,
  },
})
export default class VersionCtrlSystem extends Vue {
  get vcs() {
    return this.$store.state.ZeroConfigStore.versionCtrlSystem;
  }

  next() {
    // const { domain, host, token } = this.vcs;
    // this.$axios
    //   .post("/vcs_config", {
    //     domain,
    //     vcs_host: host,
    //     vcs_token: token,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log("error", err);
    //   });
    this.$emit("update:step", 2);
  }
}
</script>
