<template>
  <div class="container">
    <form class="form">
      <div>
        <input placeholder="Secret here" v-model="hash" />
      </div>
      <button @click="getHash()" type="button" class="normalbutton">
        Get Secret
      </button>
    </form>
    <div v-if="result.data">
      <b>Your text is:</b>
      <div class="result">{{ result.data?.secretText }}</div>
    </div>
    <Notification
      @closeMe="closeNotifications()"
      v-if="errorMsg.message && !showInfoNotification"
      :msg="errorMsg.message"
      :duration="4"
      type="error"
    />
    <Notification
      @closeMe="closeNotifications()"
      v-if="showInfoNotification && !errorMsg.message"
      type="info"
    >
      <div v-if="result.data?.expiresAt">
        <b>This secret will expire: </b>
        {{ moment(result.data?.expiresAt).fromNow() }}
      </div>
      <div v-else>This secret has no expiration date</div>
      <hr />
      <div v-if="result.data?.remainingViews > 0">
        <b>This secret is reachable: </b>
        {{ result.data?.remainingViews }} more
        {{ result.data?.remainingViews > 1 ? "times" : "time" }}
      </div>
      <div v-else-if="result.data?.remainingViews === 0">
        This was the last time you could check this secret
      </div>
      <div v-else>Secret view number is not limited</div>
    </Notification>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import Notification from "./Notification.vue";
import useGetSecret from "../composables/useGetSecret";
import moment from "moment";

export default {
  name: "GetSecret",
  components: {
    Notification,
  },
  setup() {
    const hash = ref(null);
    const showInfoNotification = ref(false);

    const { getHash, result, errorMsg } = useGetSecret(hash);

    const closeNotifications = () => {
      errorMsg.message = null;
      showInfoNotification.value = false;
    };

    watch(result, (newValue) => {
      if (newValue.data) {
        showInfoNotification.value = true;
        errorMsg.message = null;
      }
    });

    watch(errorMsg, (newValue) => {
      if (newValue?.message) {
        showInfoNotification.value = false;
      }
    });

    return {
      hash,
      getHash,
      result,
      errorMsg,
      closeNotifications,
      moment,
      showInfoNotification,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../app.scss";

.result {
  padding: 50px;
  max-height: 30vh;
  width: 80%;
  margin: auto;
  overflow: auto;
  background: $dark;
  color: $light;
  border-radius: 7px;
  margin-top: 10px;
}

@media screen and (max-width: 820px) {
  .result {
    padding: 0px;
    width: 95%;
  }
}
</style>
