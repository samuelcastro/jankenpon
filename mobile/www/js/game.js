/**
 * Created by Samuel Castro on 7/2/14.
 */

function playGame(playerOption){
    $.ajax({
        type: 'POST',
        data: {"playerName" : window.localStorage.getItem('userName'), "playerOption" : playerOption},
        url: 'http://192.168.0.100:3000/save',
        success: function(data) {
            var options = {
                0: 'Stone',
                1: 'Paper',
                2: 'Scissors'
            };
            alert(data.winner == 'none' ? 'Ops! Nobody won, try again.' :
                    data.winner == 'player' ? 'Uhuuuu You Won ! :) I chose '
                        + options[data.serverOption] + ' :\'(' : 'I choose '+ options[data.serverOption] + ' and I won, sorry. :) ');
        },
        error: function() {
            console.log(data);
            alert('Sorry, an error occured while sending request');
        }
    });
}



