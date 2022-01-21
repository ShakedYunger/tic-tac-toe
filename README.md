# tic-tac-toe

tic tac toe game

creating the board and printing it, then created gPlayers, it contain the sign of the player and the name of the player.
at whoIsStarting i determine who is starting by random number and return the number to use it later.
Then i create the onChangeMark function that take all the <tr> tags and add them onclick, in the onclick i use the function return sign that give me the mark of the player who plays.
After the onclick i check if the player is winning by check every row column and diagonal.

I need the fix the on click so i can not change a cell that already changed and the second thing I need to fix is the game stop when player win.
