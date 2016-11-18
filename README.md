## Chips Challenge

A clone of the first level of the 1992 computer game [Chips Challenge][wikipedia], created by Chuck Sommerville.

### Background

In this classic PC adventure puzzle game, our hero Chip is a high school computer geek on a journey to win the approval of Melinda the Mental Marvel by successfully navigating her deadly Clubhouse -- collecting computer chips and avoiding peril along the way -- in order to gain entry into her Bit Busters club. Chip must use his every mental resource to dodge deadly monsters and navigate brain-bending puzzles on each level to find all of the computer chips hidden around the map in a race against the countdown clock!

The original Chips Challenge is a 1-player game which uses the arrow keys to move Chip in the four cardinal directions. Chip's field of view is limited to a 9 x 9 grid in which he remains centered: as the player gives him commands to move, the map shifts around him. As he explores, he must run a gantlet of obstacles, so that he can collect the computer chips required to pass through the portal to the next level.

Chip's various challenges include locked doors to which he must find keys, surfaces which are impassable or which move him in undesirable ways unless some item is found, bombs, monsters, spies who take Chip's items, the time clock, and the levels themselves, which are often maze-like logic puzzles.

See [this playthrough][playthrough] to get a feel for gameplay.

[wikipedia]: https://en.wikipedia.org/wiki/Chip%27s_Challenge
[playthrough]: https://www.youtube.com/watch?v=pcdMh1M7QLI

### The Game

This single-page app is a clone of the first level of the MS version of Chips Challenge.

Users are greeted by a welcome screen with a view of the game and an info box in the style of the original, explaining the goals and movements:

![image of welcome screen](assets/images/for_README/welcome.png)

The player moves Chip using the arrow keys, and has him pick up items by walking into the square that item is on. As soon as Chip makes his first move, the welcome message disappears and the level info is revealed.

![image of the game with timer counting](assets/images/for_README/timer_countdown.png)

Chip is unable to walk through walls, and may only pass remove locked doors and the chip collector socket if he has a key of the appropriate color or all the chips required for that level, respectively. All keys except the green key, which may be used indefinitely, are removed from Chip's inventory after opening a door of the same color.

![image of Chip going through a key door](assets/images/for_README/keys_doors.png)

The user may revisit the instructions at any time by moving Chip back onto the hint square. The timer is paused while Chip is standing here.

![image of hint](assets/images/for_README/hint.png)

When Chip has collected all required chips, the 'CHIPS REMAINING' panel turns gold, and Chip is able to pass through the chip socket gate to reach the exit portal.

![image of 'chips left' turning gold at zero](assets/images/for_README/no_chips_left.png)

When Chip enters the portal in the original game, a popup appears telling him his time, whether is was a personal best, and whether he won on the first try. The submit button reads 'Onwards!' and takes the user to the next level.

This clone only has one level so far, and I thought a pop up would be way too annoying, so when Chip wins or loses, the info text appears again on top of the info panel, with a win or lose message.

![image of Chip victorious](assets/images/for_README/win.png)

This game has no database and does not store session state, so no best time info is displayed. In future, I plan to implement a restart button, which will reset the game but will not reset the page, so I could easily add a best time function to the main game class. This would only persist until the page was refreshed, of course, but it would still be fun!

![image of Chip running out of time](assets/images/for_README/out_of_time.png)

All of the tiles used were taken from the [Chips Challenge Wiki][chips_wiki], and I greatly appreciate their hard work and their making the game graphics available for public use. The backgrounds and info panels came from screenshots, lightly edited with Gimp.

[chips_wiki]: http://chipschallenge.wikia.com/wiki/Chip%27s_Challenge_Wiki

### Implementation

Chips is written in JavaScript, using the D3 library for object rendering and manipulation, and one jQuery call for DOM content loaded.

```javascript
// from main.js : the webpack entry file

import $ from 'jQuery';
import ChipsChallenge from './chips_game';

// asynch DOMContentLoaded function. The game will not run until the HTML document has loaded.
$(() => {
  new ChipsChallenge();
});
```

```javascript
// from map.js : creating the first level
addItems () {
  // item starting postions are kept in an object which relates item type to arrays of those items' starting positions
  let mapItems = this.itemStartingPositions();
  let items = Object.keys(mapItems);

  // making each type of item and appending to to the map (an SVG object)
  items.forEach(itemType => {
    // itemDetail is an imported function from 'items.js' with item name and image path info
    let nameString = itemDetail[itemType];

    // make an image def (see next function) for each type of item
    this.makeImageDef(nameString);

    mapItems[itemType].forEach(itemPos => {
      let x = itemPos[0];
      let y = itemPos[1];

      // this.gameMap is a d3 SVG node object, and here we are appening each new object to it
      let item = this.gameMap.append('rect')
      .attr('x', x * this.tileSize)
      .attr('y', y * this.tileSize)
      .attr('width', this.tileSize)
      .attr('height', this.tileSize)
      // here's that image def we made above
      .style('fill', `url(#${nameString})`)
      .attr('class', itemType);

      // this.gameObjects is used heavily in the chips_game class
      this.gameObjects[itemType] = [];
      this.gameObjects[itemType].push(item);
    });
  });
}

// adds each image to the page once for faster rendering of individual items which those images
makeImageDef (nameString) {
  let defs = this.gameMap.append('svg:defs');

  defs.append('svg:pattern')
  .attr('id', `${nameString}`)
  .attr('width', this.tileSize)
  .attr('height', this.tileSize)
  .attr("patternUnits", "userSpaceOnUse")
  .append("svg:image")
  .attr("xlink:href", `assets/images/${nameString}.png`)
  .attr("width", this.tileSize)
  .attr("height", this.tileSize)
  .attr("x", 0)
  .attr("y", 0);
}

```

[more]

### Future plans

- Add items to the Info Panel inventory.
- Refactor gameplay to center Chip on the original 9x9 grid and change display as he moves, making the game much more interesting and challenging to play.
- Refactor map creation code to make it much easier to add more levels.
- Implement the best time counter detailed the the Game overview section above.
