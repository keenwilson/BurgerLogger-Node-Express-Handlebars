function BurgerEmoji() {
    this.emoji = '🍔';
    this.burgerlog = function() {
        console.log.bind(console, '🍔')
    }
}

//Export the Pizza emoji so that we can use it in game.js
module.exports = BurgerEmoji;
