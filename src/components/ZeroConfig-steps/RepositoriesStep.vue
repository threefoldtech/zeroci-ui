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

    <v-combobox
      v-model="repositories.organizations"
      label="Organizations"
      multiple
      chips
      append-icon
      clearable
      :disabled="!users.has(repositories.username) || loadingOrgs.length > 0"
      @blur="validateOrgs"
      :error="repositories.organizations.some((org) => errorOrgs.has(org))"
      :items="Array.from(organizations.keys())"
      @change="$refs.reposInput?.validate()"
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          :color="
            organizations.has(data.item)
              ? 'success'
              : errorOrgs.has(data.item)
              ? 'error'
              : undefined
          "
          :close="loadingOrgs.length === 0"
          @click:close="
            repositories.organizations.splice(
              repositories.organizations.indexOf(data.item),
              1
            )
          "
        >
          {{ data.item }}
          <v-progress-circular
            class="ml-2"
            indeterminate
            size="18"
            width="2"
            v-if="loadingOrgs.includes(data.item)"
          />
        </v-chip>
      </template>
    </v-combobox>

    <v-combobox
      v-model="repositories.repos"
      ref="reposInput"
      label="Repositories"
      multiple
      chips
      append-icon
      :items="getSelectableRepos()"
      :disabled="!users.has(repositories.username) || loadingOrgs.length > 0"
      :rules="[validateRepos]"
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          :color="
            getSelectableRepos().includes(data.item) ? undefined : 'error'
          "
          close
          @click:close="
            repositories.repos.splice(repositories.repos.indexOf(data.item), 1)
          "
        >
          {{ data.item }}
        </v-chip>
      </template>
    </v-combobox>

    <v-btn
      color="primary"
      :disabled="!repositories.valid || loading"
      :loading="loading"
      @click="next"
    >
      Next
    </v-btn>
    <v-btn color="error" text class="ml-2" @click="$emit('update:step', 1)">
      Back
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { AxiosError } from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "RepositoriesStep",
})
export default class RepositoriesStep extends Vue {
  get repositories() {
    return this.$store.state.ZeroConfigStore.repositories;
  }

  usernameLoading = false;
  usernameError = "";
  users = new Map<string, string[]>();
  validateUsername() {
    this.usernameError = "";
    const inp = this.$refs.usernameInput as unknown as { hasError: boolean };
    if (inp.hasError || this.users.has(this.repositories.username)) return;

    this.usernameLoading = true;

    this.$axios
      .get(`/repos_config?username=${this.repositories.username}`)
      .then((res) => {
        this.users.set(this.repositories.username, res.data);
      })
      .catch((res: AxiosError) => {
        const err = res.response?.data;
        this.usernameError =
          typeof err === "string" ? err : "Failed to fetch user";
      })
      .finally(() => (this.usernameLoading = false));
  }

  organizations = new Map<string, string[]>();
  loadingOrgs: string[] = [];
  errorOrgs = new Set<string>();
  validateOrgs() {
    const orgs: string[] = this.repositories.organizations;
    this.loadingOrgs = orgs.filter((org) => !this.organizations.has(org));

    Promise.all(
      this.loadingOrgs.map((org) =>
        Promise.all([
          Promise.resolve(org),
          this.$axios.get(`/repos_config?org_name=${org}`).catch(() => null),
        ]).catch(() => null)
      )
    )
      // .then((orgs) => orgs.filter((org) => org && org[1]))
      .then((orgs) => {
        orgs.forEach((org) => {
          if (!org) return;
          if (org[1] === null) {
            this.errorOrgs.add(org[0]);
            return;
          }
          const [name, { data }] = org as unknown as [
            string,
            { data: string[] }
          ];
          this.organizations.set(name, data);
        });
      })
      .catch((err) => {
        console.log("error", err);
      })
      .finally(() => {
        this.loadingOrgs = [];
      });
  }

  getSelectableRepos(): string[] {
    return [
      this.users.get(this.repositories.username),
      this.repositories.organizations
        .map((org: string) => {
          return this.organizations.get(org);
        })
        .flat(),
    ].flat();
  }

  validateRepos(repos: string[]) {
    const selectableRepos = this.getSelectableRepos();
    for (const repo of repos) {
      if (!selectableRepos.includes(repo)) {
        return "A repository or more is no longer valid due to removing it's organization";
      }
    }
    return true;
  }

  loading = false;
  next() {
    this.loading = true;
    this.$axios
      .post("/repos_config", { repos: this.repositories.repos })
      .then(() => this.$emit("update:step", 3))
      .catch((err) => {
        console.log("Error", err);
      })
      .finally(() => (this.loading = false));
  }
}
</script>
