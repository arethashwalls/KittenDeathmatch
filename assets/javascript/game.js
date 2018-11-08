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

    //This loop adds baseHealth and basePower to each fighter based on their starting values:
    for (let i = 0; i < fighters.length; i++) {
        fighters[i].baseHealth = fighters[i].health;
        fighters[i].basePower = fighters[i].power;
        fighters[i].fighterID = fighters[i].name.toLowerCase().replace(/\s/, "-");
    }

    //This loop adds cards for each fighter in the fighters array:
    function setFighterChoices(fighters, box) {
        for (let i = 0; i < fighters.length; i++) {
            //Copy the hidden, blank template card:
            var $card = $('.blank-fighter-card').clone();
            $card.removeClass('blank-fighter-card hidden');
            $card.attr('data-fighter-index', i);
            $card.attr('id', fighters[i].fighterID);
            //Customize the card's content:
            $card.children('.fighter-name').text(fighters[i].name);
            $card.children('.fighter-portrait').attr('src', fighters[i].portrait);
            $card.children('.fighter-health').text(fighters[i].health);
            $card.appendTo(box);
        }
    }



    var fighterPicked = false, opponentPicked = false;
    var myFighter;
    var opponents = fighters;

    setFighterChoices(fighters, $('.fighter-selection-box'));
    $('section').on('click', '.fighter-card', function () {

        if (!fighterPicked) {
            $(this).appendTo('.fighter-box');
            fighterPicked = true;
            myFighter = fighters[$(this).attr('data-fighter-index')];
            opponents.splice($(this).attr('data-fighter-index'), 1);
            setFighterChoices(opponents, $('.opponent-selection-box'));
            $('.fighter-selection-box').addClass('hidden');
            $('.section-title').text('Chose Your Opponent');
            return false;
        } else if (!opponentPicked && $(this).attr('id') !== myFighter.fighterID) {

            $(this).appendTo('.opponent-box');
            opponentPicked = true;
            myOpponent = fighters[$(this).attr('data-fighter-index')];
            $('.fighter-card').each(function () {
                if ($(this).attr('id') !== myFighter.fighterID && $(this).attr('id') !== myOpponent.fighterID) {
                    $(this).addClass('hidden');
                }
            });
            $('.section-title').text('Fight!');
            return false;
        } else if (fighterPicked && opponentPicked) {
            if ($(this).attr('id') === myFighter.fighterID) {
                myOpponent.health -= myFighter.power;
                $('#' + myOpponent.fighterID).children('.fighter-health').text(myOpponent.health);
                myFighter.power *= myFighter.basePower;
                myFighter.health -= myOpponent.counterPower;
                $('#' + myFighter.fighterID).children('.fighter-health').text(myFighter.health);
                
                if (myOpponent.health <= 0) {
                    $('.opponent-box').empty();
                    opponentPicked = false;
                    
                    opponents.splice(opponents.indexOf(myOpponent), 1);

                    $('.section-title').text('Chose Your Opponent');
                    setFighterChoices(opponents, $('.opponent-selection-box'));
                    if (opponents.length === 0) {
                        $('.section-title').text('You won!');
                        window.setTimeout(function () {
                            
                        }, 5000);
                    }
                }
            }


            return false;
        }
    });//End onClick for Fighter and Opponent selection

});