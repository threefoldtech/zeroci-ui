<template>
  <v-form v-model="telegram.valid">
    <v-text-field
      label="Bot Token"
      type="password"
      :rules="[(v) => (v ? true : 'Bot token is required.')]"
      v-model="telegram.token"
      :error-messages="
        error === 'token' ? 'Bot token is not valid.' : undefined
      "
      @input="
        () => {
          if (error === 'token') error = null;
        }
      "
    />

    <v-text-field
      ref="idInput"
      label="Telegram Group ID"
      prefix="@"
      :rules="[(v) => (v ? true : 'Telegram group id is required.')]"
      v-model="telegram.id"
      :error-messages="
        error === 'id' ? 'Telegram group was not found.' : undefined
      "
      @input="
        () => {
          if (error === 'id') error = null;
        }
      "
    />

    <v-btn
      :disabled="!telegram.valid || loading || error"
      @click="next"
      :loading="loading"
      color="primary"
    >
      Done
    </v-btn>
    <v-btn @click="$emit('update:step', 2)" color="error" text class="ml-2">
      Back
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { AxiosError } from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "TelegramStep",
})
export default class TelegramStep extends Vue {
  get telegram() {
    return this.$store.state.ZeroConfigStore.telegram;
  }

  loading = false;
  error: "id" | "token" | null = null;
  next() {
    const { id, token } = this.telegram;
    this.loading = true;
    this.$axios
      .post("/telegram_config", {
        chat_id: "@" + id,
        bot_token: token,
      })
      .then(() => {
        console.log(this.$store.state.ZeroConfigStore);
      })
      .catch((err: AxiosError) => {
        // this.error = err.response?.data ?? "";
        const error = (
          (err.response?.data as string) ?? ""
        ).toLocaleLowerCase();
        this.error = error.includes("token")
          ? "token"
          : error.includes("chat")
          ? "id"
          : null;
      })
      .finally(() => (this.loading = false));
  }
}
</script>
