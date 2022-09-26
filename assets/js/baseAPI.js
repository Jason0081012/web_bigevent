// 注意：每次调用$.get,$.post,$.ajax的时候
// 会点调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的ajax请求之前，同意凭借请求的根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url
  // console.log(options.url);
  if (options.url.indexOf('/my/')!== -1) {
    // headers请求头配置对象
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  // 全局挂在complete
  options.complete = function(res){
    // res.responseJSON,拿到服务器返回的数据
    if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
      // 1、清空本地存储中的token
    localStorage.removeItem('token')
    // 2、跳转到登录页面
    location.href = '/login.html'
    }

  }
})