import * as d3 from "d3";
import LevelOneMap from './map';
import InfoPane from './info_pane';

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

    this.gameInfo = new InfoPane(
      this.timeLeft,
      this.chipsLeft,
      this.chipHasItems
    );

    this.won = false;
    this.outOfTime = false;
    this.firstMove = true;
    this.listenforArrowKeys();
  }

  startTimer() {
    this.gameTimer = window.setInterval(() => {
      if (this.timeLeft > 0) {
        console.log(this.timeLeft);
        this.timeLeft -= 1;
      } else {
        console.log(this.timeLeft);
        this.outOfTime = true;
        alert('Oops, out of time!');
        this.keysToListenFor = [];
        clearInterval(this.gameTimer);
      }
    }, 1000);
  }

  listenforArrowKeys () {
    this.keysToListenFor = [
      'ArrowUp', 'ArrowDown',
      'ArrowLeft', 'ArrowRight'
    ];

    d3.select('body')
      .on('keydown', () => this.handleKeypress(d3.event))
      .on('keyup', () => this.handleWin());
  }

  handleKeypress (event) {
    if (this.keysToListenFor.includes(event.key)) {
      event.preventDefault();

      if (this.firstMove) {
        this.startTimer();
        this.firstMove = false;
      }

      this.moveChip(event.key);
    }
  }

  handleWin () {
    if (this.won) {
      let winTime = this.gameMap.timeLeft - this.timeLeft;
      alert(`Onwards! You won in ${winTime} seconds!`);

      clearInterval(this.gameTimer);
      this.won = false;
      this.keysToListenFor = [];
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
      let wall = d3.select(this);
      let wallX = parseInt(wall.attr('x'));
      let wallY = parseInt(wall.attr('y'));

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
      '.chipSocket',
      '.blueDoors', '.redDoors',
      '.yellowDoors', '.greenDoors'
    ];

    barrierNames.forEach(barrierName => {
      d3.selectAll(barrierName).each(function () {
        let barrier = d3.select(this);
        let barrierX = parseInt(barrier.attr('x'));
        let barrierY = parseInt(barrier.attr('y'));

        if (x === barrierX && y === barrierY) {
          if (barrierName === '.chipSocket') {
            (chipsLeft === 0) ? barrier.remove() : isBarrier = true;
          } else {
            let color = barrierName.match(/\.(.*)Doors/)[1];
            if (chipsItems[`.${color}Keys`] > 0) {
              if (color !== 'green') chipsItems[`.${color}Keys`] -= 1;
              barrier.remove();
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
        let item = d3.select(this);
        let itemX = parseInt(item.attr('x'));
        let itemY = parseInt(item.attr('y'));
        if (x === itemX && y === itemY) {
          if (itemName === '.computerChips') {
            chipsLeft -= 1;
          } else {
            chipsItems[itemName] += 1;
          }
          item.remove();
        }
      });
    });

    this.chipsLeft = chipsLeft;
  }
}

export default ChipsChallenge;
