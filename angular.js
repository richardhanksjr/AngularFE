    var app = angular.module('myApp',[]);

    
    app.controller('todosController', function($scope, $http){
      
      $http.get('http://localhost:8080/task')
      .then(function(response){
          console.log(response.data);
          $scope.todos = response.data._embedded.task;
      });

        $scope.message = "Angular";
        $scope.createNewTask = function(name){
          $http({
            method: 'POST', 
            url: 'http://localhost:8080/task',
            data:{ "task": name,
                  "complete": false
            }
          }).then(function(response){
                   $http.get('http://localhost:8080/task')
            .then(function(response){
                console.log(response.data);
                $scope.todos = response.data._embedded.task;
          });
          })
        }

        $scope.deleteTask = function(href){
          console.log(href);
          $http({
            method: 'DELETE',
            url: href
          })
          .then(function(response){
                   $http.get('http://localhost:8080/task')
            .then(function(response){
                console.log(response.data);
                $scope.todos = response.data._embedded.task;
          });
          })
        }

        $scope.updateTask = function(href, task, complete){
          $http({
            method: "PUT", 
            url: href,
            data: {"task": task,
                  "complete": complete}
          })
          .then(function(response){
             $http.get('http://localhost:8080/task')
            .then(function(response){
                console.log(response.data);
                $scope.todos = response.data._embedded.task;
          })
          })
        }

        $scope.showComplete = false;
        // $scope.todos = [{task: "get milk", completed: false}, {task: "finish this app", completed: false}];

       $scope.completedTasks = function(){
          var counter = 0;
          $scope.todos.forEach(function(todo){
            if (todo.complete === false){
              counter += 1;
            }
          })
          $scope.remainingColor = counter < 3 ? "green" : "red";
          return counter;
        }
    });