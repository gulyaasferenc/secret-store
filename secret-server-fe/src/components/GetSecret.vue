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
      <div class="result">{{ result }}</div>
    </div>
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
import ErrorNotification from "./ErrorNotification.vue";
import useGetSecret from "../composables/useGetSecret";

export default {
  name: "GetSecret",
  components: {
    ErrorNotification,
  },
  setup() {
    const hash = ref(null);

    const { getHash, result, errorMsg } = useGetSecret(hash);

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
$dark: #293B5F;
$otherdark: #47597E;
$light: #DBE6FD;
$other: #B2AB8C;

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
