<template>
  <div>
    <button @click="setViewToCreate()" >Create New Secret</button>
    <button @click="setViewToGet()">Get Secret By Hash</button>
    <CreateSecret v-if="view === 'create'" />
    <GetSecret  v-if="view === 'get'" />
  </div>
</template>

<script>
import { ref } from "vue";
import CreateSecret from "./components/CreateSecret.vue";
import GetSecret from "./components/GetSecret.vue";

export default {
  name: "App",
  components: {
    CreateSecret,
    GetSecret,
  },
  setup() {
    const view = ref("get");

    const setViewToGet = () => {
      console.log('pushed')
      view.value = 'get'
    };

    const setViewToCreate = () => {
      view.value = 'create'
    };

    return {
      view,
      setViewToGet,
      setViewToCreate
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
