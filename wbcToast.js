/**
 * Created by Administrator on 2017/10/19. write by wangbc
 */
var wbcToast = {}
// 避免重复install，设立flag
wbcToast.installed = false
wbcToast.install = function (Vue, options) {
  // console.log(options)
  if (wbcToast.installed) return
  let opt = {
    // 默认显示位置
    defaultType: 'center',
    // 默认持续时间
    duration: '2000'
  }
  // 使用options的配置
  for (let i in options) {
    opt[i] = options[i]
  }
  Vue.$toast = (toastMessage, typeWhere) => {
    // 如果有传type，位置则设为该type
    // console.log(typeWhere)
    var chooseType = typeWhere !== '' && typeWhere !== undefined ? typeWhere : opt.defaultType
    // 如果页面有toast则不继续执行
    if (document.querySelector('.wangbc-toast')) return
    // 1、创建构造器，定义好提示信息的模板
    let ToastTip = Vue.extend({
      template: `
                                   <div class='wangbc-toast'>
                                      <div class='wbc wbc-${chooseType}'>${toastMessage}</div>
                                   </div>
                                  `
    })
    // 2、创建实例，挂载到文档以后的地方
    // console.log(new ToastTip().$mount())
    let wangbcToast = new ToastTip().$mount().$el
    // 3、第一次把创建的实例添加到body中
    if (document.querySelector('.wangbc-toast')) {
    } else {
      document.body.appendChild(wangbcToast)
    }
    document.querySelector('.wangbc-toast').classList.remove('fadeOut')
    document.querySelector('.wangbc-toast').classList.add('fadeIn')
    // 4.两秒秒后消失
    setTimeout(() => {
      document.querySelector('.wangbc-toast').classList.remove('fadeIn')
      document.querySelector('.wangbc-toast').classList.add('fadeOut')
      /* setTimeout(() => {
       document.body.removeChild(wangbcToast)
       }, 500) */
    }, opt.duration)
    // 阻止遮罩滑动
    /* document.querySelector('div.wangbc-toast').addEventListener('touchmove', function (e) {
     e.stopPropagation()
     e.preventDefault()
     }) */

    wbcToast.installed = true
  }
  // 显示不同的位置
  ['bottom', 'top', 'center'].forEach(type => {
    Vue.$toast[type] = (tips) => {
      return Vue.$toast(tips, type)
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(wbcToast)
}

export default wbcToast
