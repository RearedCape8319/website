/**
* Class structure for a spot
* - Will have types of spot as static attributes
* - Each spot can be safe, a goal, lava, soap, electric, water, or orange
**/
class Spot {
  // Constructor function to make a new spot
  constructor(walk, electric, water, soap, orange, goal) {
    this.walkable = walk;
    this.electrified = electric;
    this.conductive = water;
    this.slippy = soap;
    this.flavoured = orange;
    this.end = goal;
    this.colour = color(0);
  }
}



/**
* Class structures for each of the spot types
**/
class Pink extends Spot {
  /* Simply create a pink safe spot */
  constructor() {
    super(true, false, false, false, false, false);
    this.colour = color(251, 138, 202)
  }
}

class Green extends Spot {
  /* Create a green safe spot */
  constructor() {
    super(true, false, false, false, false, false);
    this.colour = color(131, 214, 144);
  }
}

class Goal extends Spot {
  /* Create the goal */
  constructor() {
    super(true, false, false, false, false, true);
    this.colour = color(128);
  }
}

class Lava extends Spot {
  /* Create the red lava spot */
  constructor() {
    super(false, false, false, false, false, false);
    this.colour = color(239, 89, 90);
  }
}

class Soap extends Spot {
  /* Create the slippery spot */
  constructor() {
    super(true, false, false, true, false, false);
    this.colour = color(163, 108, 212);
  }
}

class Electric extends Spot {
  /* Create the electric spot */
  constructor() {
    super(false, true, false, false, false, false);
    this.colour = color(240, 235, 91);
  }
}

class Water extends Spot {
  /* Create the water spot */
  constructor() {
    super(true, false, true, false, false, false);
    this.colour = color(91, 135, 240);
  }
  /* Method to electrify water, to be used when next to electricity */
  electrify() {
    this.electrified = true;
  }
}

class Orange extends Spot {
  /* Create the orange spot */
  constructor() {
    super(true, false, false, false, true, false);
    this.colour = color(234, 132, 31);
  }
}
