import * as d3 from "d3";
import LevelOneMap from './map';

class ChipsChallenge {
  constructor() {
    this.gameMap = new LevelOneMap();

    this.listenforArrowKeys();
    this.handleKeypress = this.handleKeypress.bind(this);
    this.moveChip = this.moveChip.bind(this);
  }

  listenforArrowKeys() {
    this.arrowKeysPressed = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false
    };

    d3.select('body')
      .on('keydown', () => this.handleKeypress(d3.event.key, 'down'))
      .on('keyup', () => this.handleKeypress(d3.event.key, 'up'));
  }

  handleKeypress (key, upOrDown) {
    if (Object.keys(this.arrowKeysPressed).includes(key)) {
      switch (upOrDown) {
        case 'down':
          this.arrowKeysPressed[key] = true;
          this.moveChip(key);
          break;
        case 'up':
          this.arrowKeysPressed[key] = false;
          break;
        default:
          console.log('something else??');
      }
    }
  }

  moveChip(direction) {
    let chip = this.gameMap.gameObjects.chipOurHero[0];
    let x = parseInt(chip.attr('x'));
    let y = parseInt(chip.attr('y'));
    let dXY = this.gameMap.tileSize;

    switch (direction) {
      case 'ArrowUp':
        console.log("Uptown girl, she's been living in her uptown world");
        y -= dXY;
        chip.attr('y', `${y}`);
        break;
      case 'ArrowDown':
        console.log("When you're alone and life is making you lonely, you can always go... downtown");
        y += dXY;
        chip.attr('y', `${y}`);
        break;
      case 'ArrowLeft':
        console.log("Slam it to the left if you're havin' a good time");
        x -= dXY;
        chip.attr('x', `${x}`);
        break;
      case 'ArrowRight':
        console.log("Shake it to the right if you know that you feel fine");
        x += dXY;
        chip.attr('x', `${x}`);
        break;
      default:

    }
  }
}

export default ChipsChallenge;
