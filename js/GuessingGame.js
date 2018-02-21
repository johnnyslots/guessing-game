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
	this.playersGuess = num;

	return this.checkGuess();
}

Game.prototype.checkGuess = function() {
	if(this.playersGuess === this.winningNumber) {
		this.pastGuesses.push(this.playersGuess);
		return 'You Win!';
	}
	else  {
		if(this.pastGuesses.indexOf(this.playersGuess) !== -1) {
			return 'You\'ve already guessed that number.';	
		}
		else if(this.playersGuess < 1 || this.playersGuess > 100) {
			return 'Invalid guess';
		}
		else {
			this.pastGuesses.push(this.playersGuess);
			
			if(this.pastGuesses.length === 5) {
				return 'You Lose';
			}
			else if(this.difference() < 10) {
				return "You're burning up!";
			}
			else if(this.difference() < 25) {
				return "You're lukewarm...";
			}
			else if(this.difference() < 50) {
				return "You're a bit chilly....";
			}
			else if(this.difference() < 100) {
				return "You're ice cold!";
			}
		}		
	}	
}

Game.prototype.provideHint = function() {
	var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	
	return shuffle(hintArray);
}

function newGame() {
	return new Game();
}

function submitGuess(game) {
	var input = +$('#player-input').val();
	$('#player-input').val('');
	var output = game.playersGuessSubmission(input);
	$('h1').text(output);

	if(output === 'Invalid guess') {
		$('h3').text('Guess a number between 1-100');
	}

	else {
		if(input < game.winningNumber) {
			$('h3').text('...guess higher');
		}
		else {
			$('h3').text('...guess lower');	
		}

		if(output === 'You Win!' || output === 'You Lose') {	
			$('h3').text('The winning number was ' + game.winningNumber + '. Press the Reset button to play again!');
			$('#submit, #hint, #player-input').attr("disabled", true);
		}

		if(output !== 'You\'ve already guessed that number.') {
			$('#guess-list li:nth-child('+game.pastGuesses.length+')').text(input);	
		}		

		
	}
}

$(document).ready(function() {
	var game = newGame();

	$('#submit').on('click', function() {
		submitGuess(game);

	})		

	$('#player-input').on('keyup', function(event) {
		if(event.keyCode === 13) {
			submitGuess(game);						
		}
	});

	$('#hint').on('click', function() {
		$('h1').text('The Guessing Game!');
		$('h3').text('The winning number is one of the following: ' + game.provideHint().join(', '))
	})

	$('#reset').on('click', function() {
		game = newGame();
		$('h1').text('The Guessing Game!');
		$('h3').text('Guess a number between 1-100');
		$('.guess').text('-');
		$('#player-input').val('');
		$('#submit, #hint, #player-input').attr("disabled", false);
	})
})


