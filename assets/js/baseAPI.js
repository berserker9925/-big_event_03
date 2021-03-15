let baseURL = "http://ajax.frontend.itheima.net";
$.ajaxPrefilter(function (options) {
  options.url = baseURL + options.url;

  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };

    options.complete = function (res) {
      let obj = res.responseJSON;
      if (obj.status == 1 && obj.message === "身份认证失败！") {
        localStorage.removeItem("token");
        location.href = "./login.html";
      }
    };
  }

  // 拦截所有响应，判断身份认证信息
  // params.complete = function (res) {
  // console.log(res.responseJSON);
  // // 判断  如果状态码是1  错误信息是身份认证失败，那么就跳转到登录页面
  // let obj = res.responseJSON;
  // if (obj.status == 1 && obj.message === "身份认证失败！") {
  //   // 清空本地token
  //   localStorage.removeItem("token");
  //   // 页面跳转
  //   location.href = "./login.html";
  // }
  // },
});
