var app = angular.module("recoveryApp", []);

app.controller("RecoveryController", function ($scope, $http) {
  $scope.message = ""; // Khởi tạo biến message

  // Hàm gửi yêu cầu khôi phục mật khẩu
  $scope.sendRecoveryEmail = function () {
    var data = {
      email: $scope.email,
    };

    $http
      .post("http://localhost:8081/api/forgot-password", data) // Gửi yêu cầu đến backend
      .then(function (response) {
        // Xử lý thành công - nhận thông báo từ backend
        $scope.message = response.data.message;
      })
      .catch(function (error) {
        // Xử lý lỗi
        console.error("Có lỗi xảy ra:", error);
        $scope.message = "Đã có lỗi xảy ra, vui lòng thử lại!";
      });
  };
});