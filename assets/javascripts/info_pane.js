import * as d3 from 'd3';
import * as tileDetail from './tiles';

class InfoPane {
  constructor(timeLeft, chipsLeft, chipHasItems) {
    this.timeLeft = timeLeft;
    this.chipsLeft = chipsLeft;
    this.chipHasItems = chipHasItems;

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
  }

  addInfoValues () {
    this.infoPane.append('text')
    .attr('x', 105)
    .attr('y', 72)
    .text(`1`)
    .attr('class', 'info-pane-values');

    this.infoPane.append('text')
    .attr('x', 85)
    .attr('y', 150)
    .text(`${this.timeLeft}`)
    .attr('class', 'info-pane-values');

    this.infoPane.append('text')
    .attr('x', 85)
    .attr('y', 265)
    .text(`${this.chipsLeft}`)
    .attr('class', 'info-pane-values');
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

  // addItemGrid () {
  //   let nameString = tileDetail.regularFloor;
  //   for (let i = 7; i < 9; i++) {
  //     for (let j = 1; j < 5; j++) {
  //       this.infoPane.append('rect')
  //       .attr('width', this.tileSize)
  //       .attr('height', this.tileSize)
  //       .attr('x', j * this.tileSize)
  //       .attr('y', i * this.tileSize)
  //       .style('fill', `url(#${nameString})`);
  //
  //       // r b y g
  //     }
  //   }
  // }
}

export default InfoPane;