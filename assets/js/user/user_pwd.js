$(function () {
  // 1. 定义校验规则
  let form = layui.form;
  form.verify({
    //   密码
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 新旧密码不重复
    samePwd: function (value) {
      if (value == $("[name=oldPwd]").val()) {
        return "原密码和旧密码不能相同";
      }
    },

    // 两次新密码必须相同
    rePwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        return "两个新密码必须相同";
      }
    },
  });

  // 2. 表单提交
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: (res) => {
        console.log(res);
        if (res.status != 0) {
          return layui.layer.msg(res.message, { icon: 5 });
        }
        // 成功后
        layui.layer.msg("修改密码成功", { icon: 6 });
        $(".layui-form")[0].reset();
        // location.href = "./../login.js"; x
        // location.href = "./../login.js"; x
        // location.href = "/login.js"; x
      },
    });
  });
});
