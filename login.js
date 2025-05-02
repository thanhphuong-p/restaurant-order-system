var app = angular.module("loginApp", []);

app.controller("LoginController", function ($scope, $http) {
  $scope.loginData = {};
  $scope.loginSuccess = false; // Biến theo dõi trạng thái đăng nhập

  $scope.login = function () {
    console.log($scope.loginData); // Kiểm tra dữ liệu

    // Gửi yêu cầu đăng nhập tới API
    $http
      .post("http://localhost:8081/api/auth/login", $scope.loginData)
      .then(
        function (response) {
          // Nếu đăng nhập thành công
          if (response.data.success) {
            $scope.responseMessage = response.data.message;
            $scope.loginSuccess = true; // Cập nhật trạng thái thành công
          } else {
            // Nếu đăng nhập thất bại
            $scope.responseMessage = response.data.message;
            $scope.loginSuccess = false; // Cập nhật trạng thái thất bại
          }
        },
        function (error) {
          $scope.responseMessage = "Đã có lỗi xảy ra, vui lòng thử lại!";
          $scope.loginSuccess = false; // Cập nhật trạng thái thất bại
        }
      );
  };
});
