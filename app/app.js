/**
 * Created by mrige on 22/11/17.
 */
var app = angular.module("HangManApp", [] );
app.controller("GameController", ['$scope' , function ($scope) {

  var words = ["rat", "cat", "bat", "mat"];
  var rightGuesses = 0;
  $scope.incorrectLettersChosen = [];
  $scope.correctLetterChosen = [];
  $scope.guesses = 6;
  $scope.displayWord = '';
  $scope.input = {
      letter : ''
  }

  $scope.strikes = [
    {'title' : 'X', 'type':6},
    {'title' : 'X', 'type':5},
    {'title' : 'X', 'type':4},
    {'title' : 'X', 'type':3},
    {'title' : 'X', 'type':2},
    {'title' : 'X', 'type':1}
  ]

  var selectRandomWord = function () {
      var index = Math.round(Math.random()*(words.length-1));
      return words[index];
  }

  var newGame = function () {

      $scope.incorrectLettersChosen = [];
      $scope.correctLetterChosen = [];
      $scope.guesses = 6;
      $scope.displayWord = '';

      selectedWord = selectRandomWord();
      var tempDisplayWord = '';
      for(var i = 0; i < selectedWord.length; i++){
          tempDisplayWord += "*";
      }
      $scope.displayWord = tempDisplayWord;
      console.log(tempDisplayWord);
  }
  $scope.failedGuesses = function () {
    if($scope.guesses == 6){
      return false;
    }
    else{
      return true;
    }
  }
  $scope.letterChosen = function () {

      if($scope.input.letter.length != 1){
          $scope.input.letter = "";
          return;
      }

      for(var i = 0; i < $scope.correctLetterChosen.length; i++){
          if($scope.correctLetterChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()){
              $scope.input.letter="";
              return;
          }
      }

      for(var i = 0; i < $scope.incorrectLettersChosen.length; i++){
          if($scope.incorrectLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()){
              $scope.input.letter="";
              return;
          }
      }
      var flag = false;
      var temp = '';

      for(var i = 0; i < selectedWord.length; i++){

          console.log(selectedWord);
          console.log($scope.input.letter.toString());
         if(selectedWord.toLowerCase().charAt(i) == $scope.input.letter.toLowerCase()){

             if(flag == false){
                 rightGuesses++;
                 $scope.correctLetterChosen.push($scope.input.letter.toLowerCase());
                 flag = true;
             }

             for(var j = 0; j < $scope.displayWord.length; j++){
                 if(j == i){
                     temp+= $scope.input.letter.toLowerCase();
                 }
                 else {
                     temp+= $scope.displayWord.charAt(j);
                 }

             }
             $scope.displayWord = temp;

         }
      }
      if(flag == false){
          $scope.guesses--;
          $scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase());

      }

    if(rightGuesses == selectedWord.length){

        alert(" YOU WIN !!!!");
    }
    else if($scope.guesses == 0){
       alert(" YOU LOSE :(" );
    }
  }
   newGame();
}])
