import * as d3 from "d3";

class LevelOneMap {
  constructor (root) {
    this.makeMap(root);
  }

  makeMap (root) {
    let numRows = 14;
    let numCols = 15;
    let tileSize = 40;

    const gameMap = d3.select('body')
    .append('svg')
    .attr('class', 'game-map')
    .attr('width', numCols * (tileSize + 2))
    .attr('height', numRows * (tileSize + 2));

    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        gameMap.append('rect')
        .attr('x', (tileSize / 2 + x * (tileSize)))
        .attr('y', (tileSize / 2 + y * (tileSize)))
        .attr('width', tileSize)
        .attr('height', tileSize)
        .style('fill', 'lightgray')
        .style('stroke', 'gray');
      }
    }
  }
}

export default LevelOneMap;
