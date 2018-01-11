// The Letter constructor is responsible for displaying either an underscore or the underlying character for each letter in the word
var options = "_";

function Letter(char) {
  // If a character is not a number or a letter, make it visibl right away
  // // The value of ignoreCase is a Boolean and true if the "i" flag was used; 
  // otherwise, false. The "i" flag indicates that case should be ignored while attempting a match in a string.
  // regex [a-z1-9] will allow only A-Z, a-z, 0-9
  // attempting a match in a string.
  this.magic = !/[a-z1-9]/i.test(char);
  // Save the underlying character
  this.char = char;
}
// Returns either an underscore or the underlying character depending on `this.magic`
//    because we call this function toString, when we call `this.letters.join` in
//    Word.js, JavaScript automatically uses the value we return here
Letter.prototype.toString = function () {
  if (this.magic === true) {
    return this.char;
  }
  return options;
};

Letter.prototype.solution = function () {
  return this.char;
};

// Accepts a user’s guess
Letter.prototype.guess = function (charGuess) {
  if (charGuess.toLowerCase() === this.char.toLowerCase()) {
    this.magic = true;
    return this.magic
  }

  return false

}


// Otherwise return false


module.exports = Letter;