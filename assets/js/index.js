$(function () {
  getUserInfo();

  // 退出登录
  $("#btnlogout").on("click", function () {
    //   弹出退出框，清空token，跳转登录页面
    layer.confirm(
      "是否确定退出?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        localStorage.removeItem("token");
        location.href = "./login.html";
        layer.close(index);
      }
    );
  });
});

function getUserInfo() {
  $.ajax({
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: (res) => {
      //   console.log(res);
      if (res.status != 0) {
        return layui.layer.msg(res.message);
      }
      renderAvatar(res.data);
    },
    // complete: function (res) {
    //   console.log(res.responseJSON);
    //   // 判断  如果状态码是1  错误信息是身份认证失败，那么就跳转到登录页面
    //   let obj = res.responseJSON;
    //   if (obj.status == 1 && obj.message === "身份认证失败!") {
    //     // 清空本地token
    //     localStorage.removeItem("token");
    //     // 页面跳转
    //     location.href = "./login.html";
    //   }
    // },
  });
}

function renderAvatar(user) {
  let name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  if (user.user_pic !== null) {
    $(".layui-nav-img").show().attr("src", user.user_pic);
    $("text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    let text = name[0].toUpperCase();
    $(".text-avatar").show().html(text);
  }
}
