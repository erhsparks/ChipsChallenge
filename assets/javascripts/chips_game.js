import * as d3 from "d3";
import LevelOneMap from './map';

class ChipsChallenge {
  constructor() {
    this.gameMap = new LevelOneMap();

    this.listenforKeyPresses();
    this.handleKeypress = this.handleKeypress.bind(this);
    this.moveChip = this.moveChip.bind(this);
  }

  listenforKeyPresses() {
    var arrowKeysPressed = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false
    };

    d3.select('body')
      .on('keydown', () => {
        let key = d3.event.key;
        if (Object.keys(arrowKeysPressed).includes(key)) {
          arrowKeysPressed[key] = true;
          this.moveChip();
        }
      })
      .on('keyup', () => {
        let key = d3.event.key;
        if (Object.keys(arrowKeysPressed).includes(key)) {
          arrowKeysPressed[d3.event.key] = false;
          console.log('key released!');
        }
      });
  }

  // handleKeypress(key, type) {
  //   debugger
  //   console.log(key);
  //
  //   var keyPressed = {};
  //   switch (type) {
  //     case 'down':
  //       keyPressed[keyId] = true;
  //       break;
  //     case 'up':
  //       keyPressed[keyId] = false;
  //       break;
  //     default:
  //       console.log('not a keypress??');
  //   }
  // }

  moveChip() {
    console.log("hooray, we're getting somewhere!");
  }
}

export default ChipsChallenge;
