# My Website
### A website that houses some of my little random coding projects

This github repo will store all of the source code for my website. The site will house lots of random little coding projects of mine. They will mainly be animated demonstrations of something, usually mathematical, or games that can easily be played in the browser.

The site is hosted [here](https://rearedcape.herokuapp.com "My Random Website")

### Information about each project
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

## _Hitomezashi Stitch Patterns (Demo)_
Hitomezashi Stitch Patterns are created on grids of dots. 

For each row and column a binary value is assigned which dictates wheter to offset stitching or not. When offset by 0 or 1 from the start of the corresponding row/column, a stitch is made from that dot to the next one along in the appropriate direction. There is then a gap until the next dot wehre another stitch is made. This sequence of stitching every other dot to the next is continued until the end of the grid is reached. 

Once each row and column is complete, a pattern will have emerged.

To create a new pattern, you can click the mouse on the screen, or press the ENTER or SPACE keys on the keyboard.

## _Marching Squares Algorithm (Demo)_
The marching squares algorithm will take a field of real values and draw contours/outlines along the given boundary within those values.

Each point in the field is given a noise value between 0 and 1. Squares are formed between 4 neighboring points in the noise field and lines are drawn between the midpoints between these "corners" as necessary, creating outlines separating high values from low values.

## _Random Game Chooser (Demo)_
The application will choose a random game from my collection, giving me a challenge to complete within the game.

I made this when I had free time on my hands and couldn't decide which games to play. I created a database of games, each with a corresponding challenge for me to complete in the game. I can mark challenges as complete, search through all challenges or just the uncompleted challenges, I can accept a challenge, delete a challenge, create a new challenge, and finally I can mark every challenge as being open, indicating each as being uncompleted.

## _Covid Test Reliabiloty Calculator (Demo)_
This application will tell me how likely a covid home test is to be telling the truth.

I use one iteration of Bayesian Updating, taking the prior probability of having Covid as the national average, hardcoded default from time of creation but value can be changed. I also hardcoded the specificity and sensitivity of the test using data I found online.

The user is to make sure data entered is accurate, I sugegst leaving sensitivity and specificity values but checking local/national cases per million people. Finally they can indicate whether their test said positive or negative. The calculate button will output how likely the test is to be telling the truth, based purely from the Bayesian Updating step done on the given average among a population.

I know this isn't medically as accurate as it should be, I only made this for something to do and because I found it interesting.

## _Bézier Curve (Demo)_
Creates a smooth curve, using linear interpolation between control points to allow for the curve to be "pulled towards" the control points.

This uses recursive backtracking to linearly interpolate between sets of 2, 3, ..., n points and to give the curve drawn throughout the interpolation. The best way I can explain this is by drawing lines on squared paper so if anyone is actually reading this and wants more information, look into this properly for an actual explanation on the maths behind the algorithm.

## _Discrete Fourier Transform (Demo)_
Draw any given path as an approximation using connected circles of varying frequency and a calculated size and frequency offset.

The algorithm uses a single integral of complex number rotation to calculate the size and frequency offset of a circle of given frequency. I connected circled of frequencies 0, 1, -1, 2, -2, ... n, -n together, where the current rotation within the circle, which can be thought of as a single clock hand along the circumference of the circle, pointing to the center of the next circle.

I hardcoded three paths, a square, a heart, and a secret pattern, and over time more circles are drawn to the screen and the resulting path is drawn in a thicker rainbow stroke.

## _Pythagoras Tree Fractal_
This fractal tree is formed by starting with a square, drawing a right angled triangle on top of it, and using the two non-hypotenuse sides of this triangle as bases of new squares. The process then repeats recursively to make a tree-looking pattern.
