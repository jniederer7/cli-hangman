
Letter.prototype.printLetra = function() {
    if (this.show) {
        return this.letter;
    } else {
        return '-';
    }
};


function Letter(letter) {
    this.letter = letter;
    if (this.letter == ' ') {
        this.show = true;
    } else {
        this.show = false;
    }
}




module.exports = {
    Letter
};