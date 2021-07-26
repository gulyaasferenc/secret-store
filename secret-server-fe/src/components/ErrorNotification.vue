<template>
  <div class="notification">{{ props.msg }}</div>
</template>

<script>
export default {
  name: "ErrorNotification",
  props: {
    msg: String,
    duration: Number
  },
  setup(props, { emit }) {
      console.log(props)
    setTimeout(() => {
      emit("closeMe");
    }, props.duration * 1000);

    return {
      props,
    };
  },
};
</script>

<style scoped lang="scss">
.notification {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20px;
  right: 20px;
  width: 220px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 0, 0, 0.9);
  color: white;
  animation-duration: 1s;
  animation-name: slidein;
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.9);
}

@keyframes slidein {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0%);
  }
}
</style>
