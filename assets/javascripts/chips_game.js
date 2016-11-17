import * as d3 from "d3";
import LevelOneMap from './map';

class ChipsChallenge {
  constructor () {
    this.gameMap = new LevelOneMap();
    this.timeLeft = this.gameMap.timeLeft;
    this.chipsLeft = this.gameMap.chipsLeft;
    this.chipHasItems = [];
    this.won = false;

    this.listenforArrowKeys();

  }

  listenforArrowKeys () {
    d3.select('body')
      .on('keydown', () => this.handleKeypress(d3.event.key));
  }

  handleKeypress (key, upOrDown) {
    let arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (arrowKeys.includes(key)) this.moveChip(key);

    if (this.won) {
      console.log('you win!');
      this.won = false;
    }
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

    if (this.didWeWin(x, y)) {
      this.won = true;
    } else this.checkForItems(x, y);
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

  didWeWin (x, y) {
    let portal = d3.selectAll('.winPortal');
    let portalX = parseInt(portal.attr('x'));
    let portalY = parseInt(portal.attr('y'));

    return (x === portalX && y === portalY) ? true : false;
  }

  checkForItems (x, y) {
    let items = [
      '.computerChips', '.redKeys', '.blueKeys',
      '.greenKeys', '.yellowKeys'
    ];
    let chipsItems = this.chipHasItems;
    items.forEach(itemName => {
      d3.selectAll(itemName).each(function () {
        let item = this;
        let itemX = item.x.baseVal.value;
        let itemY = item.y.baseVal.value;
        if (x === itemX && y === itemY) {
          chipsItems.push(itemName);
          console.log(chipsItems);
          d3.exit(this);
        }
      });
    });
  }
}

export default ChipsChallenge;
