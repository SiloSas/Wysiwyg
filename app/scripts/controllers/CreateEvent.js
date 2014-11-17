app.controller('CreateEventCtrl',['$scope', '$http', function($scope, $http){
    $scope.GetEventByUrl = function(){
        $http.get('https://graph.facebook.com/v2.2/' + $scope.eventFbUrl + '/?' +  'access_token=CAACEdEose0cBAHQkY5NTb9DW7n4VyQvUvfHFTLoujfGFrI9P50oJQhjf1sR8paY6nvewRZBhTO5WV8pAEWAnGEsBnrlLUexUZBuq5cTzzZAzv41xSkuunta67dMZB0ApmOCExNFf5uU9mwZCYepymmgEg4n9I36gXB1eILZAbJEkpcjHx3XQQRV73ZAu2SjLEJvLNy6eBQpfGZBPZCag57CUlO8pZAipyjnvQZD').
            success(function(data, status, headers, config) {
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };
    $scope.searchEvent = function(){
        $http.get('https://graph.facebook.com/v2.2/search?q='+ $scope.eventFbName + '&limit=15&type=event&access_token=CAACEdEose0cBAHQkY5NTb9DW7n4VyQvUvfHFTLoujfGFrI9P50oJQhjf1sR8paY6nvewRZBhTO5WV8pAEWAnGEsBnrlLUexUZBuq5cTzzZAzv41xSkuunta67dMZB0ApmOCExNFf5uU9mwZCYepymmgEg4n9I36gXB1eILZAbJEkpcjHx3XQQRV73ZAu2SjLEJvLNy6eBQpfGZBPZCag57CUlO8pZAipyjnvQZD').
            success(function(data, status, headers, config) {
                console.log(data.data);

                $scope.searchEvents = data.data;
            }).
            error(function(data, status, headers, config) {

                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };
    $scope.GetEventById = function(id){
        $http.get('https://graph.facebook.com/v2.2/' + id + '/?' +  'access_token=CAACEdEose0cBAHQkY5NTb9DW7n4VyQvUvfHFTLoujfGFrI9P50oJQhjf1sR8paY6nvewRZBhTO5WV8pAEWAnGEsBnrlLUexUZBuq5cTzzZAzv41xSkuunta67dMZB0ApmOCExNFf5uU9mwZCYepymmgEg4n9I36gXB1eILZAbJEkpcjHx3XQQRV73ZAu2SjLEJvLNy6eBQpfGZBPZCag57CUlO8pZAipyjnvQZD').
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.event = data;
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        $http.get('https://graph.facebook.com/v2.2/' + id + '/?fields=cover&access_token=CAACEdEose0cBAHQkY5NTb9DW7n4VyQvUvfHFTLoujfGFrI9P50oJQhjf1sR8paY6nvewRZBhTO5WV8pAEWAnGEsBnrlLUexUZBuq5cTzzZAzv41xSkuunta67dMZB0ApmOCExNFf5uU9mwZCYepymmgEg4n9I36gXB1eILZAbJEkpcjHx3XQQRV73ZAu2SjLEJvLNy6eBQpfGZBPZCag57CUlO8pZAipyjnvQZD').
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.event.cover = data.cover;
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };
}]);