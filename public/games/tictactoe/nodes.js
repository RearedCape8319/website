/* Class structure for a node in the search tree */
class Node {
  // Constructor function to create a node object
  constructor(max, b, dep, prev) {
    this.maximising = max;
    this.board = b;
    this.depth = dep;
    this.prevMove = prev;
    this.value = minimaxVal(this);
  }
}
