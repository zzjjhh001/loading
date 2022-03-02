<template>
  <transition>
    <div
      v-show="visible"
      class="el-loading-mask">
      <div class="el-loading-spinner">
        <p class="el-loading-text">加载中</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        visible: false
      };
    }
  };
</script>
<style lang="scss" scoped>
.el-loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.8);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .el-loading-spinner {
    top: 50%;
    margin-top: -20px;
    width: 100%;
    text-align: center;
    position: absolute;
    height: 40px;
    .el-loading-text {
      color: #409EFF;
      margin: 3px 0;
      font-size: 14px;
    }
  }
}
</style>
