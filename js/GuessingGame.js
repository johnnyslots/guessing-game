function generateWinningNumber() {
	return Math.floor(Math.random() * 100 + 1);
}

function shuffle(arr) {
	var m = arr.length, t, i;

	while (m) {
		i = Math.floor(Math.random() * m--);
		t = arr[m];
		arr[m] = arr[i];
		arr[i] = t;
	}

	return arr; 
}

function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(num) {
	if(num < 1 || num > 100 || typeof num !== 'number') {
		throw 'That is an invalid guess.';
	}
	
	this.playersGuess = num;

	return this.checkGuess();
}

Game.prototype.checkGuess = function() {
	if(this.playersGuess === this.winningNumber) {
		return 'You Win!';
	}
	else  {
		if(this.pastGuesses.indexOf(this.playersGuess) !== -1) {
			return 'You have already guessed that number.';	
		}
		else {
			this.pastGuesses.push(this.playersGuess);
			
			if(this.pastGuesses.length === 5) {
				return 'You Lose.';
			}
			else if(this.difference() < 10) {
				return "You're burning up!";
			}
			else if(this.difference() < 25) {
				return "You're lukewarm.";
			}
			else if(this.difference() < 50) {
				return "You're a bit chilly.";
			}
			else if(this.difference() < 100) {
				return "You're ice cold!";
			}
		}		
	}	
}

function newGame() {
	return new Game();
}

Game.prototype.provideHint = function() {
	var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	
	return shuffle(hintArray);
}



$(document).ready(function() {
	var game = new Game();
	$('#submit').on('click', function() {
		var playerInput = $(this).closest('#input-parent').find('#player-input'); 
		var input = +playerInput.val();
		playerInput.val('');
		game.playersGuessSubmission(input);
	})
})


