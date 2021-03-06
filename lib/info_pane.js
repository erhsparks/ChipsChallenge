import * as d3 from 'd3';
import * as itemDetail from './items';
import makeImageDef from './image_defs';

class InfoPane {
  constructor(timeLeft, chipsLeft, chipHasItems) {
    this.timeLeft = timeLeft;
    this.chipsLeft = chipsLeft;
    this.chipHasItems = chipHasItems;
    this.displayed = {
      blueKeys: false,
      redKeys: false,
      yellowKeys: false,
      greenKeys: false
    };

    this.tileSize = 40;
    this.width = 195;
    this.height = 380;
    this.makePane();
  }

  makePane () {
    this.infoPane = d3.select('body')
    .append('svg')
    .attr('class', 'info-pane')
    .attr('x', this.tileSize / 2)
    .attr('y', this.tileSize / 2)
    .attr('width', this.width)
    .attr('height', this.height);

    this.addInfoText();
    this.addInfoValues();
    this.makeKeyDefs();
  }

  addInfoValues () {
    this.oneDigit = 105;
    this.twoDigit = 85;
    this.threeDigit = 65;

    this.infoPane.append('text')
    .attr('x', this.oneDigit)
    .attr('y', 72)
    .text(`1`)
    .attr('class', 'info-pane-values');

    this.infoPane.append('text')
    .attr('x', this.threeDigit)
    .attr('y', 150)
    .text(`${this.timeLeft}`)
    .attr('class', 'info-pane-values time-left');

    this.infoPane.append('text')
    .attr('x', this.twoDigit)
    .attr('y', 265)
    .text(`${this.chipsLeft}`)
    .attr('class', 'info-pane-values chips-left');
  }

  addInfoText () {
    this.infoPane.append('text')
    .attr('x', 51)
    .attr('y', 35)
    .text('Level')
    .attr('class', 'info-pane-text');

    this.infoPane.append('text')
    .attr('x', 60)
    .attr('y', 112)
    .text('Time')
    .attr('class', 'info-pane-text');

    this.infoPane.append('text')
    .attr('x', 53)
    .attr('y', 198)
    .text('Chips')
    .attr('class', 'info-pane-text');

    this.infoPane.append('text')
    .attr('x', 59)
    .attr('y', 226)
    .text('Left')
    .attr('class', 'info-pane-text');
  }

  makeKeyDefs () {
    this.xOffset = 17;
    this.yOffset = 280;

    let patternWidthOffsets = {
      redKeys: this.xOffset,
      blueKeys: this.xOffset,
      yellowKeys: this.xOffset + this.tileSize,
      greenKeys: this.xOffset + 2 * this.tileSize
    };

    Object.keys(this.chipHasItems).forEach((itemName, i) => {
      itemName = itemName.slice(1);
      let nameString = itemDetail[itemName];
      let itemId = `${nameString}_in_pane`;
      let xOffset = 0;
      if (itemName === 'redKeys') xOffset = this.xOffset;

      makeImageDef(
        this.infoPane, this.tileSize,
        nameString, itemId,
        patternWidthOffsets[itemName], xOffset
      );
    });
  }


  updateChipsLeft () {
    let chipsLeftNode = this.infoPane.select('.chips-left');
    chipsLeftNode.text(this.chipsLeft);

    if (this.chipsLeft < 10) {
      chipsLeftNode.attr('x', this.oneDigit);
      if (this.chipsLeft === 0) {
        let currentClass = chipsLeftNode.attr('class');
        let newClass = `${currentClass} none-left`;
        chipsLeftNode.attr('class', newClass);
      }
    }
  }

  updateTimeLeft () {
    let timeLeftNode = this.infoPane.select('.time-left');
    timeLeftNode.text(this.timeLeft);

    if (this.timeLeft < 100 && this.timeLeft >= 10) {
      timeLeftNode.attr('x', this.twoDigit);
    } else if (this.timeLeft < 10) {
      timeLeftNode.attr('x', this.oneDigit);
      if (this.timeLeft === 0) {
        let currentClass = timeLeftNode.attr('class');
        let newClass = `${currentClass} none-left`;
        timeLeftNode.attr('class', newClass);
      }
    }
  }

  updateItems () {
    console.log(this.chipHasItems);
    let chipsItems = this.chipHasItems;

    Object.keys(chipsItems).forEach((itemName, i) => {
      let nameString = itemName.slice(1);
      let idString = itemDetail[nameString];

      if (chipsItems[itemName] > 0 && !this.displayed[nameString]) {
        this.infoPane.append('rect')
        .attr('x', this.xOffset + (i * this.tileSize))
        .attr('y', this.yOffset)
        .attr('width', this.tileSize)
        .attr('height', this.tileSize)
        .style('fill', `url(#${idString}_in_pane)`)
        .attr('class', `has-${nameString}`);

        this.displayed[nameString] = true;
      } else if (this.displayed[nameString] && chipsItems[itemName] === 0) {
        this.infoPane.select(`.has-${nameString}`).remove();

        this.displayed[nameString] = false;
      }
    });
  }
}

export default InfoPane;
