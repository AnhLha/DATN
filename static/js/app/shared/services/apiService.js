(function (app){
    app.factory('apiService', apiService);

    apiService.$inject = [];
    function apiService($http){
        return{
            get: get,
            insert: insert,
            del: del,
            update: update,
            del: del,
            getpaging: getpaging
        }

        function get(url, params, success, failure){
            itemRef.ref(url).on('value', 
                function(snapshot) {
                    success(snapshot);
                }, 
                function(error){
                    //notificationService.displayError(error.message);
                    failure();
                });
        }

        function getpaging(url, pageNumber, orderBy, success, failure){
            var pageSize = 10;
            var start = (pageNumber-1) * pageSize;
            //var end = pageNumber * pageSize;
            var ref = itemRef.ref(url);
            ref.orderBy(orderBy)
                .startAt(start)
                .limit(pageSize)
                .on('value', 
                function(snapshot) {
                    success(snapshot);
                }, 
                function(error){
                    //notificationService.displayError(error.message);
                    failure();
                });
        }

        function insert(url, params, success, failure){
            itemRef.ref(url).set(params, function(error) {
                if (error) {
                    if (error.status === 401) {
                        notificationService.displayError('Authenticate is required.');
                    }
                    else if (failure != null) {
                        //notificationService.displayError(error.message);
                        failure();
                    }
                } else {
                    // Data saved successfully!
                    success();
                }
            });
        }

        function update(url, params, success, failure){
            itemRef.ref(url).update(params, function(error) {
                if (error) {
                    if (error.status === 401) {
                        notificationService.displayError('Authenticate is required.');
                    }
                    else if (failure != null) {
                        //notificationService.displayError(error.message);
                        failure();
                    }
                } else {
                    // Data saved successfully!
                    success();
                }
            });
        }
        
   
        function del(url, success, failure) {
            var objRef = firebase.database().ref(url);
            objRef.remove()
            .then(function() {
                success();  //notificationService.displaySuccess("Remove succeeded.");
            })
            .catch(function(error) {
                failure(error);     //notificationService.displayError("Remove failed: " + error.message);
            });
        }
    }
})(angular.module('vesselfinder.common'));