$(function () {
  // 1. 自定义验证规则
  let form = layui.form;
  form.verify({
    nickname: function (value) {
      if (value.trim().length > 6) {
        return "昵称长度为2~6位之间";
      }
    },
  });

  // 2. 用户渲染    后面要用到，封装成函数
  initUserInfo();

  let layer = layui.layer;
  function initUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        // console.log(res);
        if (res.status != 0) {
          return layer.msg(res.message);
        }
        //   成功后渲染
        form.val("formUserInfo", res.data);
      },
    });
  }

  // 3. 重置
  $("#btnReset").on("click", function (e) {
    // 阻止页面默认刷新
    e.preventDefault();
    // 用上面的用户渲染方法实现
    initUserInfo();
  });

  // 4. 修改信息
  $(".layui-card").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: (res) => {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message, { icon: 5 });
        }
        // 成功后
        layer.msg(res.message, { icon: 6 });
        $(this)[0].reset();
        // 调用父页面中更新用户信息和头像的方法
        window.parent.getUserInfo();
      },
    });
  });
});
