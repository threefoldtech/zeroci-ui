import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export interface ZeroConfigState {
  versionCtrlSystem: {
    domain: string;
    host: string;
    token: string;
    valid: boolean;
  };
}

export default new Vuex.Store<ZeroConfigState>({
  state: {
    versionCtrlSystem: {
      domain: "",
      host: "",
      token: "",
      valid: false,
    },
  },
});
