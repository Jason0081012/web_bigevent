$(function () {
  // 调用函数getUserInfo获取用户信息
  getUserInfo()

  // 给退出添加点击事件
  $('#btnLogOut').on('click', function () {
    // alert('ok')
    const layer = layui.layer

    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 1、清空本地存储中的token
      localStorage.removeItem('token')
      // 2、跳转到登录页面
      location.href = '/login.html'
        // 自带弹出confirm询问框
        layer.close(index);
    });
  })

})
// http://big-event-api-t.itheima.net
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败')
      }

      // 调用渲染头像函数
      randerAvatar(res.data)
    },
    // 不管成功还是失败，都会执行
    // complete:function(res){
    //   // res.responseJSON,拿到服务器返回的数据
    //   if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
    //     // 1、清空本地存储中的token
    //   localStorage.removeItem('token')
    //   // 2、跳转到登录页面
    //   location.href = '/login.html'
    //   }

    // }

    
  })
}

function randerAvatar(user) {
  const name = user.nickname || user.username

  $('#welcome').html(`欢迎&nbsp;&nbsp;` + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    const frist = name[0].toUpperCase()
    $('.text-avatar').html(frist).show()
  }

}