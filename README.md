# Kitten Deathmatch

A simple CRPG-type fighting mini-game built with JQuery for UA Coding Bootcamp.

The bulk of the game's features can be found in assets/javascript/game.js.

First, I define an array of possible fighters. I use a for-loop to add a few additional properties to each fighter object.

Next, I define a helper method, **hideAll()**, that I'll use after winning or loosing.

Next, I define the **Match** object, which contains an array of possible fighters and opponents, both deep copies of the fighters array, and sets the myFighter and myOpponent properties to 0. 

*I feel like I probably was overzealous in continually making deep copies. The myFighter/myOpponent = 0 assignment is left-over from a first-try at the game. I'd like to improve both in the future, but for now this needs to be submitted.*

*Match* has 6 methods:

* **fillBox** takes an array of fighter cards and returns a div element filled with each card.
* **removeOpponent** takes a fighter to remove and returns a copy of opponentChoices without that fighter.
* **setFighter** takes an ID, finds the fighter with that ID in *fighterChoices*, and returns a copy of that fighter.
* **attack**, **powerUp**, and **counter** all do math on the fighter or opponent's health or power and return the altered health or power.

Next, I set up a new match and add 4 event handlers.

Clicking a `.portrait-container` in the `.fighter-selection-box` sets *myFighter* based on the clicked element and makes the opponent selection section visible.

Clicking a `.fighter-portrait` in the `.opponent-selection-section` sets *myOpponent* based on the clicked element and makes the opponent box and attack button visible.

Clicking the `#attack-button` triggers the **attack**, **powerUp**, and **counter** functions and updates accordingly. Within this section:

1. If *myFighter.health* is zero, the player loses.
1. If *myOpponent.health* is zero, the opponent is removed.
  1. If *opponentChoices* is empty, the player wins.

Clicking the `#reset-button` resets the game.

## TODO:

* Add photo credits
* Add responsive styles
* Look at deep-copies and 0 assignment and see if I can't get rid of 'em
* Update metadata and add favicon
