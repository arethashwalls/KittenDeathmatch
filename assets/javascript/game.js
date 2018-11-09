$(document).ready(function () {
    //Set up an array containing stats for each possible fighter:
    var fighters = [
        {
            name: 'Fighter 1',
            portrait: 'assets/images/black.jpg',
            health: 100,
            power: 20,
            counterPower: 30
        },
        {
            name: 'Fighter 2',
            portrait: 'assets/images/gray.jpg',
            health: 200,
            power: 15,
            counterPower: 25
        },
        {
            name: 'Fighter 3',
            portrait: 'assets/images/orange.jpg',
            health: 300,
            power: 5,
            counterPower: 15
        },
        {
            name: 'Fighter 4',
            portrait: 'assets/images/white.jpg',
            health: 80,
            power: 30,
            counterPower: 20
        }
    ];

    //Loop through fighters to add programmatically generated properties:
    for (let i = 0; i < fighters.length; i++) {
        fighters[i].baseHealth = fighters[i].health;
        fighters[i].basePower = fighters[i].power;
        fighters[i].fighterID = fighters[i].name.toLowerCase().replace(/\s/, "-");
    }

    //Define the Match object:
    function Match() {
        //Deep copy the fighters array twice, once for fighters, once for opponents:
        this.fighterChoices = $.extend(true, [], fighters);
        this.opponentChoices = $.extend(true, [], fighters);
        this.myFighter = 0;
        this.myOpponent = 0;
    }

    //This function returns a new div filled with each fighter from the array provided:
    Match.prototype.fillBox = function(cardArray) {
        $box = $('<div>');
        for(let i = 0; i < cardArray.length; i++) {
            $card = $('.blank-fighter-card').clone();
            $card.removeClass('blank-fighter-card hidden');
            $card.children('.fighter-portrait').attr('id', cardArray[i].fighterID);
            $card.children('.fighter-name').text(cardArray[i].name);
            $card.children('.fighter-portrait').attr('src', cardArray[i].portrait);
            $card.children('.fighter-health').text(cardArray[i].health);
            $box.append($card);
        }
        return $box;
    }

    Match.prototype.removeOpponent = function(fighter) {
        let newOpponents = $.extend(true, [], this.opponentChoices);
        for(let i = 0; i < newOpponents.length; i++) {
            if(newOpponents[i].fighterID === fighter.fighterID) {
                newOpponents.splice(i, 1);
                return newOpponents;
            }
        }
    }

    Match.prototype.setFighter = function(id) {
        for(let i = 0; i < this.fighterChoices.length; i++) {
            if(this.fighterChoices[i].fighterID === id) {
                return $.extend({}, this.fighterChoices[i]);
            }
        }
    }

    

   

    //Set up a new match:
    var match = new Match;
    $('.fighter-selection-box').replaceWith(match.fillBox(match.fighterChoices));

    //The fighter selection stage begins when the player clicks a fighter's portrait:
    $('.fighter-portrait').on('click', function() {
        match.myFighter = match.setFighter($(this).attr('id'));
        match.opponentChoices = match.removeOpponent(match.myFighter);
        $('.fighter-selection-section').addClass('hidden');
        $('.fighter-section, .opponent-selection-section').removeClass('hidden');
        $('.fighter-box').replaceWith(match.fillBox([match.myFighter]));
        $('.opponent-selection-box').replaceWith(match.fillBox(match.opponentChoices));
    })//End of fighter selection stage

    //Next, the opponent selection stage begins when the player clicks an opponent's portrait:
//$('.opponent-selection-section').find('.fighter-portrait').on('click', function() {
    $('.opponent-selection-section').on('click', '.fighter-portrait', function() {
        console.log('hi');
    })


});