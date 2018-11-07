$(document).ready(function () {
    //Set up an array containing stats for each possible fighter:
    var fighters = [
        {
            name: 'Fighter 1',
            portrait: 'assets/images/black.jpg',
            health: 100,
            baseHealth: 100,
            power: 20,
            basePower: 20,
            counterPower: 30
        },
        {
            name: 'Fighter 2',
            portrait: 'assets/images/gray.jpg',
            health: 200,
            baseHealth: 200,
            power: 15,
            basePower: 15,
            counterPower: 25
        },
        {
            name: 'Fighter 3',
            portrait: 'assets/images/orange.jpg',
            health: 300,
            baseHealth: 300,
            power: 5,
            basePower: 5,
            counterPower: 15
        },
        {
            name: 'Fighter 4',
            portrait: 'assets/images/white.jpg',
            health: 80,
            baseHealth: 80,
            power: 30,
            basePower: 30,
            counterPower: 20
        }
    ];

    //This loop adds cards for each fighter in the fighters array:
    function setFighterChoices(fighters) {
        console.log('hi')
        for (let i = 0; i < fighters.length; i++) {
            //Copy the hidden, blank template card:
            var $card = $('.blank-fighter-card').clone();
            $card.removeClass('blank-fighter-card hidden');
            //Give each card a custom ID based on the fighter's name:
            $card.attr('id', fighters[i].name.toLowerCase().replace(/\s/, "-") + '-card');
            $card.attr('data-fighter-index', i);
            //Customize the card's content:
            $card.children('.fighter-name').text(fighters[i].name);
            $card.children('.fighter-portrait').attr('src', fighters[i].portrait);
            $card.children('.fighter-health').text(fighters[i].health);
            $card.appendTo('.fighter-selection-box');
        }
    }

    var fighterPicked = false;
    var opponentPicked = false;
    var myFighterID = '';
    var myOpponentId = '';
    var myFighter;
    var myOpponent;

    setFighterChoices(fighters);
    $('section').on('click', '.fighter-card', function () {
        
        if (!fighterPicked) {
            $(this).appendTo('.fighter-box');
            fighterPicked = true;
            myFighterID = $(this).attr('id');
            myFighter = fighters[$(this).attr('data-fighter-index')];
            $('.fighter-card').each(function () {
                if ($(this).attr('id') !== myFighterID && !$(this).hasClass('blank-fighter-card')) {
                    $(this).appendTo('.opponent-selection-box');
                }
            });
            $('.section-title').text('Chose Your Opponent');
            return false;
        } else if (!opponentPicked) {
            $(this).appendTo('.opponent-box');
            opponentPicked = true;
            myOpponentId = $(this).attr('id');
            myOpponent = fighters[$(this).attr('data-fighter-index')];
            $('.fighter-card').each(function () {
                if ($(this).attr('id') !== myFighterID && $(this).attr('id') !== myOpponentId) {
                    $(this).addClass('hidden');
                }
            });
            $('.section-title').text('Fight!');
            return false;
        } else if (fighterPicked && opponentPicked) {
            if ($(this).attr('id') === myFighterID) {
                myOpponent.health -= myFighter.power;
                $('#' + myOpponentId).children('.fighter-health').text(myOpponent.health);
                myFighter.power *= myFighter.basePower;
                myFighter.health -= myOpponent.counterPower;
                $('#' + myFighterID).children('.fighter-health').text(myFighter.health);
            }
            if (myOpponent.health <= 0) {
                setFighterChoices(fighters);
                $('.fighter-box').empty();
                $('.opponent-selection-box').empty();
                $('.opponent-box').empty();
                fighterPicked = false;
                opponentPicked = false;
                myFighter.health = myFighter.baseHealth;
                myFighter.power = myFighter.basePower;
                myOpponent.health = myOpponent.baseHealth;
                
            }

            return false;
        }
    });//End onClick for Fighter and Opponent selection

});