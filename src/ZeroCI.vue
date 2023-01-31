<template>
  <v-app>
    {{ $store.state }}
    <ZeroConfig />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ZeroConfig from "@/views/ZeroConfig.vue";

@Component({
  name: "ZeroCI",
  components: {
    ZeroConfig,
  },
})
export default class ZeroCI extends Vue {}
</script>
