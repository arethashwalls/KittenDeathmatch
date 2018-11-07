$(document).ready(function () {
    //Set up an array containing stats for each possible fighter:
    var fighters = [
        {
            name: 'Fighter 1',
            portrait: 'assets/images/black.jpg',
            health: 100,
            power: 20,
            basePower: 20,
            counterPower: 30
        },
        {
            name: 'Fighter 2',
            portrait: 'assets/images/gray.jpg',
            health: 200,
            power: 15,
            basePower: 15,
            counterPower: 25
        },
        {
            name: 'Fighter 3',
            portrait: 'assets/images/orange.jpg',
            health: 300,
            power: 5,
            basePower: 5,
            counterPower: 15
        },
        {
            name: 'Fighter 4',
            portrait: 'assets/images/white.jpg',
            health: 80,
            power: 30,
            basePower: 30,
            counterPower: 20
        }
    ];

    //This loop adds cards for each fighter in the fighters array:
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

    var fighterPicked = false;
    var opponentPicked = false;
    var myFighterID = '';
    var myOpponentId = '';
    var myFighter;
    var myOpponent;

    $('.fighter-card').unbind('click').click(function () {
        if (!fighterPicked) {
            $(this).appendTo('.fighter-box');
            fighterPicked = true;
            myFighterID = $(this).attr('id');
            myFighter = fighters[$(this).attr('data-fighter-index')];
            $('.fighter-card').each(function () {
                if ($(this).attr('id') !== myFighterID) {
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
        } else if(fighterPicked && opponentPicked) {
           if($(this).attr('id') === myFighterID) {
                myOpponent.health -= myFighter.power;
                $('#' + myOpponentId).children('.fighter-health').text(myOpponent.health);
                myFighter.power *= myFighter.basePower;
                myFighter.health -= myOpponent.counterPower;
                $('#' + myFighterID).children('.fighter-health').text(myFighter.health);
           }
           
           return false;
        }
    });//End onClick for Fighter and Opponent selection
    
});