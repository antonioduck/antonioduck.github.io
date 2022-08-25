var currentPlayer = 1;
var box = $("#game");

var modalBig = $(".modal-bg");
var modal = $(".modal");
var button = $("#but2");

button.on("click", function () {
  modalBig.removeClass("modal-bg");
  modal.addClass("modal2");
});

// Step 1: Listen to column click events
$(".column").on("click", function (event) {
  // Step 2: Figure out which column was clicked
  var column = $(event.currentTarget);
  // Step 3: Get the slots of that column
  var slots = column.children();

  // Step 4: Loop through all the slots (starting from the bottom)
  for (var i = slots.length - 1; i >= 0; i--) {
    // Step 5: Get hold of the corresponding whole
    var whole = slots.eq(i).children();

    // Step 6: Check whether the slot is free (it doesn't have the classes player-1 and player-2)
    if (!whole.hasClass("player-1") && !whole.hasClass("player-2")) {
      // //       find outs the slots for the horizontcal victory
      var temporal = i;

      var rowslots = $(".row-" + temporal);

      // Step 7: If the slot is free, take it (add the player class to it)
      whole.addClass("player-" + currentPlayer);

      // Step 8: Check whether the current player has won:
      var Verticalvictory = checkForVerticalVictory(slots);

      var diagonalvictory = checkForDiagonalVictory();

      var horizontalVictory = checkForHorizontalVictory(rowslots);
      if (Verticalvictory || horizontalVictory || diagonalvictory) {
        console.log("WIN! 🎉");
        // Victory dance!
        // Restart the game

        setTimeout(function () {
          location.reload();
        }, 8000);
        box.addClass("game2");

        alert("you have won");
      }
      // Switch Players
      currentPlayer = currentPlayer === 1 ? 2 : 1;

      // Alternative:
      // if (currentPlayer === 1) {
      //     currentPlayer = 2;
      // } else  {
      //     currentPlayer = 1;
      // }
      break;
    }
  }
});

function checkForVerticalVictory(slots) {
  //Initialize the count to 0
  var count = 0;

  // Loop through all the slots
  for (var i = 0; i < slots.length; i++) {
    var whole = slots.eq(i).children();
    if (whole.hasClass("player-" + currentPlayer)) {
      // Increment the count if the slot is taken by the current player
      count++;
      if (count === 4) {
        // If there is a win (4 in a row) - return true
        return true;
      }
    } else {
      // Reset the count to 0 if the slot is not taken by the curent player
      count = 0;
    }
  }

  // If no win was found - return false
  return false;
}

function checkForHorizontalVictory(rowslots) {
  //Initialize the count to 0
  var count2 = 0;

  // Loop through all the slots
  for (var j = 0; j < rowslots.length; j++) {
    var hole2 = rowslots.eq(j).children();

    if (hole2.hasClass("player-" + currentPlayer)) {
      // Increment the count if the slot is taken by the current player
      count2++;
      if (count2 === 4) {
        // If there is a win (4 in a row) - return true
        return true;
      }
    } else {
      // Reset the count to 0 if the slot is not taken by the curent player
      count2 = 0;
    }
  }

  // If no win was found - return false
  return false;
}
var DIAGONALS = [
  [3, 8, 13, 18],
  [4, 9, 14, 19, 24],
  [5, 10, 15, 20, 25, 30],
  [11, 16, 21, 26, 31, 36],
  [17, 22, 27, 32, 37],
  [23, 28, 33, 38],
  [2, 9, 16, 23],
  [1, 8, 15, 22, 29],
  [0, 7, 14, 21, 28, 35],
  [6, 13, 20, 27, 34, 41],
  [12, 19, 26, 33, 40],
  [18, 25, 32, 40],
];

var slots = $(".slot");

function checkForDiagonalVictory() {
  for (var diag of DIAGONALS) {
    // Go through all diagonals
    // Create an empty list of slots:
    var listOfSlots = $();

    for (var index of diag) {
      // Go through the slots of that Diagonal
      // Build up your list of slots
      var slot = slots.eq(index);
      listOfSlots = listOfSlots.add(slot);
    }
    checkVictory();
    //console.log(listOfSlots.length);
    var diagvictory = checkVictory();
    if (diagvictory) {
      return diagvictory;
    }
  }
  return false;

  function checkVictory() {
    var count3 = 0;
    for (var l = 0; l < listOfSlots.length; l++) {
      var hole3 = listOfSlots.eq(l).children();

      //console.log(hole3);
      if (hole3.hasClass("player-" + currentPlayer)) {
        // Increment the count if the slot is taken by the current player
        count3++;
        if (count3 === 4) {
          // If there is a win (4 in a row) - return true
          return true;
        }
      }
    }

    // If no win was found - return false
    return false;
  }
}
// Check whether your list of slots includes a victory (you could use our checkForVictory() function again)
