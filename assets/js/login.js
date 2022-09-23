$(function () {

  // 1/点击去注册账号的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 2/点击去登录的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })


  const form = layui.form
  const layer=layui.layer
  form.verify({
    pwd: [
      /^[\S]{6,20}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      // 通过形参拿到的是确认密码框的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次判断
      // 如果判断失败，则return一个提示消息即可
      const pwd = $('.reg-box [type="password"]').val()
      if (value !== pwd) {
        return '两次密码不一致'
      }
    }

  })

  // 监听注册表单的提交事件
  $('#form-reg').on('submit', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form-reg [name="username"]').val(),
        password: $('#form-reg [name="password"]').val()
      },
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // 跳转到登录界面
        $('#link_login').click()
      }
    })
  })

  // 监听登录表单的提交事件
  $('#form-login').on('submit',function(e){
    // 阻止表单的默认提交行为
    e.preventDefault()

    $.ajax({
      method:'POST',
      url:'/api/login',
      //快速获取表单数据
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0) return layer.msg('登录失败')
        layer.msg('登录成功')
        // 将登录成功之后得到的token字符串，保存到本地存储中
        localStorage.setItem('token',res.token)
        location.href = '/index.html'
      }
    })



  })

})