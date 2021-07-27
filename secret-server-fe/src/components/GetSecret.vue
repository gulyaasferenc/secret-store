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
    <div v-if="result">
      <b>Your text is:</b>
      <div class="result">{{ result.secretText }}</div>
    </div>
    <Notification
      @closeMe="closeNotifications()"
      v-if="errorMsg"
      :msg="errorMsg"
      :duration="4"
      type="error"
    />
    <Notification
      @closeMe="closeNotifications()"
      v-if="showInfoNotification"
      type="info"
    >
      <div v-if="result.expiresAt">
        <b>This secret will expire on: </b>
        {{ moment(result.expiresAt).fromNow() }}
      </div>
      <div v-else>This secret has no expiration date</div>
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
      errorMsg.value = null;
    };

    watch(result, (newValue) => {
      if (newValue) {
        console.log(result)
        showInfoNotification.value = true;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
