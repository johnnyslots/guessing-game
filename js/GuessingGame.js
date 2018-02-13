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
			return 'You\'ve already guessed that number.';	
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

	$('#guess-list li:nth-child('+game.pastGuesses.length+')').text(input);

	if(input < game.winningNumber) {
		$('h3').text('guess higher');
	}
	else {
		$('h3').text('guess lower');	
	}

	if(output === 'You Win!' || output === 'You Lose') {	
		$('h3').text('The winning number was ' + game.winningNumber + '. Press the Reset button to play again!');
		$('#submit, #hint, #player-input').attr("disabled", true);
	}


	console.log(game);
}


$(document).ready(function() {
	var game = newGame();

	console.log(game.provideHint().join(', '))

	$('#submit').on('click', function() {
		submitGuess(game);
	})		

	$('#player-input').on('keyup', function(event) {
		if(event.keyCode === 13) {
			submitGuess(game);						
		}
	});

	$('#hint').on('click', function() {
		$('h1').text('The Guessing Game');
		$('h3').text('The winning number is one of the following: ' + game.provideHint().join(', '))
	})

	$('#reset').on('click', function() {
		game = newGame();
		$('h1').text('The Guessing Game');
		$('h3').text('Guess a number between 1-100');
		$('.guess').text('-');
		$('#player-input').val('');
		$('#submit, #hint, #player-input').attr("disabled", false);
	})
})


// display message if number is invalid
// clear input if number is typed and not entered before resetting

