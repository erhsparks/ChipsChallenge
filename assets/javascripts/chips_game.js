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
          this.moveChip();
          break;
        case 'up':
          this.arrowKeysPressed[key] = false;
          console.log('key released!');
          break;
        default:
          console.log('something else??');
      }
    }
  }

  moveChip() {
    console.log("hooray, we're getting somewhere!");
  }
}

export default ChipsChallenge;
