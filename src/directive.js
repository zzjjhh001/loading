import Vue from 'vue';
import Loading from './loading.vue';
import { getStyle, addClass, removeClass } from './util.js';
const Mask = Vue.extend(Loading);

const loadingDirective = {};
loadingDirective.install = Vue => {
  // 是否是服务端渲染，服务端渲染直接return;
  if (Vue.prototype.$isServer) return;
  Vue.directive('loading', {
    bind: function(el, binding, vnode) {
      // 在bind上获取了配置，后续不可修改。
      const textExr = el.getAttribute('hdf-loading-text');
      const backgroundExr = el.getAttribute('hdf-loading-background');
      const customClassExr = el.getAttribute('hdf-loading-custom-class');
      const imgSrcExr = el.getAttribute('hdf-loading-img-src');
      const zIndexExr = el.getAttribute('hdf-loading-z-index');
      const mask = new Mask({
        el: document.createElement('div'),
        data: {
          text: textExr,
          background: backgroundExr,
          customClass: customClassExr,
          imgSrc: imgSrcExr
        }
      });
      // el.instance 是el的实例
      el.instance = mask;
      // mask是具体的dom
      el.mask = mask.$el;
      // el的样式
      el.mask.style['zIndex'] = zIndexExr || 2000;
      // 初始化，如果为true
      binding.value && toggleLoading(el, binding);
    },

    update: function(el, binding) {
      // v-loading的值修改
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },

    unbind: function(el, binding) {
      // 如果已经插入的DOM就执行删除操作
      if (el.domInserted) {
        // 删除插入的loading的dom;
        el.mask &&
        el.mask.parentNode &&
        el.mask.parentNode.removeChild(el.mask);
        // 
        toggleLoading(el, { value: false, modifiers: binding.modifiers });
      }
      // 销毁loading组件实例。
      el.instance && el.instance.$destroy();
    }
  });

  const toggleLoading = (el, binding) => {
    if (binding.value) {
      // 当v-loading为true时
        if (binding.modifiers.fullscreen) {
          el.mask.addClass();
          addClass(el.mask, 'is-fullscreen');
        } else {
          removeClass(el.mask, 'is-fullscreen');
        }
        insertDom(el, binding);
    } else {
      removeClass(el, 'hdf-loading-parent-relative');
      el.instance.visible = false;
    }
  };
  // 1. 被遮盖的dom是不可见的。
  // 2. 被插入的dom的position问题。(loading.vue中div是absolute)
  const insertDom = (el, binding) => {
    el.originalPosition = getStyle(el, 'position');
    // 如果v-loading的dom已经是不可见的(display = none, visibility = hidden);
    if (getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
      // el.mask的position是absolute
      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed' && el.originalPosition !== 'sticky') {
        addClass(el, 'hdf-loading-parent-relative');
      }
      // 插入dom
      el.appendChild(el.mask);
      el.domInserted = true;
      el.instance.visible = true;
    } else {
      el.instance.visible = false;
    }
  };
};

export default loadingDirective;
