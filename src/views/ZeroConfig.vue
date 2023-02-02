<template>
  <v-container>
    <v-card class="mt-15 pt-15 px-4 pb-4">
      <h1 class="text-center display-3 mb-15">ZeroCI Configuration</h1>

      <v-stepper vertical v-model="step">
        <template v-for="(s, i) in steps">
          <v-stepper-step
            :key="s.namespace"
            :step="i + 1"
            :complete="zcs[s.namespace].valid"
          >
            {{ s.name }}
          </v-stepper-step>
          <v-stepper-content :key="s.namespace + 'content'" :step="i + 1">
            <component :is="s.cmp" :step.sync="step" />
          </v-stepper-content>
        </template>
      </v-stepper>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VersionCtrlSystem from "@/components/ZeroConfig-steps/VersionCtrlSystem.vue";
import RepositoriesStep from "@/components/ZeroConfig-steps/RepositoriesStep.vue";
import TelegramStep from "@/components/ZeroConfig-steps/TelegramStep.vue";

@Component({
  name: "ZeroConfig",
})
export default class ZeroConfig extends Vue {
  get zcs() {
    return this.$store.state.ZeroConfigStore;
  }

  step = 1;

  steps = [
    {
      namespace: "versionCtrlSystem",
      name: "Version Control System",
      cmp: VersionCtrlSystem,
    },
    {
      namespace: "repositories",
      name: "Repositories",
      cmp: RepositoriesStep,
    },
    {
      namespace: "telegram",
      name: "Telegram",
      cmp: TelegramStep,
    },
  ];
}
</script>
