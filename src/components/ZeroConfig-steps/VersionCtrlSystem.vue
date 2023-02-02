<template>
  <v-form v-model="vcs.valid">
    <v-text-field
      label="Domain"
      v-model="vcs.domain"
      :rules="[isDomain('Please provide a valid domain.')]"
      :disabled="loading"
    />
    <v-text-field
      label="Version Control System Host"
      v-model="vcs.host"
      :rules="[isDomain('Please provide a valid Version Control System Host.')]"
      :disabled="loading"
    />
    <v-text-field
      type="password"
      no-resize
      label="Version Control System Token"
      v-model="vcs.token"
      :rules="[(v) => (v ? true : 'Version Control System Token is required.')]"
      :disabled="loading"
    />
    <v-alert color="error" v-if="errorMessage">
      {{ errorMessage }}
    </v-alert>
    <v-btn
      :loading="loading"
      @click="next"
      color="primary"
      :disabled="!vcs.valid || loading"
    >
      Next
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { isDomain } from "@/utils/validators";
import type { AxiosError } from "axios";

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

  loading = false;
  errorMessage = "";
  next() {
    const { domain, host, token } = this.vcs;
    this.errorMessage = "";
    this.loading = true;
    this.$axios
      .post("/vcs_config", {
        domain,
        vcs_host: host,
        vcs_token: token,
      })
      .then(() => {
        this.$emit("update:step", 2);
      })
      .catch((err: AxiosError) => {
        this.errorMessage =
          (err.response?.data as string) ??
          "Failed to configure your Version Control System.";
      })
      .finally(() => (this.loading = false));
  }
}
</script>
