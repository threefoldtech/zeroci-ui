<template>
  <v-form v-model="repositories.valid">
    <v-text-field
      ref="usernameInput"
      label="Username"
      v-model="repositories.username"
      :rules="[(v) => (v ? true : 'Username is required.')]"
      prefix="@"
      @blur="validateUsername"
      :loading="usernameLoading"
      :error-messages="usernameError"
      :error="!!usernameError"
      :disabled="usernameLoading"
    />

    <!-- <v-combobox
      v-model="repositories.organizations"
      label="Organizations"
      multiple
      chips
      append-icon
      clearable
      :rules="[(v) => (v.length > 0 ? true : 'Organizations is required.')]"
    /> -->
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import debounce from "lodash/debounce.js";

@Component({
  name: "RepositoriesStep",
})
export default class RepositoriesStep extends Vue {
  get repositories() {
    return this.$store.state.ZeroConfigStore.repositories;
  }

  usernameLoading = false;
  usernameError = "";
  validateUsername() {
    this.usernameError = "";
    const inp = this.$refs.usernameInput as unknown as { hasError: boolean };
    if (inp.hasError) return;

    this.usernameLoading = true;

    this.$axios
      .get(`/repos_config?username=${this.repositories.username}`)
      .then(console.log)
      .catch(console.log)
      .finally(() => (this.usernameLoading = false));
    // if (this.usernameInp.hasError) {

    // }
    // if (this.usernameInp?.hasError)
    // const { username } = this.repositories;
  }
}
</script>
