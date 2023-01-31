import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    versionCtrlSystem: {
      domain: "",
      host: "",
      token: "",
      valid: false,
    },
    repositories: {
      username: "",
      organizations: <string[]>[],
      repos: <string[]>[],
      valid: false,
    },
  },
});
