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

    function fillBox(cards, box) {
        for (let i = 0; i < cards.length; i++) {
            var $card = $('.blank-fighter-card').clone();
            $card.removeClass('blank-fighter-card hidden');
            $card.attr('data-fighter-index', i);
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
        this.myFighter = this.allFighters[card.attr('data-fighter-index')];
        this.allOpponents.splice(this.allOpponents.indexOf(this.myFighter), 1);
        $('.fighter-box').append(card);
    }

    Match.prototype.setMyOpponent = function (card) {
        this.myOpponent = this.allFighters[card.attr('data-fighter-index')];
        this.allOpponents.splice(this.allOpponents.indexOf(this.myOpponent), 1);
        $('.opponent-box').append(card);
    }

    Match.prototype.fight = function() {
        this.myOpponent.health -= this.myFighter.power;
        this.myFighter.power *= this.myFighter.basePower;
        this.myFighter.health -= this.myOpponent.counterPower;
        $('#' + this.myOpponent.fighterID).children('.fighter-health').text(this.myOpponent.health);
        $('#' + this.myFighter.fighterID).children('.fighter-health').text(this.myFighter.health);
    }
    Match.prototype.lose = function() {
        $('.fighter-selection-box, .fighter-box, .opponent-selection-box, .opponent-box').empty();
        $('.win-loss-title').text('You lose...');
    }

    var match = new Match;

    match.setFighters();

    $('section').on('click', '.fighter-card', function () {
        if (match.myFighter === 0 && match.myOpponent === 0) {
            match.setMyFighter($(this));
            match.setOpponents();
            $('.fighter-selection-box').empty();
        } else if (match.myOpponent === 0) {
            match.setMyOpponent($(this));
            $('.opponent-selection-box').empty();
        } else {
            match.fight();
            if(match.myFighter.health <= 0) {
                match.lose();
                window.setTimeout(function () {
                    match = new Match;
                    console.log(fighters)
                    console.log(match);
                    match.setFighters();
                }, 3000);
            }
        }
    });

});