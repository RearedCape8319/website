# My Website
### A website that houses some of my little random coding projects

This github repo will store all of the source code for my website. The site will house lots of random little coding projects of mine. They will mainly be animated demonstrations of something, usually mathematical, or games that can easily be played in the browser.

The site is hosted [here](https://rearedcape.herokuapp.com "My Random Website")

# Information about each project
**Each project will be listed in the order it was created, so games and demos will not be separated through the order the projects are listed below**
## _Sierpinski Triangle (Demo)_
The Sierpinski Triangle project is a demonstration that uses a quirk of mathematics to create the Sierpinski Triangle fractal patern with a single dot and the three corners of a triangle.

It begins by showing the triangle to the user, and placing a dot at a random location on the screen, maybe not even inside the triangle! The dot then chooses a random corner of the triangle and moves instantly halfway towards it. The dot continuously moves to random corners like this, plotting each location it lands in.

The resulting collection of spots tracing the dot's path draw out the pattern of the Sierpinsky Triangle.

## _Tic-Tac-Toe (Game)_
The Tic-Tac-Toe game (AKA naughts and crosses) is a remake of the classic board game. The player starts with O pieces and can place one anywhere on a 3x3 grid. The opponent, in this case the computer, plays with X pieces. The first to get 3 of their pieces in a row wins.

My implementation allows the user to click (or tap on mobile) to place their piece, and the computer will immediately take their turn after. The game can result in a win for either player or a draw.

## _Patience (Game)_
The game of Patience is inspired from the indie game [Undertale™](https://undertale.com "Undertale™") in which the same minigame is present.

The rules are as follows:
+ Pink spaces are safe
+ Green spaces summon monsters, but none are around so these are safe too
+ Red spaces are lava, and you cannot walk into them
+ Purple spaces are slippery soap, and the player will slide in the given direction until they slide off the soap
+ Yellow spaces are electric and will zap you if you try to walk into them
+ Blue spaces are water, safe unless directly next to electricity
+ Orange spaces are delicious and sticky, if you stand in one you will become orange. While in this delicious state the fish in the water will bite you if you step in, so run in some soap to clean up and enter the water again
+ The gray space is the finish, stand here to get a point and move on to the next level

The player can move their blue character around with the arrow keys, and should try to complete as many levels as they can.

## _Hitomezashi Stitch Patterns_
Hitomezashi Stitch Patterns are created on grids of dots. 

For each row and column a binary value is assigned which dictates wheter to offset stitching or not. When offset by 0 or 1 from the start of the corresponding row/column, a stitch is made from that dot to the next one along in the appropriate direction. There is then a gap until the next dot wehre another stitch is made. This sequence of stitching every other dot to the next is continued until the end of the grid is reached. 

Once each row and column is complete, a pattern will have emerged.

To create a new pattern, you can click the mouse on the screen, or press the ENTER or SPACE keys on the keyboard.
