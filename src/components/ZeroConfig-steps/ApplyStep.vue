<template>
  <div>
    <v-btn
      color="primary"
      :loading="loading"
      :disabled="loading"
      @click="apply"
    >
      Apply
    </v-btn>
    <v-btn
      @click="$emit('update:step', 3)"
      :disabled="loading"
      color="error"
      text
      class="ml-2"
    >
      Back
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ApplyStep",
})
export default class ApplyStep extends Vue {
  loading = false;

  apply() {
    this.loading = true;
    this.$axios("/apply_config")
      .then(console.log)
      .catch(console.error)
      .finally(() => (this.loading = false));
  }
}
</script>
