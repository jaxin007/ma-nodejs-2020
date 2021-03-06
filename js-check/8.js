class Planet {
    constructor(title, diameter) {
        this.title = title;
        this.diameter = diameter;
    }
    
    get volume () {
        return (4/3) * Math.PI * (this.diameter/2)**3;
    }

    toString () {
        return `Planet ${this.title} has volume ${this.volume}`;
    }
}

class Earth extends Planet {
    constructor(diameter) {
        super('Earth', diameter);
    }
}

const mars = new Planet ('Mars', 6779);
console.log (mars);
console.log (mars + '');

const earth = new Earth(12742);
console.log(earth);