app.controller('CreateArtisteCtrl',['$scope', '$http', function($scope, $http){
    $scope.searchArtist = function(){
        $http.get('https://graph.facebook.com/v2.2/search?q='+ $scope.artisteFb + '&limit=200&type=page&access_token=CAACEdEose0cBAIjMHRd5EvhaRFZAkChWdVchFQPzMB5cfFQvXjdpkycBOd7KgTQ26DsIyoPaYazVP3BKts0a6xkOVUOj7F0RK2HnsZB2yBclZAYdQZBpjMcjYu2NDnZAMZBIgoXr9snOPIZBhUwd0ZCXQYaP40VEU7xNaNAGlW2ZAZBZBWaD57PCVq93KtNtq2pSFCDZC8b2nrzKFaJLZBfziCx3WRyElrhKjdB8ZD').
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.artistes = data.data;
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };
    $scope.GetArtisteById = function(id){
        $http.get('https://graph.facebook.com/v2.2/' + id + '/?' +  'access_token=CAACEdEose0cBAIjMHRd5EvhaRFZAkChWdVchFQPzMB5cfFQvXjdpkycBOd7KgTQ26DsIyoPaYazVP3BKts0a6xkOVUOj7F0RK2HnsZB2yBclZAYdQZBpjMcjYu2NDnZAMZBIgoXr9snOPIZBhUwd0ZCXQYaP40VEU7xNaNAGlW2ZAZBZBWaD57PCVq93KtNtq2pSFCDZC8b2nrzKFaJLZBfziCx3WRyElrhKjdB8ZD').
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.artiste = data;
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };

}]);