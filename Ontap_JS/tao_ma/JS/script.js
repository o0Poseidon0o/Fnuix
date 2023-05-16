function generateQRCode() {
  const link = document.getElementById("input-link").value;

  // Kiểm tra xem đường link có tồn tại hay không
  if (link.trim() === "") {
    alert("Vui lòng nhập đường link!");
    return;
  }

  // Tạo mã QR code
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 256,
    height: 256,
  });
  qrcode.makeCode(link);
}
function makeCode() {
  var elText = document.getElementById("text");

  if (!elText.value) {
    alert("Input a text");
    elText.focus();
    return;
  }

  qrcode.makeCode(elText.value);
}

makeCode();

$("#text")
  .on("blur", function () {
    makeCode();
  })
  .on("keydown", function (e) {
    if (e.keyCode == 13) {
      makeCode();
    }
  });
