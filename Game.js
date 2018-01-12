var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./Word");
var words = require("./words");
var letterNumber;

// The Game constructor is responsible for keeping score and controlling the flow of the overall game

function Game() {
    // Save a reference for `this` in `self` as `this` will change inside of inquirer
    var self = this;

    // Sets the guesses to 10 and gets the next word
    this.play = function () {

        this.guessesLeft = 10;
        this.nextWord();
    };

    // Creates a new Word object using a random word from the array, asks the user for their guess
    this.nextWord = function () {
        var randomWord = words[Math.floor(Math.random() * words.length)];
        console.log(randomWord);
        this.currentWord = new Word(randomWord);
        console.log("/n" + this.currentWord + "/n");
        this.makeGuess();
    }

    // Uses inquirer to prompt the user for their guess
    this.makeGuess = function () {
        this.getLetter().then(function () {
            // If the user has no guesses remaining after this guess, show them the word, ask if they want to play again
            if (self.guessesLeft < 1) {
                console.log("Wrong! Game Over! " + "The correct answer was " + self.currentWord.solution() + "/n");
                self.promptNextGame();
            } else if (self.currentWord.guessedCorrectly()) {
                console.log("Wow you are superrr Artsy!!! Time for your next word!");
                // If the user guessed all letters of the current word corrently, reset guessesLeft to 10 and get the next word
                self.guessesLeft = 10;
                self.nextWord();
            }
            else {
                // Otherwise prompt the user to guess the next letter
                self.makeGuess();
            }
        });
    };

    // Asks the user if they want to play again after running out of guessesLeft
    this.promptNextGame = function () {
        inquirer
            .prompt([
                {
                    type: "confirm",
                    name: "choice",
                    message: "Play Again?"
                }
            ])
            .then(function (val) {
                // If the user says yes to another game, play again, otherwise quit the game
                if (val.choice) {
                    self.play();
                }
                else {
                    self.gameOver();
                }
            });
    };

    // Prompts the user for a letter
    this.getLetter = function () {
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "choice",
                    message: "Guess a letter!",
                    validate: function (val) {
                        // The users guess must be a number or letter
                        // regex [a-z1-9] will allow only A-Z, a-z, 0-9
                        // The "i" flag indicates that case should be ignored while attempting a match in a string
                        // function that makes user enter letter or number
                        letterNumber = /^[a-z1-9]/i.test(val);
                        return letterNumber;
                    }
                }
            ])
            .then(function (val) {
                // If the user's guess is in the current word, log that they chose correctly
                var didGuessCorrectly = self.currentWord.guessLetter(val.choice);
                if (didGuessCorrectly) {
                    console.log(chalk.green("\nCORRECT!!!\n"));

                    // Otherwise decrement `guessesLeft`, and let the user know how many guesses they have left
                }
                else {
                    self.guessesLeft--;
                    console.log(chalk.red("\nINCORRECT!!!\n"));
                    console.log(self.guessesLeft + " guesses remaining!!!\n");
                }
            });
    };

    // Logs goodbye and exits the node app
    this.gameOver = function () {
        console.log("\nGoodbye!");
        process.exit(0);
    };
}

module.exports = Game;
