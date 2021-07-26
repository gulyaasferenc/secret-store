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
    <div v-if="result">Your text is: <br />{{ result }}</div>
    <ErrorNotification
      @closeMe="closeErrorNotification()"
      v-if="errorMsg"
      :msg="errorMsg"
      :duration="4"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import ErrorNotification from "./ErrorNotification.vue";
export default {
  name: "GetSecret",
  components: {
    ErrorNotification,
  },
  setup() {
    const hash = ref(null);
    const result = ref(null);
    const errorMsg = ref(null);

    const getHash = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.VUE_APP_BASE_API_URL}/api/secret/${hash.value}`
        );
        result.value = data.secretText;
      } catch (error) {
        errorMsg.value = error.response.data.message;
      }
    };

    const closeErrorNotification = () => {
      errorMsg.value = null;
    };

    return {
      hash,
      getHash,
      result,
      errorMsg,
      closeErrorNotification,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
