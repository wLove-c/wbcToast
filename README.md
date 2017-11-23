# wbcToast
一款基于vue2.0写的toast，可以统一toast，不需要通过UI，不需要重复代码，想怎么定义就怎么定义，随心随欲自定义样式

在main.js引入js和css就可以
如：
```
import wbcToast from './wbcToast'
import wbcToastCss from './wbcToast.css'
Vue.use(wbcToastCss)
Vue.use(wbcToast, {    // 支持全局配置
  defaultType: 'center', // 位置
  duration: '2000' // 展示时间
})
```
在某个 .vue页面使用如下：
```
this.$toast('我是一个Toast', 'top')
```
