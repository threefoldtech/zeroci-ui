import Vue, { VNode } from "vue";
import { AxiosInstance } from "axios";
import Store from "./store";

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $axios: AxiosInstance;
  }
}
