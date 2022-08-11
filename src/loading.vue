<template>
  <div
    v-show="visible"
    class="hdf-loading-mask"
    :style="{ backgroundColor: background || '' }"
    :class="[customClass]">
    <div class="hdf-loading-spinner">
      <img v-if="imgSrc" :src="imgSrc"
      class="hdf-loading-img" alt="loading图片">
      <p v-if="text" class="hdf-loading-text">{{ text }}</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgSrc: '',
        text: null,
        background: null,
        customClass: '',
        visible: false
      };
    },
    methods() {
      
    }
  };
</script>
