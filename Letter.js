// The Letter constructor is responsible for displaying either an underscore or the underlying character for each letter in the word

function Letter(char) {
    // If a character is not a number or a letter, make it visible right away
    this.visible = !/[a-z1-9]/i.test(char);
    console.log(this.visible);
    // Save the underlying character
    this.char = char;
  }

  console.log("/n " + "This is line 11 " + "/n " + Letter);
  
  // prototypes are optional
  
  // Returns either an underscore or the underlying character depending on `this.visible`
  //    because we call this function toString, when we call `this.letters.join` in
  //    Word.js, JavaScript automatically uses the value we return here
  
  
  
  // Accepts a user’s guess
  
  
    // Otherwise return false
  
  
  module.exports = Letter;