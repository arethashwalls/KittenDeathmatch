$(document).ready(function () {
    //Set up an array containing stats for each possible fighter:
    var fighters = [
        {
            name: 'Deathtoxin Murdertooth',
            portrait: 'assets/images/black.jpg',
            health: 100,
            power: 5,
            counterPower: 10
        },
        {
            name: 'Vlad the Decapitator',
            portrait: 'assets/images/gray.jpg',
            health: 200,
            power: 3,
            counterPower: 12
        },
        {
            name: 'She Who Thirsts For Blood',
            portrait: 'assets/images/orange.jpg',
            health: 250,
            power: 2,
            counterPower: 8
        },
        {
            name: 'Nyarlathotep',
            portrait: 'assets/images/white.jpg',
            health: 90,
            power: 8,
            counterPower: 10
        },
        {
            name: 'Baron Killjoy the Sixth',
            portrait: 'assets/images/tabby.jpg',
            health: 300,
            power: 2,
            counterPower: 5
        },
        {
            name: 'Princess Prettypaws',
            portrait: 'assets/images/tuxedo-tabby.jpg',
            health: 175,
            power: 3,
            counterPower: 7
        }
    ];

    //Loop through fighters to add programmatically generated properties:
    for (let i = 0; i < fighters.length; i++) {
        fighters[i].baseHealth = fighters[i].health;
        fighters[i].basePower = fighters[i].power;
        fighters[i].fighterID = fighters[i].name.toLowerCase().replace(/\s/, "-");
    }

    function hideAll() {
        $('.fighter-selection-section').addClass('hidden');
        $('.fighter-section').addClass('hidden');
        $('.opponent-selection-section').addClass('hidden');
        $('.opponent-section').addClass('hidden');
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

    Match.prototype.attack = function() {
        return (this.myOpponent.health - this.myFighter.power);
    }

    Match.prototype.powerUp = function() {
        return (this.myFighter.power * this.myFighter.basePower);
    }

    Match.prototype.counter = function() {
        return (this.myFighter.health - this.myOpponent.counterPower);
    }

   

    //Set up a new match:
    var match = new Match;
    $('.fighter-selection-box').replaceWith(match.fillBox(match.fighterChoices));

    //The fighter selection stage begins when the player clicks a fighter's portrait:
    $('.fighter-portrait').on('click', function() {
        match.myFighter = match.setFighter($(this).attr('id'));
        match.opponentChoices = match.removeOpponent(match.myFighter);
        $('.fighter-section, .opponent-selection-section').removeClass('hidden');
        $('.fighter-selection-section, button').addClass('hidden');
        $('.fighter-box').replaceWith(match.fillBox([match.myFighter]));
        $('.opponent-selection-box').html(match.fillBox(match.opponentChoices));

    });//End of fighter selection stage

    //Next, the opponent selection stage begins when the player clicks an opponent's portrait:
    $('.opponent-selection-section').on('click', '.fighter-portrait', function() {
        match.myOpponent = match.setFighter($(this).attr('id'));
        $('.opponent-section, button').removeClass('hidden');
        $('.opponent-selection-section').addClass('hidden');
        $('.opponent-box').html(match.fillBox([match.myOpponent]));

    });//End of opponent selection stage

    //Now, the attack button is available:
    $('#attack-button').on('click', function() {
        match.myOpponent.health = match.attack();
        $('.opponent-section').find('.fighter-health').text(match.myOpponent.health);
        match.myFighter.power = match.powerUp();
        match.myFighter.health = match.counter();
        $('.fighter-section').find('.fighter-health').text(match.myFighter.health);
        //If player's fighter's health is 0, display the loss screen:
        if(match.myFighter.health <= 0) {
            hideAll();
            $('.win-loss').removeClass('hidden');
            $('.win-loss-title').text('You lose...');
        //If they still have health and their opponent's health is 0:
        } else if(match.myOpponent.health <= 0) {
            //Remove that opponent from the array of possible opponents:
            match.opponentChoices = match.removeOpponent(match.myOpponent);
            //If there are no opponents remaining, the player wins:
            if(match.opponentChoices.length === 0) {
                hideAll();
                $('.win-loss').removeClass('hidden');
                $('.win-loss-title').text('You win!');
            //If not, they're taken back to the opponent selection stage:
            } else {
                $('.opponent-selection-section').removeClass('hidden');
                $('.opponent-section').addClass('hidden');
                $('.opponent-selection-box').html(match.fillBox(match.opponentChoices));

            }
        }
    });



});