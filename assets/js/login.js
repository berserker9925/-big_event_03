$(function () {
    $('#link_reg').on('click',function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 自定义验证规则
    let form = layui.form;
    form.verify({
        // 密码规则：
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],

        repwd: function (value) {
            if (value !== $('.reg-box input[name=password]').val()){
                return "两次密码输入不一致"
            }
        }
    })

    // 需求3：注册功能
    let layer = layui.layer;
    $('#form_reg').on('submit',function (e) {
         // 阻止表单提交
        e.preventDefault();
        $.ajax({  
        type:"POST",  
        url:"/api/reguser",  
        data: {
            username: $('.reg-box input[name=username]').val(),
            password:$('.reg-box input[name=password]').val()
        },  
        success: (res) => {
            // console.log(res)
            if (res.status != 0) {
                return layer.msg(res.message,{icon:5});
            }
            layer.msg(res.message,{icon:6})
            // 手动切换到登录页面
            $('#link_login').click();
            // 重置form表单     清除
            $('#form_reg')[0].reset();
        }})
    })

    $('#form_login').on('submit',function (e) {
        // 阻止表单提交
       e.preventDefault();
       $.ajax({  
       type:"POST",  
       url:"/api/login",  
       data: $(this).serialize(),  
       success: (res) => {
           // console.log(res)
           if (res.status != 0) {
               return layer.msg(res.message,{icon:5});
           }
           layer.msg(res.message)
           // 保存token 未来的接口要用到token
           localStorage.setItem("token", res.token);
           // 跳转
           location.href = "./index.html"
       }})
   })
})