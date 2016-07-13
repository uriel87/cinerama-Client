

app.controller('orderCtl', ['$scope', '$http', '$sce','$stateParams', '$state',function($scope, $http, $sce, $stateParams, $state) {

    //$scope.movie.name = $stateParams.movie_name;

    $scope.CurrentBranch = [];
    $scope.movieChoose = null;
    // $scope.moviePage = $stateParams.movie_name;
    $scope.Userseats = [];
    $scope.moviePage = $state.params.movie_name;




    var data = {
        name: $scope.moviePage
    };

    // $http.post("https://cinerama.herokuapp.com/getMovieDetails/", data).success(function(movie, status) {
    //     $scope.movies = movie;
    //     console.log($scope.movies);
    // });

    $http.post("http://localhost:3000/getMovieDetails/" , data).success(function(movie, status) {
        $scope.movies = movie;
        console.log($scope.movies);
    });



    $http.post("https://cinerama.herokuapp.com/getMovie/", data).success(function(movieDetails, status) {
        $scope.movieDetails = movieDetails;
        console.log($scope.movieDetails);
    });



    // $http.post("https://cinerama.herokuapp.com/getMovieCategory/", data).success(function(movieDetails, status) {
    //     $scope.relevantMovie = movieDetails;
    //     console.log($scope.relevantMovie);
    // });




    $http.post("https://cinerama.herokuapp.com/getMovieTrailer/", data).success(function(movieTrailer, status) {
        $scope.movieTrailer = $sce.trustAsResourceUrl(movieTrailer);
        console.log("movie trailer " + $scope.movieTrailer);
    });


    $http.post("https://cinerama.herokuapp.com/getMovieReview/", data).success(function(review, status) {
        $scope.review = review;
        console.log($scope.review);
    });


    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }


    $scope.changeCurrentMovie = function(currentBranch) {
        $scope.CurrentBranch = [];
        $scope.movieChoose = null;
        $scope.selectedIndex = -1;
        for (var i = 0; i < $scope.movies.length; i++) {
            if( ($scope.movies[i]._id.branch == currentBranch._id.branch) && ($scope.movies[i]._id.cinema == currentBranch._id.cinema) && ($scope.movies[i]._id.auditorium == currentBranch._id.auditorium)) {
                $scope.CurrentBranch.push(angular.merge({}, $scope.movies[i]));
            }
        }
        console.log($scope.CurrentBranch);
    };


    $scope.movieChooseByTime = function(movieChoose) {
        $scope.movieChoose = movieChoose;
        console.log($scope.movieChoose);
    };

    $scope.itemClicked = function ($index) {
        $scope.selectedIndex = $index;
    }

    $scope.setPercentageReview = function (reviewType) {
        var widthPrecetage;
        var styleHr;

        if(!$scope.review[0]) {
            return 0;
        }

        switch(reviewType) {
            case "lame":
                widthPrecetage = ($scope.review[0].lame / $scope.review.length) * 100
                styleHr = {
                    "width" : widthPrecetage + '%',
                    "background-color" : "#00b3fe"
                }
                break;
            case "wow":
                widthPrecetage = ($scope.review[0].wow / $scope.review.length) * 100
                styleHr = {
                    "width" : widthPrecetage + '%',
                    "background-color" : "#963cff"
                }
                break;
            case "wtf":
                widthPrecetage = ($scope.review[0].wtf / $scope.review.length) * 100
                styleHr = {
                    "width" : widthPrecetage + '%',
                    "background-color" : "#32fd8f"
                }
                break;
            default:
                widthPrecetage = ($scope.review[0].nice / $scope.review.length) * 100
                styleHr = {
                    "width" : widthPrecetage + '%',
                    "background-color" : "#f56d5f"
                }
        }

        return styleHr;
    }


    $scope.setSeat = function(seats, isChecked) {
        if(isChecked) {
            $scope.Userseats.push(seats);
            console.log($scope.Userseats);
        } else {
            var index = $scope.Userseats.indexOf(seats);
            $scope.Userseats.splice(index, 1);
            console.log($scope.Userseats);
        }
    };


    // $scope.sendOrderRequest = function(seats) {
    //
    //     for (var i = 0; i < $scope.Userseats.length; i++) {
    //
    //         var orderUser = {
    //             name: $scope.movieChoose._id.name,
    //             date: $scope.movieChoose._id.time,
    //             auditorium: $scope.movieChoose._id.auditorium,
    //             cinema: $scope.movieChoose._id.cinema,
    //             branch: $scope.movieChoose._id.branch,
    //             row: $scope.Userseats[i].row,
    //             number: $scope.Userseats[i].number,
    //             email: 'Yossi.Levy@gmail.com'
    //         }
    //
    //         $http.post("https://cinerama.herokuapp.com/setOrderMovie/", orderUser).success(function(res, status) {
    //             console.log(res);
    //             $state.go('enjoy');
    //         });
    //         $state.go('loading');
    //
    //     }
    // };



    $scope.goToPaymentPage = function() {

        var dataOrder = {
            movieDetails: $scope.movieChoose,
            seats: $scope.Userseats
        }

        $state.go('payment' , dataOrder);
    };


}]);
