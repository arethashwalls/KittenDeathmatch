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

    Match.prototype.fillBox = function(cardArray) {
        $box = $('<div>');
        for(let i = 0; i < cardArray.length; i++) {
            $card = $('.blank-fighter-card').clone();
            $card.removeClass('blank-fighter-card hidden');
            $card.attr('id', cardArray[i].fighterID);
            $card.children('.fighter-name').text(cardArray[i].name);
            $card.children('.fighter-portrait').attr('src', cardArray[i].portrait);
            $card.children('.fighter-health').text(cardArray[i].health);
            $box.append($card);
        }
        return $box;
    }

    var match = new Match;
    $('.fighter-selection-box').replaceWith(match.fillBox(match.fighterChoices));



});