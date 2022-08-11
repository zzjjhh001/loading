## loading
这个一个轻量级的elementUI的loading组件。
### 依赖
vue环境，浏览器环境
### 功能
1. 局部loading，全屏loading
2. 自定义loading图片和文案
3. 自定义mask的背景色，以及自定义类
4. 支持position为sticky的DOM。
### 使用
```html
<div class="test2" style="height: 300px"
hdf-loading-img-src=''
hdf-loading-text='加载中...'
hdf-loading-background='rgba(111, 111, 0, .5)'
hdf-loading-z-index='1000'
v-loading.fullscreen="show">test2</div>
```
```javascript
import loading from '@jhzzzu/loading';
import '@jhzzzu/loading/style/loading.scss';
loading.install(Vue);
```