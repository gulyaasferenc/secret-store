<template>
  <div
    :class="[
      props.type === 'error' ? 'error-notification' : 'info-notification',
    ]"
  >
    <div class="close" @click="closeMe()">X</div>
    <slot>
      {{ props.msg }}
    </slot>
  </div>
</template>

<script>
import { onBeforeUnmount } from "vue";
export default {
  name: "ErrorNotification",
  props: {
    msg: String,
    duration: Number,
    type: {
      validator(value) {
        return ["error", "info"].includes(value);
      },
    },
  },

  setup(props, { emit }) {
    let timeOut;
    if (props.duration) {
      timeOut = setTimeout(() => {
        closeMe();
      }, props.duration * 1000);
    }

    const closeMe = () => {
      emit("closeMe");
    };

   onBeforeUnmount(() => {
     clearTimeout(timeOut)
   })

    return {
      props,
      closeMe,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../app.scss";
@mixin notification {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 200px;
  left: 50%;
  margin-left: -200px;
  width: 400px;
  min-height: 40px;
  padding: 12px 0 12px 0;
  border-radius: 10px;
  animation-duration: 1s;
  animation-name: slidein;
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.9);
}
.info-notification {
  @include notification;
  background: $light;
  color: $dark;
}

.error-notification {
  @include notification;
  background: rgba(255, 0, 0, 0.9);
  color: white;
}

.close {
  position: absolute;
  top: 4px;
  right: 8px;
  cursor: pointer;
  color: $dark;
  font-weight: bold;
  box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.9);
  z-index: 50;
}

@keyframes slidein {
  from {
    bottom: -100px;
  }
  to {
    bottom: 200px;
  }
}
</style>
