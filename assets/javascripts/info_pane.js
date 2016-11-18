import * as d3 from 'd3';

class InfoPane {
  constructor(timeLeft, chipsLeft, chipHasItems) {
    this.timeLeft = timeLeft;
    this.chipsLeft = chipsLeft;
    this.chipHasItems = chipHasItems;

    this.tileSize = 40;
    this.numRows = 9;
    this.numCols = 5;
    this.makePane();
  }

  makePane () {
    this.infoPane = d3.select('body')
    .append('svg')
    .attr('class', 'info-pane')
    .attr('width', this.numCols * (this.tileSize + 2))
    .attr('height', this.numRows * (this.tileSize + 2));

    this.infoPane.append('rect')
    .attr('x', (this.tileSize / 2))
    .attr('y', (this.tileSize / 2))
    .attr('width', this.numCols * (this.tileSize + 2))
    .attr('height', this.numRows * (this.tileSize + 2))
    .style('fill', 'lightgray');

    this.addItemGrid();
  }

  addItemGrid () {
    for (let i = 6.5; i < 8.5; i++) {
      for (let j = 0.35; j < 4.35; j++) {
        this.infoPane.append('rect')
        .attr('width', this.tileSize + 2)
        .attr('height', this.tileSize + 2)
        .attr('x', (this.tileSize / 2 + j * (this.tileSize)))
        .attr('y', (this.tileSize / 2 + i * (this.tileSize)))
        .style('fill', 'lightgray')
        .style('stroke', 'gray');

        // r b y g
      }
    }
  }
}

export default InfoPane;
