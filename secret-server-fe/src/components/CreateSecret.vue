<template>
  <div class="container">
    <form class="form">
      <div>
        <textarea
          cols="80"
          rows="10"
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
      <div class="secrettext">Your secret is created: {{ creationResult }}</div>
      <button @click="clearResult()" type="button" class="normalbutton">
        Clear
      </button>
    </div>
    <ErrorNotification
      :duration="4"
      @closeMe="closeErrorNotification()"
      v-if="errorMsg"
      :msg="errorMsg"
    />
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import ErrorNotification from "./ErrorNotification.vue";

export default {
  name: "CreateSecret",
  components: {
    ErrorNotification,
  },
  setup() {
    const secretText = ref("");
    const expireAfterViews = ref(null);
    const expireAfter = ref(null);
    const creationResult = ref(null);
    const errorMsg = ref(null);
    const createSecret = async () => {
      try {
        const { data: result } = await axios.post(
          `${process.env.VUE_APP_BASE_API_URL}/api/secret`,
          {
            secret: secretText.value,
            expireAfterViews: Number(expireAfterViews.value),
            expireAfter: Number(expireAfter.value),
          }
        );
        creationResult.value = result.hash;
      } catch (error) {
        console.log(error);
        errorMsg.value = error.response.data.message;
      }
    };

    const clearResult = () => {
      creationResult.value = null;
      expireAfterViews.value = null;
      expireAfter.value = null;
    };

    const closeErrorNotification = () => {
      errorMsg.value = null;
    };

    return {
      createSecret,
      clearResult,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.numberinput {
  width: 12rem;
  margin: 0 7px 2rem 7px;
}

.secrettext {
  margin-bottom: 2rem;
  line-break: anywhere;
}
</style>
