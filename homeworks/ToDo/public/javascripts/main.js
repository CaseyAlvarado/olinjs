var ToDo = angular.module('ToDo', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.editedText = {}; 
    $scope.originalText = {}; 
    $scope.editorEnabled = false;
    $scope.active = null; 
    $scope.completed = null; 
    $scope.alls = true; 
    $scope.aca = {}; 

    // when landing on the page, get all todos and show them
    $http.get('/api/toDos/all')
        .success(function(data) {
            $scope.todos = data; //give the scope all of the to do items
            $scope.aca = "All"; 
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form with a new to do item, send the text to the node API
    $scope.createTodo = function() {
        //sending object of boolean indicators of which page we are on and therefore which to do items need to be displayed
        $http.post('/api/toDos', {todo: $scope.formData, active : $scope.active, completed : $scope.completed, all : $scope.alls}) 
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data; 
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //POST to send new to do item information to back end to save
    $scope.completedTodo = function(todo) {
        //sending object of boolean indicators of which page we are on and therefore which to do items need to be displayed
        $http.post('/api/toDos/completed/' + todo._id, {todo: todo, active : $scope.active, completed : $scope.completed, all : $scope.alls}) 
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //set editing feature to true to allow editing, save original text in case of "cancel" back to original
    $scope.enableEditor = function(todo) {
        $scope.originalText = todo.text; 
        todo.editorEnabled = true;
        $scope.editedText = todo.text;
    };

    //on the case of cancel, return the text back to the original text and disable editor
    $scope.disableEditor= function(todo) {
        todo.editorEnabled = false;
        todo.text = $scope.originalText; 
    };

    //save edited text by posting it to the server and updating the screen
    $scope.save = function(todo){
        $http.post('/api/toDos/update/' + todo._id, todo)
            .success(function(data){ 
                todo.text = data.text; 
            })
            .error(function(data){ 
                console.log("There has been an error:", data); 
            })

        $scope.disableEditor(todo);
    };

    //upon click of the "X" button, remove the to do by removing it from the back end and returning remaining to do items
    $scope.removeToDO = function(todo){ 
        console.log({todo: todo, active : $scope.active, completed : $scope.completed, all : $scope.alls})
        $http.post('/api/toDos/' + todo._id, {todo: todo, active : $scope.active, completed : $scope.completed, all : $scope.alls})
            .success(function(data){ 
                $scope.todos = data; 
            })
            .error(function(data){ 
                console.log("There has been an error")
            })
    }; 

    //when we click the "active" button, set the active boolean to true and all others to false. 
    //Also get all active to do items to display
    $scope.enableActive = function(){ 
        $scope.active = true; 
        $scope.completed = false; 
        $scope.alls = false; 
        $scope.aca = "Active"; 

        $http.get('/api/toDos/active')
            .success(function(data){ 
                $scope.todos = data; 
            })
            .error(function(error){ 
                console.log("There has been an error", error); 
            });
    };

    //when we click the "completed" button, set the completed boolean to true and all others to false. 
    //Also get all completed to do items to display
    $scope.enableCompleted = function(){ 
        $scope.active = false; 
        $scope.completed = true; 
        $scope.alls = false; 
        $scope.aca = "Completed"; 

        $http.get('/api/toDos/completed')
            .success(function(data){
                $scope.todos = data;    
            })
            .error(function(error){ 
                console.log("There has been an error", error); 
            });
    }; 

    //when we click the "all" button, set the alls boolean to true and all others to false. 
    //Also get all to do items to display
    $scope.enableAlls = function(){ 
        $scope.active = false; 
        $scope.completed = false; 
        $scope.alls = true; 
        $scope.aca = "All"

        $http.get('/api/toDos/all')
            .success(function(data){ 
                $scope.todos = data; 
            })
            .error(function(err){ 
                console.log("There has been an error", errr); 
            });
    }; 
}

