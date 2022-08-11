// 获取属性
export function getStyle(element, styleName) {
  // 不能获取float，opacity属性
  // 传递参数前处驼峰问题
  return element.style[styleName] || window.getComputedStyle(element, '')[styleName];
}
// 添加calss
export function addClass(element, className) {
  if(!element || !className) {
    return;
  }
  element.classList.add(className);
}
// 删除class
export function removeClass(element, className) {
  if(!element || className) {
    return;
  }
  element.classList.remove(className);
}