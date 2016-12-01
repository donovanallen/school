angular
  .module("skewl", [
    "ui.router",
    "ngResource"
  ])
  .config(["$stateProvider",
    RouterFunction
  ])
  .controller("studentsIndexController", [
    "Student",
    "$state",
    studentsIndexControllerFunction
  ])
  .controller("studentsShowController", [
    "$state",
    "$stateParams",
    "Student",
    studentsShowControllerFunction
  ])
  .factory("Student", [
    "$resource",
    StudentFactory
  ])

  function StudentFactory($resource) {
    return $resource("/api/students/:name", {}, {
      update: {method: "PUT"}
    });
  }

  function studentsIndexControllerFunction(Student, $state) {
    this.students = Student.query();
    this.newStudent = new Student()
    this.create = function() {
      this.newStudent.$save().then(function(student){
        $state.go("show", { name: student.name })
      })
    }
  }

  function studentsShowControllerFunction($state, $stateParams, Student) {
    this.student = Student.get({name: $stateParams.name})
    this.update = function() {
      this.student.$update({name: $stateParams.name})
    }
    this.destroy = function() {
      this.student.$delete({name: $stateParams.name}).then(function() {
        $state.go("index")
      })
    }
  }


  function RouterFunction ($stateProvider) {
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/js/ng-views/welcome.html"
    })
    .state("index", {
      url: "/students",
      templateUrl: "/assets/js/ng-views/index.html",
      controller: "studentsIndexController",
      controllerAs: "vm"
    })
    .state("show", {
      url:"/students/:name",
      templateUrl: "assets/js/ng-views/show.html",
      controller: "studentsShowController",
      controllerAs: "vm"
    })
  }
