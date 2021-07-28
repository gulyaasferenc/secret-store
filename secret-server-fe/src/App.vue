<template>
  <div>
    <div class="header">Secret Handler</div>
    <div class="menubuttons">
      <button
        class="menubutton"
        :class="[view === 'create' ? 'selected-menubutton' : '']"
        @click="setViewToCreate()"
      >
        Create New Secret
      </button>
      <button
        class="menubutton"
        :class="[view === 'get' ? 'selected-menubutton' : '']"
        @click="setViewToGet()"
      >
        Get Secret By Hash
      </button>
    </div>
      <CreateSecret v-if="view === 'create'" />
      <GetSecret v-if="view === 'get'" />
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
    const view = ref("create");

    const setViewToGet = () => {
      view.value = "get";
    };

    const setViewToCreate = () => {
      view.value = "create";
    };

    return {
      view,
      setViewToGet,
      setViewToCreate,
    };
  },
};
</script>

<style lang="scss">
@import './app.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  transition: 0.2s;
  background: $other;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  margin: 0px;
  padding: 0;
}

.header {
  position: fixed;
  left: 0;
  top: 0;
  background: $dark;
  height: 50px;
  width: 100vw;
  text-align: left;
  color: $light;
  font-size: large;
  display: flex;
  align-items: center;
  padding-left: 2rem;
}

body {
  margin: 0px;
}

.menubuttons {
  margin: auto;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-evenly;
  width: 40%;
}

.menubutton {
  border: none;
  border-bottom: 1px solid $otherdark;
  margin-top: 75px;
  padding: 5px 20px 5px 20px;
  cursor: pointer;
  background: transparent;
  transition: 0.2s;
  font-size: 16px;
}

.selected-menubutton {
  border-bottom: 1px solid transparent;
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.75);
  transform: scale(1.2);
}

.menubutton:hover {
  border-bottom: 1px solid transparent;
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.75);
  transform: scale(1.2);
}

input {
  padding: 10px 20px 10px 20px;
  width: 70%;
  margin-bottom: 25px;
  border-radius: 7px;
  border: none;
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.75);
}

.normalbutton {
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px 20px 5px 20px;
  cursor: pointer;
  background: $light;
  transition: 0.2s;
}

.normalbutton:hover {
  border: 1px solid transparent;
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.75);
}

.container {
  margin: auto;
  height: 70vh;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.75);
  border-radius: 7px;
  background: $otherdark;
  color: $light;
}

.form {
  margin: 3rem 0 1rem 0;
}

textarea {
  border: none;
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.75);
  border-radius: 7px;
  padding: 10px;
  margin-bottom: 1rem;
  width: 80%;
}

@media screen and (max-width: 820px) {
  .menubuttons {
    margin: auto;
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-evenly;
    width: 90%;
  }

  .menubutton {
    padding: 5px 7px 5px 7px;
    cursor: pointer;
  }
}

</style>
