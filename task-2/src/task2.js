class Planet {
  constructor(title, diameter) {
    this.title = title;
    this.diameter = diameter;
  }

  get volume() {
    return (4 / 3) * Math.PI * (this.diameter / 2) ** 3;
  }

  toString() {
    return `Planet ${this.title} has volume ${this.volume}`;
  }
}

const earth = new Planet("Earth", 12742);

module.exports = earth;
