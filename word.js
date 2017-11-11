var Letter = require('./letter.js');

var Word = function(chosenWord) {
    this.trysLeft = 10;
    this.chosenWord = chosenWord;
    this.letters = [];
    this.guesses = [];
    for (var i = 0; i < this.chosenWord.length; i++) {
        this.letters.push(new Letter.Letter(this.chosenWord[i]));
    }
};

Word.prototype.checkLetter = function(letter) {
    this.notCorrect = true;
    this.isLetterValid = false;
    var letter = letter.toLowerCase();
    if (this.guesses.indexOf(letter) != -1) {
        this.isLetterValid = true;
    } else {
        this.guesses.push(letter);
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i].letter.toLowerCase() == letter) {
                this.notCorrect = false;
                this.letters[i].show = true;
            }
        }
        if (this.notCorrect) {
            this.trysLeft--;
        }
    }
};


Word.prototype.isComplete = function() {
    for (var i = 0; i < this.letters.length; i++) {
        if (!this.letters[i].show) {
            return false;;
        }
    }
    return true;
};


Word.prototype.print = function() {
    var output = "";
    for (var i = 0; i < this.letters.length; i++) {
        output += this.letters[i].printLetra();
    }
    return output;
};


module.exports = {
    Word
};