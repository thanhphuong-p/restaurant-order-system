const app = angular.module('foodOrderApp', []);

app.controller('TableController', function($scope, $http) {
  const apiUrl = 'http://localhost:8081/api/tables';

  $scope.tables = [];
  $scope.table = { tableNumber: '', status: 'TRONG' };
  $scope.orderDetails = [];
  $scope.selectedTableNumber = "";

  // Load danh sách bàn
  $scope.loadTables = function() {
    $http.get(apiUrl).then(function(response) {
      $scope.tables = response.data;
    });
  };
  // Lên món
      $scope.markAsServing = function(table) {
        table.status = 'DANG_DUNG_MON';
        $http.put(apiUrl + '/' + table.id, table).then(function() {
          $scope.loadTables();
        }, function(error) {
          alert("Lỗi khi cập nhật trạng thái bàn.");
          console.error(error);
        });
      };


  // Thêm hoặc cập nhật bàn
  $scope.save = function() {
    if ($scope.table.id) {
      $http.put(apiUrl + '/' + $scope.table.id, $scope.table).then(function() {
        $scope.loadTables();
        $scope.reset();
      });
    } else {
      $http.post(apiUrl, $scope.table).then(function() {
        $scope.loadTables();
        $scope.reset();
      });
    }
  };

  // Edit bàn
  $scope.edit = function(t) {
    $scope.table = angular.copy(t);
  };

  // Xóa bàn
  $scope.delete = function(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
      $http.delete(apiUrl + '/' + id).then(function() {
        $scope.loadTables();
      });
    }
  };

  // Reset form
  $scope.reset = function() {
    $scope.table = { tableNumber: '', status: 'TRONG' };
  };

  // Xem chi tiết đơn hàng theo bàn
  $scope.viewDetails = function(table) {
    $scope.selectedTableNumber = table.tableNumber;
    $http.get("http://localhost:8081/api/orders/table/" + table.id).then(function(response) {
      console.log("Chi tiết đơn hàng:", response.data);
      $scope.orderDetails = response.data.map(function(item) {
        return {
          foodName: item.food.name,
          quantity: item.quantity,
          price: item.price
        };
      });

      const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
      modal.show();
    }, function(error) {
      console.error("Không lấy được chi tiết đơn hàng:", error);
      $scope.orderDetails = [];
    });
  }

  // Gọi lần đầu
  $scope.loadTables();
  
});