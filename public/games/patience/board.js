/**
* Class structure for a board
* - Created with a size
* - Player is in center-left of the board
* - Has a grid of spots
**/
class Board {

  /* Constructor function for creating a board of random squares */
  constructor(rows, columns) {
    let possible = false;
    let attempts = 1;
    while (!possible) {
      this.generate(rows, columns);
      possible = this.solve();
      attempts++;
    }
  }


  /* Method to generate the board */
  generate(rows, columns) {
    this.grid = [];
    for (let r = 1; r <= rows; r++) {
      let row = [];
      for (let c = 1; c <= columns; c++) {
        row.push(null);
      }
      this.grid.push(row);
    }
    let midY = floor((rows-1) / 2);
    this.grid[midY][0] = new Pink();
    this.grid[midY][columns-1] = new Goal();
    this.r = rows;
    this.c = columns;
    this.spotSize = min(0.8*width/columns, 0.8*height/rows);
    this.playerPos = createVector(0, midY);
    this.playerOrange = false;
    this.generatePath();
    this.originalPath = [];
    for (let r of this.grid) {
      this.originalPath.push([...r]);
    }
    this.fillIn();
    this.zap();
  }


  /* Method to show the board to the screen */
  show() {
    rectMode(CORNER);
    stroke(0);
    strokeWeight(1);
    // noStroke();
    let offset = createVector((width - this.c*this.spotSize) / 2, (height - this.r*this.spotSize) / 2);
    for (let r = 0; r < this.r; r++) {
      for (let c = 0; c < this.c; c++) {
        fill(this.grid[r][c].colour);
        rect(offset.x + c*this.spotSize, offset.y + r*this.spotSize, this.spotSize, this.spotSize);
        // if (this.originalPath[r][c] != null) {
        //   noFill();
        //   ellipse(offset.x + (c+0.5)*this.spotSize, offset.y + (r+0.5)*this.spotSize, this.spotSize*0.6, this.spotSize*0.6);
        // }
      }
    }
    ellipseMode(CENTER);
    let pos = offset.copy();
    pos.add((this.playerPos.x+0.5) * this.spotSize, (this.playerPos.y+0.5) * this.spotSize)
    if (this.playerOrange) {
      fill(158, 108, 88);
    } else {
      fill(88, 88, 255);
    }
    ellipse(pos.x, pos.y, this.spotSize*0.7, this.spotSize*0.7);

    if (false) {
      stroke(255, 120);
      strokeWeight(5);
      line(0, 0, width, height);
      line(0, height, width, 0);
    }
  }


  /* Method to generate the starting path */
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ THIS NEEDS MODIFYING
  generatePath() {
    let current = this.playerPos.copy();
    let stack = [];
    let orange = false;
    let done = false;
    while (!done) {
      let possible = this.getNearby(current.copy(), stack, false);
      if (possible.length > 0) {
        let choice = random(possible);
        if (this.grid[choice.y][choice.x] instanceof Goal) {
          done = true;
        } else {
          stack.push(current.copy());
          let prev = this.grid[current.y][current.x];
          let spot = giveSpot(prev, orange, false);
          if (spot instanceof Orange) {
            orange = true;
          } else if (spot instanceof Soap) {
            orange = false;
          }
          current = choice.copy();
          this.grid[current.y][current.x] = spot;
        }
      } else {
        current = stack.pop();
      }
    }
  }


  /* Method to return positions next to a given spot, not including ones given */
  getNearby(loc, ignore, all) {
    let output = [];
    // Search the 8 surrounding squares from the given spot
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        // Create a temporary copy of the new location
        let tmp = createVector(loc.x + x, loc.y + y);
        // Skip if the location has an index in the list of ignored locations
        if (!all) {
          if (ignore.indexOf(tmp) >= 0) {
            continue;
          }
        }
        // Skip if one of the co-ordinates is negative
        if (tmp.y < 0 || tmp.x < 0 || tmp.y >= this.r || tmp.x >= this.c) {
          continue;
        }
        // Skip if both or neither offsets are 0 to skip current and diagonals
        if ((x == 0 && y == 0) || (x != 0 && y != 0)) {
          continue;
        }
        // If the spot is free, it is allowed to be included in the output
        if (this.grid[tmp.y][tmp.x] == null || this.grid[tmp.y][tmp.x] instanceof Goal || all) {
          output.push(tmp.copy());
        }
      }
    }
    return output;
  }


  /* Method to fill in the rest of the board */
  fillIn() {
    for (let r = 0; r < this.r; r++) {
      for (let c = 0; c < this.c; c++) {
        if (this.grid[r][c] == null) {
          let wet = false;
          let nearMe = this.getNearby(createVector(c, r), null, true);
          for (let n of nearMe) {
            if (this.grid[n.y][n.x] instanceof Water) {
              wet = true;
            }
          }
          this.grid[r][c] = giveSpot(null, false, wet);
        }
      }
    }
  }


  /* Method to electrify any water next to electricity */
  zap() {
    for (let r = 0; r < this.r; r++) {
      for (let c = 0; c < this.c; c++) {
        if (!(this.grid[r][c] instanceof Water)) {
          continue;
        }
        let tests = this.getNearby(createVector(c, r), null, true);
        for (let t of tests) {
          if (this.grid[t.y][t.x] instanceof Electric) {
            this.grid[r][c].electrify();
          }
        }
      }
    }
  }


  /* Method to move the player */
  move(step) {
    document.getElementById("pat").innerHTML = "Patience";
    do {
      let tmp = this.playerPos.copy();
      tmp.add(step);
      if (tmp.x < 0 || tmp.y < 0 || tmp.x >= this.c || tmp.y >= this.r) {
        break;
      }
      this.playerPos.add(step);
      if (this.grid[this.playerPos.y][this.playerPos.x] instanceof Orange) {
        this.playerOrange = true;
      } else if (this.grid[this.playerPos.y][this.playerPos.x] instanceof Soap) {
        this.playerOrange = false;
      }
      if (!this.grid[this.playerPos.y][this.playerPos.x].walkable) {
        step.mult(-1);
        this.playerPos.add(step);
      }
    } while (this.grid[this.playerPos.y][this.playerPos.x] instanceof Soap);

    this.show();
  }


  /* Method to check if the player has got to the goal */
  checkWin() {
    if (this.grid[this.playerPos.y][this.playerPos.x] instanceof Goal) {
      points++;
      document.getElementById("pat").innerHTML = "YOU HAVE " + points + " POINTS!";
      return true;
    }
    return false;
  }


  /* Method to get all moves from a log of visited spots and a lcoation */
  getMoves(vis, loc) {
    let output = [];
    for (let m of [createVector(1, 0), createVector(-1, 0), createVector(0, 1), createVector(0, -1)]) {
      let y = loc.y + m.y;
      let x = loc.x + m.x;
      if (y < 0 || x < 0 || y >= this.r || x >= this.c) {
        continue;
      }
      if (!vis[y][x] && this.grid[y][x].walkable) {
        output.push(m.copy());
      }
    }
    return output;
  }


  /* Method to make a fake move on a given grid */
  fakeMove(fakeGrid, visited, loc, dir, isOrange) {
    let spot;
    do {
      let newPos = loc.copy().add(dir.copy());
      spot = fakeGrid[newPos.y][newPos.x];
      if (spot instanceof Orange) {
        isOrange = true;
      } else if (spot instanceof Soap) {
        isOrange = false;
      } else if (spot instanceof Water) {
        if (isOrange) {
          newPos.sub(dir.copy());
        }
      } else if (!spot.walkable) {
        dir.mult(-1);
        newPos.add(dir.copy());
      }
      loc = newPos.copy();
      visited[loc.y][loc.x] = true;
    } while (spot instanceof Soap);
    return { v:visited, p:loc, o:isOrange };
  }


  /* Method to try and solve the level, returns true or false if solvable or not */
  solve() {
    let stack = [];
    let current = this.playerPos.copy();
    let visited = [];
    for (let row = 0; row < this.r; row++) {
      let r = [];
      for (let col = 0; col < this.c; col++) {
        r.push(false);
      }
      visited.push(r);
    }
    visited[current.y][current.x] = true;
    let done = false;
    while (!done) {
      let allMoves = this.getMoves(visited, current);
      if (allMoves.length == 0) {
        if (stack.length == 0) {
          return false;
        } else {
          current = stack.pop().copy();
        }
      } else {
        stack.push(current.copy());
        let move = random(allMoves);
        current = current.copy().add(move.copy());
        visited[current.y][current.x] = true;
        if (this.grid[current.y][current.x] instanceof Goal) {
          return true;
        }
      }
    }
  }

}
