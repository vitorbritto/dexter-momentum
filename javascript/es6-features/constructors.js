class Player {

    constructor(options = {}) {
        this.name    = options.name   || 'no name';
        this.action  = options.action || 'no action';
        this.jump    = options.jump;
        this.going   = options.going;
        this.back    = options.back;
        this.left    = options.left;
        this.right   = options.right;
    }

    jump() {
        this.jump = true;
        return this;
    }
    go() {
        this.going = true;
        return this;
    }
    back() {
        this.back = true;
        return this;
    }
    left() {
        this.left = true;
        return this;
    }
    right() {
        this.right = true;
        return this;
    }

}

class PlayerLookActions extends Player {

    lookBack() {
        return this;
    }
    lookDown() {
        return this;
    }
    lookUp() {
        return this;
    }

}

const vitor = new Player({
    name: 'Vitor Britto',
    jump: true,
    go: true,
    back: false,
    left: false,
    right: false,
});
