function Potion(name) {
    this.types = ['strength', 'agility', 'health'];
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    if (this.name === 'health') {
        this.value = Math.floor(Math.random() * 10 + 30);
    } else {
        this.value = Math.floor(Math.random() * 5 + 7);
    }
}

function Player(name = '') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
    this.inventory = [new Potion('health'), new Potion()];

    //returns an object with various player properties
    Player.prototype.getStats = function() {
        return {
          potions: this.inventory.length,
          health: this.health,
          strength: this.strength,
          agility: this.agility
        };
    };

    //returns the inventory array or false if the inventory is empty
    Player.prototype.getInventory = function() {
        if (this.inventory.length) {
          return this.inventory;
        } else {
            return false;
        };
    };

    //returns the value of player's health
    Player.prototype.getHealth = function() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    //returns if player is still alive or not
    Player.prototype.isAlive = function() {
        if (this.health === 0) {
            return false;
        } else {
            return true;
        };
    };

    //reduces a certain amount of health, but not going below zero
    Player.prototype.reduceHealth = function(health) {
        this.health -= health;

        if (this.health < 0) {
            this.health = 0;
        }
    };

    //returns the value of player's attack
    Player.prototype.getAttackValue = function () {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max - min) + min);
    };

    //add potion to inventory
    Player.prototype.addPotion = function(potion) {
        this.inventory.push(potion);
    };

    //remove the potion from inventory after use
    Player.prototype.usePotion = function(index) {
        const potion = this.getInventory().splice(index, 1)[0];
      
        switch (potion.name) {
          case 'agility':
            this.agility += potion.value;
            break;
          case 'health':
            this.health += potion.value;
            break;
          case 'strength':
            this.strength += potion.value;
            break;
        }
    };
}

module.exports = Player;