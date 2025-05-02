var app = angular.module('promotionApp', []);

app.controller('PromotionController', function($scope, $http) {
  $scope.promotions = [];
  $scope.promotion = {};

  // Lấy tất cả các chương trình khuyến mãi
  $scope.getPromotions = function() {
    $http.get('http://localhost:8081/api/promotions')
      .then(function(response) {
        $scope.promotions = response.data;
      })
      .catch(function(error) {
        console.error('Error fetching promotions:', error);
      });
  };

  // Thêm hoặc cập nhật chương trình khuyến mãi
  $scope.savePromotion = function() {
    var url = 'http://localhost:8081/api/promotions';
    var method = 'POST';

    if ($scope.promotion.id) {
      url += '/' + $scope.promotion.id;
      method = 'PUT';
    }

    $http({
      method: method,
      url: url,
      data: $scope.promotion
    })
    .then(function(response) {
      $scope.getPromotions();
      $scope.clearForm();
    })
    .catch(function(error) {
      console.error('Error saving promotion:', error);
    });
  };

  // Sửa chương trình khuyến mãi
  $scope.editPromotion = function(id) {
    var selected = $scope.promotions.find(function(p) {
      return p.id === id;
    });

    if (selected) {
      $scope.promotion = angular.copy(selected);

      // Chuyển định dạng ngày để hiển thị đúng trong input[type=date]
      $scope.promotion.startDate = new Date(selected.startDate);
      $scope.promotion.endDate = new Date(selected.endDate);
    }
  };

  // Xóa chương trình khuyến mãi
  $scope.deletePromotion = function(id) {
    if (confirm("Bạn chắc chắn muốn xóa chương trình khuyến mãi này?")) {
      $http.delete('http://localhost:8081/api/promotions/' + id)
        .then(function() {
          $scope.getPromotions();
        })
        .catch(function(error) {
          console.error('Error deleting promotion:', error);
        });
    }
  };

  // Làm mới form
  $scope.clearForm = function() {
    $scope.promotion = {
      id: null,
      name: '',
      price: null,
      image: '',
      startDate: null,
      endDate: null,
      status: true,
      description: ''
    };
    if ($scope.promotionForm) {
      $scope.promotionForm.$setPristine();
      $scope.promotionForm.$setUntouched();
    }
  };

  // Gọi hàm để tải danh sách chương trình khuyến mãi khi trang tải
  $scope.getPromotions();
});
