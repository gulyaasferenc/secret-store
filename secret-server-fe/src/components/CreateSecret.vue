<template>
  <div class="container">
    <form class="form">
      <div>
        <textarea
          placeholder="Your secret content"
          v-model="secretText"
        />
      </div>
      <div>
        <input
          min="0"
          step="1"
          pattern="\d*"
          class="numberinput"
          type="number"
          placeholder="Number of allowed views"
          v-model="expireAfterViews"
        />
        <input
          min="0"
          step="1"
          pattern="\d*"
          class="numberinput"
          type="number"
          placeholder="ttl (minutes)"
          v-model="expireAfter"
        />
      </div>
      <button @click="createSecret()" type="button" class="normalbutton">
        Create Secret
      </button>
    </form>
    <div class="createresult" v-if="creationResult">
      <b>Your secret is created:</b>
      <div class="secrettext">{{ creationResult }}</div>
    </div>
    <Notification
      :duration="4"
      @closeMe="closeErrorNotification()"
      v-if="errorMsg"
      :msg="errorMsg"
      type="error"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import Notification from "./Notification.vue";
import useCreateSecret from "../composables/useCreateSecret";

export default {
  name: "CreateSecret",
  components: {
    Notification,
  },
  setup() {
    const secretText = ref("");
    const expireAfterViews = ref(null);
    const expireAfter = ref(null);

    const { createSecret, creationResult, errorMsg } = useCreateSecret({
      secretText,
      expireAfterViews,
      expireAfter,
    });

    const closeErrorNotification = () => {
      errorMsg.value = null;
    };

    return {
      createSecret,
      secretText,
      expireAfterViews,
      expireAfter,
      creationResult,
      errorMsg,
      closeErrorNotification,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../app.scss';

.numberinput {
  width: 12rem;
  margin: 0 7px 2rem 7px;
}

.secrettext {
  margin-bottom: 2rem;
  line-break: anywhere;
  padding: 10px;
  max-height: 25vh;
  overflow: auto;
  background: $dark;
  width: 80%;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 7px;
  color: $light;
}

@media screen and (max-width: 820px) {
  .secrettext {
    max-height: 20vh;
    width: 95%;
    padding: 2px;
  }
}
</style>
