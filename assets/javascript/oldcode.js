

    function findMatchingIndex(id, copy) {
        
        for (let i = 0; i < copy.length; i++) {
            if (copy[i].fighterID === id) return i;
        }
        return false;
    }

    function fillBox(cards, box) {
        for (let i = 0; i < cards.length; i++) {
            var $card = $('.blank-fighter-card').clone();
            $card.removeClass('blank-fighter-card hidden');
            //$card.attr('data-fighter-index', i);
            $card.attr('id', cards[i].fighterID);
            //Customize the card's content:
            $card.children('.fighter-name').text(cards[i].name);
            $card.children('.fighter-portrait').attr('src', cards[i].portrait);
            $card.children('.fighter-health').text(cards[i].health);
            $card.appendTo(box);
        }
    }

    //This loop adds baseHealth and basePower to each fighter based on their starting values:
    for (let i = 0; i < fighters.length; i++) {
        fighters[i].baseHealth = fighters[i].health;
        fighters[i].basePower = fighters[i].power;
        fighters[i].fighterID = fighters[i].name.toLowerCase().replace(/\s/, "-");
    }

    function Match() {
        this.myFighter = 0;
        this.myOpponent = 0;
        this.allFighters = $.extend(true, [], fighters);
        this.allOpponents = $.extend(true, [], fighters);
    }

    Match.prototype.setFighters = function () {
        $('.section-title').text('Chose Your Fighter!');
        fillBox(this.allFighters, $('.fighter-selection-box'));

    }

    Match.prototype.setOpponents = function () {
        
        $('.section-title').text('Chose Your Opponent!');
        fillBox(this.allOpponents, $('.opponent-selection-box'));
    }

    Match.prototype.setMyFighter = function (card) {
        
        this.myFighter = this.allFighters[findMatchingIndex(card.attr('id'), this.allFighters)];
        
        this.allOpponents.splice(findMatchingIndex(this.myFighter.fighterID, this.allOpponents), 1);
        $('.fighter-box').append(card);
    }

    Match.prototype.setMyOpponent = function (card) {
        
        this.myOpponent = this.allFighters[findMatchingIndex(card.attr('id'), this.allFighters)];
        console.log(this.myOpponent);
        this.allOpponents.splice(findMatchingIndex(this.myOpponent.fighterID, this.allOpponents), 1);
        console.log(this.allOpponents);
        $('.opponent-box').append(card);
    }

    Match.prototype.fight = function () {
        $('.section-title').text('Fighting!')
        this.myOpponent.health -= this.myFighter.power;
        this.myFighter.power *= this.myFighter.basePower;
        this.myFighter.health -= this.myOpponent.counterPower;

        $('#' + this.myOpponent.fighterID).children('.fighter-health').text(this.myOpponent.health);
        $('#' + this.myFighter.fighterID).children('.fighter-health').text(this.myFighter.health);
  
    }
    Match.prototype.lose = function () {
        $('.fighter-selection-box, .fighter-box, .opponent-selection-box, .opponent-box').empty();
        $('.win-loss-title').text('You lose...');
    }

    Match.prototype.win = function () {
        $('.fighter-selection-box, .fighter-box, .opponent-selection-box, .opponent-box').empty();
        $('.win-loss-title').text('You win!');
    }

    Match.prototype.removeOpponent = function () {

        this.allOpponents.splice(findMatchingIndex(this.myOpponent, this.allOpponents), 1);
        this.myOpponent = 0;
    }

    var match = new Match;

    match.setFighters();

    $('section').on('click', '.fighter-card', function () {
        if (match.myFighter === 0 && match.myOpponent === 0) {

            match.setMyFighter($(this));
            match.setOpponents();
            $('.fighter-selection-box').empty();
            return false;
        } else if (match.myOpponent === 0 && $(this).attr('id') !== match.myFighter.fighterID) {


            match.setMyOpponent($(this));
  
            $('.opponent-selection-box').empty();
            return false;
        } else {
            if ($(this).attr('id') === match.myFighter.fighterID) {
                
                if (match.myFighter.health <= 0) {
                    match.lose();
                    window.setTimeout(function () {
                        $('.win-loss-title').empty();
                        match = new Match;
                        match.setFighters();
                    }, 3000);
                } else if (match.myOpponent.health <= 0) {
                    
                    match.removeOpponent();
                    $('.opponent-box').empty();
                    match.setOpponents();
                } else if (match.allOpponents.length === 0) {

                } else {
                    match.fight();
                    
                }
                return false;
            }
        }
    });

});



/////////////////////////////////////////

    // var fighterPicked = false, opponentPicked = false;
    // var myFighter;
    // var opponents = fighters.slice();

   /// function 

    //This loop adds cards for each fighter in the fighters array:
    // function setFighterChoices(array, box) {
    //     for (let i = 0; i < array.length; i++) {
    //         //Copy the hidden, blank template card:
    //         var $card = $('.blank-fighter-card').clone();
    //         $card.removeClass('blank-fighter-card hidden');
    //         $card.attr('data-fighter-index', i);
    //         $card.attr('id', array[i].fighterID);
    //         //Customize the card's content:
    //         $card.children('.fighter-name').text(array[i].name);
    //         $card.children('.fighter-portrait').attr('src', array[i].portrait);
    //         $card.children('.fighter-health').text(array[i].health);
    //         $card.appendTo(box);

    //     }
    // }

    // function fight(a, b) {
    //     b.health -= a.power;
    //     a.power *= a.basePower;
    //     a.health -= b.counterPower;
    // }

    

//     setFighterChoices(fighters, $('.fighter-selection-box'));
//     $('section').on('click', '.fighter-card', function () {

//         if (!fighterPicked) {
//             $(this).appendTo('.fighter-box');
//             fighterPicked = true;
//             myFighter = fighters[$(this).attr('data-fighter-index')];
//             opponents.splice($(this).attr('data-fighter-index'), 1);
//             setFighterChoices(opponents, $('.opponent-selection-box'));
//             $('.fighter-selection-box').empty();
//             $('.section-title').text('Chose Your Opponent');
//             return false;
//         } else if (!opponentPicked && $(this).attr('id') !== myFighter.fighterID) {
//             console.log('hi')
//             $(this).appendTo('.opponent-box');
//             opponentPicked = true;
//             myOpponent = fighters[$(this).attr('data-fighter-index')];

//             $('.opponent-selection-box').empty();
//             $('.section-title').text('Fight!');
//             return false;
//         } else if (fighterPicked && opponentPicked) {
            
//             if ($(this).attr('id') === myFighter.fighterID) {
//                 fight(myFighter, myOpponent);
//                 $('#' + myOpponent.fighterID).children('.fighter-health').text(myOpponent.health);
//                 $('#' + myFighter.fighterID).children('.fighter-health').text(myFighter.health);
                
//                 if (myOpponent.health <= 0) {
//                     $('.opponent-box').empty();
//                     opponentPicked = false;
//                     console.log('also hi');
//                     opponents.splice(opponents.indexOf(myOpponent), 1);
//                     $('.opponent-selection-box').removeClass('hidden');
//                     $('.section-title').text('Chose Your Opponent');
//                     console.log(opponents);
//                     setFighterChoices(opponents, $('.opponent-selection-box'));

//                     if (opponents.length === 0) {
//                         $('.section-title').text('You won!');
//                         window.setTimeout(function () {
//                             setFighterChoices(fighters, $('.fighter-selection-box'));
//                             opponents = fighters.slice();
//                             fighterPicked = false;
//                             opponentPicked = false;
//                             $('.fighter-selection-box').removeClass('hidden');
//                             $('.fighter-box').empty();
//                             $('.opponent-selection-box').empty();
//                             $('.section-title').text('Chose Your Fighter');
//                         }, 3000);
//                     }
//                 }
//             }


//             return false;
//         }
//     });//End onClick for Fighter and Opponent selection

// });