import * as d3 from "d3";
import LevelOneMap from './map';

class ChipsChallenge {
  constructor () {
    this.gameMap = new LevelOneMap();
    this.timeLeft = this.gameMap.timeLeft;
    this.chipsLeft = this.gameMap.chipsLeft;
    this.chipHasItems = {
      '.redKeys': 0,
      '.blueKeys': 0,
      '.yellowKeys': 0,
      '.greenKeys': 0
    };
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
    }

    if (this.didWeWin(x, y)) {
      this.won = true;
    } else this.checkForItems(x, y);
  }

  chipCanMove (x, y) {
    return !(this.isWallAt(x, y) || this.isBarrierAt(x, y));
  }

  isWallAt (x, y) {
    let isWall = false;

    d3.selectAll('.walls').each(function () {
      let wall = this;
      let wallX = wall.x.baseVal.value;
      let wallY = wall.y.baseVal.value;

      if (x === wallX && y === wallY) {
        isWall = true;
        return;
      }
    });

    return isWall;
  }

  isBarrierAt (x, y) {
    let isBarrier = false;

    let chipsLeft = this.chipsLeft;
    let chipsItems = this.chipHasItems;

    let barrierNames = [
      '.chipCollector',
      '.blueDoors', '.redDoors',
      '.yellowDoors', '.greenDoors'
    ];

    barrierNames.forEach(barrierName => {
      d3.selectAll(barrierName).each(function () {
        let barrier = this;
        let barrierX = barrier.x.baseVal[0].value;
        let barrierY = barrier.y.baseVal[0].value;

        if (x === barrierX && y === barrierY) {
          if (barrierName === '.chipCollector') {
            (chipsLeft === 0) ? barrier.remove() : isBarrier = true;
          } else {
            let color = barrierName.match(/\.(.*)Doors/)[1];
            if (chipsItems[`.${color}Keys`] > 0) {
              if (color !== 'green') chipsItems[`.${color}Keys`] -= 1;
              barrier.remove();
              console.log(chipsItems);
            } else isBarrier = true;
          }
          return;
        }

        if (isBarrier) return;
      });
      if (isBarrier) return;
    });
    return isBarrier;
  }

  didWeWin (x, y) {
    let portal = d3.selectAll('.winPortal');
    let portalX = parseInt(portal.attr('x'));
    let portalY = parseInt(portal.attr('y'));

    return (x === portalX && y === portalY) ? true : false;
  }

  checkForItems (x, y) {
    let chipsItems = this.chipHasItems;
    let chipsLeft = this.chipsLeft;

    let itemNames = [
      '.computerChips', '.redKeys', '.blueKeys',
      '.greenKeys', '.yellowKeys'
    ];
    itemNames.forEach(itemName => {
      d3.selectAll(itemName).each(function () {
        let item = this;
        let itemX = item.x.baseVal[0].value;
        let itemY = item.y.baseVal[0].value;
        if (x === itemX && y === itemY) {
          if (itemName === '.computerChips') {
            chipsLeft -= 1;
            console.log(`Chips left: ${chipsLeft}`);
          } else {
            chipsItems[itemName] += 1;
            console.log(chipsItems);
          }
          item.remove();
        }
      });
    });

    this.chipsLeft = chipsLeft;
  }
}

export default ChipsChallenge;
