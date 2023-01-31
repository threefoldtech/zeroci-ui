<template>
  <v-container>
    <v-card class="mt-15 pt-15">
      <h1 class="text-center display-3 mb-15">ZeroCI Configuration</h1>

      <v-stepper vertical v-model="step">
        <v-stepper-step step="1"> Version Control System </v-stepper-step>
        <v-stepper-content step="1">
          <VersionCtrlSystem :domain.sync="domain" />
          <v-btn @click="step = 2" color="primary" disabled> Next </v-btn>
        </v-stepper-content>

        <v-stepper-step step="2"> Repositories </v-stepper-step>
        <v-stepper-content step="2">
          <v-btn @click="step = 3" color="primary" class="mr-4"> Next </v-btn>
          <v-btn @click="step = 1" color="error" text> Back </v-btn>
        </v-stepper-content>

        <v-stepper-step step="3"> Telegram </v-stepper-step>
        <v-stepper-content step="3">
          <v-btn @click="step = 4" color="primary" class="mr-4"> Next </v-btn>
          <v-btn @click="step = 2" color="error" text> Back </v-btn>
        </v-stepper-content>

        <v-stepper-step step="4"> Telegram </v-stepper-step>
        <v-stepper-content step="4">
          <v-btn @click="step = 3" color="error" text> Back </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VersionCtrlSystem from "@/components/ZeroConfig-steps/VersionCtrlSystem.vue";

@Component({
  name: "ZeroConfig",
  components: {
    VersionCtrlSystem,
  },
})
export default class ZeroConfig extends Vue {
  step = 1;
  domain = "";
}
</script>
