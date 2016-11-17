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
    d3.select('body')
      .on('keydown', () => this.handleKeypress(d3.event.key));
  }

  handleKeypress (key, upOrDown) {
    let arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (arrowKeys.includes(key)) this.moveChip(key);
  }

  moveChip(direction) {
    let chip = this.gameMap.gameObjects.chipOurHero[0];
    let x = parseInt(chip.attr('x'));
    let y = parseInt(chip.attr('y'));
    let dXY = this.gameMap.tileSize;

    switch (direction) {
      case 'ArrowUp':
        y -= dXY;
        chip.attr('y', `${y}`);
        break;
      case 'ArrowDown':
        y += dXY;
        chip.attr('y', `${y}`);
        break;
      case 'ArrowLeft':
        x -= dXY;
        chip.attr('x', `${x}`);
        break;
      case 'ArrowRight':
        x += dXY;
        chip.attr('x', `${x}`);
        break;
      default:

    }
  }
}

export default ChipsChallenge;
