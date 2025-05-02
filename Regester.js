var app = angular.module("registerApp", []);
app.controller("RegisterController", function ($scope, $http) {
  $scope.registerData = {};
  $scope.registerSuccess = false;
  $scope.responseMessage = ""; // Khởi tạo empty string

  $scope.register = function () {
    $scope.responseMessage = ""; // Đặt lại responseMessage mỗi khi người dùng nhấn đăng ký
    $http
      .post(
        "http://localhost:8081/api/auth/register",
        $scope.registerData
      )
      .then(
        function (response) {
          if (response.data.status) {
            $scope.responseMessage = response.data.message;
            $scope.registerSuccess = true;
          } else {
            $scope.responseMessage = response.data.message;
            $scope.registerSuccess = false;
          }
        },
        function (error) {
          $scope.responseMessage = "Đã có lỗi xảy ra, vui lòng thử lại!";
          $scope.registerSuccess = false;
        }
      );
  };
});
