$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 2. 选择文件
  $("#btnChooseImage").on("click", function () {
    $("#file").click();
  });

  // 3. 修改截取图片
  $("#file").on("change", function (e) {
    // 拿到用户选择的文件
    let file = e.target.files[0];
    // 非空校验
    if (file == undefined) {
      return layui.layer.msg("请选择图片");
    }
    // 根据选择的文件，创建一个对应的 URL 地址
    let newImgURL = URL.createObjectURL(file);
    // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建       这个写可不写
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 4. 上传头像
  $("#btnUpload").on("click", function () {
    let dataURL = $image
      .cropper("getCroppedCanvas", {
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");
    console.log(dataURL);
    console.log(typeof dataURL);

    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: (res) => {
        // console.log(res)
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg("恭喜更换头像成功");
        window.parent.getUserInfo();
      },
    });
  });
});
