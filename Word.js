var Letter = require("./Letter");

// The Word constructor is responsible for creating an array of Letter objects and determining if the user guessed every Letter correctly
function Word(word) {
    // word.split - splits word into array of letters
     //     .map new `Letter` for each character and return an array
    //    referred to with the instance variable, `letters`
      this.letters = word.split("").map(function(char){
          return new Letter(char);
      }

    // prototypes will take up less memory than if I defined
    //   each method in the constructor as an instance method

    // setting the method on the prototype means all instances of Word share this code
    //    but when it is called, `this` refers to that particular instance


    // setting `toString()` as a method lets us concatenate it like we would a string!

    Word.prototype.guessLetter = function (char) {
        // Checks to see if any of the letters in the array match the user’s guess and updates `foundLetter`
        var foundLetter = false;
        this.letters.forEach(function (letter) {
            if (letter.guess(char)) {
                foundLetter = true;
            }
        });

        // Print the word guessed so far--because we set the method for toString,
        //  JavaScript will automatically concatenate this even if we don’t call toString
        console.log("\n" + this + "\n");
        // return whether we found a letter
        return foundLetter;
    };

    // Returns true if all letters in the word have been guessed
    Word.prototype.guessedCorrectly = function () {
        // The `every` method returns true if the callback function returns true for every element in the array
        return this.letters.every(function (letter) {
            return letter.visible;
        });
    };
}

module.exports = Word;
