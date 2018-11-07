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
    
    //This loop adds cards for each fighter in the fighters array:
    for(let i = 0; i < fighters.length; i++) {
        //Copy the hidden, blank template card:
        var $card = $('.blank-fighter-card').clone();
        $card.removeClass('blank-fighter-card hidden');
        //Give each card a custom ID based on the fighter's name:
        $card.attr('id', fighters[i].name.toLowerCase().replace(/\s/, "-") + '-card');
        //Customize the card's content:
        $card.children('.fighter-name').text(fighters[i].name);
        $card.children('.fighter-portrait').attr('src', fighters[i].portrait);
        $card.children('.fighter-health').text(fighters[i].health);
        $card.appendTo(".fight-box");
    }

});