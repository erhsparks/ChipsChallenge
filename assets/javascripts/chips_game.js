import * as d3 from "d3";
import LevelOneMap from './map';

class ChipsChallenge {
  constructor () {
    this.gameMap = new LevelOneMap();
    this.listenforArrowKeys();
  }

  listenforArrowKeys () {
    d3.select('body')
      .on('keydown', () => this.handleKeypress(d3.event.key));
  }

  handleKeypress (key, upOrDown) {
    let arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (arrowKeys.includes(key)) this.moveChip(key);
  }

  moveChip (direction) {
    let chip = this.gameMap.gameObjects.chipOurHero[0];
    let x = parseInt(chip.attr('x'));
    let y = parseInt(chip.attr('y'));
    let dXY = this.gameMap.tileSize;

    switch (direction) {
      case 'ArrowUp':
        y -= dXY;
        if (this.chipCanMove(x, y)) chip.attr('y', `${y}`);
        break;
      case 'ArrowDown':
        y += dXY;
        if (this.chipCanMove(x, y)) chip.attr('y', `${y}`);
        break;
      case 'ArrowLeft':
        x -= dXY;
        if (this.chipCanMove(x, y)) chip.attr('x', `${x}`);
        break;
      case 'ArrowRight':
        x += dXY;
        if (this.chipCanMove(x, y)) chip.attr('x', `${x}`);
        break;
      default:
        break;
    }
  }

  chipCanMove (x, y) {
    let canHe = true;

    d3.selectAll('.walls').each(function () {
      let wall = this;
      let wallX = wall.x.baseVal.value;
      let wallY = wall.y.baseVal.value;
      if (x === wallX && y === wallY) {
        canHe = false;
        return;
      }
    });

    return canHe;
  }
}

export default ChipsChallenge;
