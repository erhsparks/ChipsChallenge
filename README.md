## Chips Challenge

A clone of the first level of the 1991 computer game [Chips Challenge][wikipedia], created by Chuck Sommerville.

### Background

In this classic PC adventure puzzle game, our hero Chip is a high school computer geek on a journey to win the approval of Melinda the Mental Marvel by successfully navigating her deadly Clubhouse -- collecting computer chips and avoiding peril along the way -- in order to gain entry into her Bit Busters club. Chip must use his every mental resource to dodge deadly monsters and navigate brain-bending puzzles on each level to find all of the computer chips hidden around the map in a race against the countdown clock!

Chips Challenge is a 1-player game which uses the arrow keys to move Chip in the four cardinal directions. Chip's field of view is limited to a 9 x 9 grid in which he remains centered, as the player gives him commands to move, the map shifts around him. As he explores, he must run a gantlet of obstacles, so that he can collect the computer chips required to pass through the portal to the next level.

Chip's various challenges include locked doors to which he must find keys, surfaces which are impassable or which move him in undesirable ways unless some item is found, bombs, monsters, spies who take Chip's items, the time clock, and the levels themselves, which are often maze-like logic puzzles.

See [this playthrough][playthrough] to get a feel for gameplay.

[wikipedia]: https://en.wikipedia.org/wiki/Chip%27s_Challenge
[playthrough]: https://www.youtube.com/watch?v=pcdMh1M7QLI

### The Game

This app will, at the least, include a playable replica of level 1.

Users will:

- Be greeted by a welcome screen with basic instructions, i.e.
  - Use the arrow keys to move.
  - Stand on the yellow ? square for hints.
- Click to start game.
- Click to pause game.
- Play game!
- Click a button to reset the level so that they don't have to refresh the page.
- If I add the EXTREMELY ANNOYING (I loved it as a kid. My parents did not.) music and sound effects from the original game, there will definitely be a big speaker icon to toggle sound on and off.

### Wireframes

The app is contained on a single page, just like the original game. As in the original, there will be a square gameplay screen, which displays a 9 x 9 grid with Chip in the center, which represents the currently viewable area of the map. As Chip moves, he stays centered and the map's viewing area shifts.

![Image of proposed game wireframe](docs/wireframe.png)

Within this limited field of view, Chip must figure out how to get all the chips needed (quantified in the 'CHIPS LEFT' box to the right of the game window) to pass the level before the clock runs out (displayed in seconds under 'TIME').

Items that Chip picks up along his journey will appear in the 2 x 4 grid to the right of the game window (unless they are STOLEN by a SPY).

In addition to these features from the original game, this app will feature two buttons to the left of the game window: a simple refresh icon to restart the level, and a question mark icon to pop up a brief help modal.

While it will retain the retro feel, simple art, and 9x9 grid, this modern clone will offer a 2016 pixellation-free arcade experience.

### Architecture & Technologies

The game logic will be written in JavaScript, with jQuery to handle DOM manipulation. Rendering will be accomplished by adding and removing classes whose appearances will be controlled using CSS.

In order to make the code easily digestible and editable/debuggable, I anticipate breaking game logic into the following files, using the Node module Webpack to bundle the files into one script:

- main.js: the Webpack entry file. Finds the (only) DOM element in the index.html and assigns it to a new Game instance.

- game.js: handles gameplay. Instantiates the Board, installs an onkeydown listener, and moves the board's field of view accordingly.

- board.js: the map. A new instance contains floor types, items (each instances of their own classes) and Chip (pretty much also an item) at game start.

- floors.js: tile, wall, key-wall (door), chip collector, help icon, complete-level portal, water, fire, ice, and force-field.

- items.js: most of the items, monsters, and Chip himself have one function, which is why this game isn't too completely out of the realm of possibility for a four-day project (also I'm only doing level 1). Thus, classes will be grouped together here until they become large enough to need their own file.

### Implementation Timeline

**Day 1**

- Set up game files in [lib].
- Set up index.html and Webpack bundler in root directory.
- Set up CSS files in [assets].
- Make sure game structure logic outlined above is sound.

[lib]: /lib
[assets]: /assets

**Day 2**

- Continue working on game logic.
- Test game visually using CSS classes and simple colors.
- Build out app background in CSS.

**Day 3**

- Create icons for items and board elements.
- Style, style, style.
- Add help and other auxiliary features outlines above.
- Add refresh button functionality.

**Day 4**

- Finish any outstanding functionality.
- Work on bonus features outlined below, time permitting.

### Bonus Features

- Ability to pause gameplay.
- More levels!
- Best time counter!
  - Note: this game will have no database, so this feature will not persist on refresh.
