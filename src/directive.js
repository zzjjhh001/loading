import Vue from 'vue';
import Loading from './loading.vue';
import { addClass, getStyle } from './util.js';
const Mask = Vue.extend(Loading);

const loadingDirective = {};
loadingDirective.install = Vue => {
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      // v-loading的值为true
      Vue.nextTick(() => {
        el.originalPosition = getStyle(el, 'position');
        insertDom(el, el, binding);
      });
    } else {
      // 值为false 隐藏loading
      el.instance.visible = false;
    }
  };

  const insertDom = (parent, el) => {
    // 第一次进入，判断是否有dom，已有就修改是否可见，没有就插入
    if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
      // 插入dom
      Object.keys(el.maskStyle).forEach(property => {
        el.mask.style[property] = el.maskStyle[property];
      });
      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        addClass(parent, 'el-loading-parent--relative');
      }
      el.domVisible = true;// 控制是否已经插入dom，第一次
      parent.appendChild(el.mask); // 插入dom
      el.instance.visible = true; // 可见插入的loading蒙层
      el.domInserted = true; // 是否插入了dom，在unbind卸载指令时使用
    }
    if (el.domVisible) {
      // 已经插入了dom就修改visible属性。
      el.instance.visible = true;
    }
  };

  Vue.directive('loading', {
    bind: function(el, binding) {
      const mask = new Mask({
        el: document.createElement('div')
        // 可以在这里扩展样式；给data赋值
      });
      // instance是组件整体，就是组件中的this，mask是组件的dom。
      el.instance = mask;
      el.mask = mask.$el;
      el.maskStyle = {}; // 定位的style
      toggleLoading(el, binding);
    },

    update: function(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },

    unbind: function(el, binding) {
      if (el.domInserted) {
        el.mask &&
        el.mask.parentNode &&
        el.mask.parentNode.removeChild(el.mask);
        toggleLoading(el, { value: false, modifiers: binding.modifiers });
      }
      el.instance && el.instance.$destroy();
    }
  });
};

export default loadingDirective;
