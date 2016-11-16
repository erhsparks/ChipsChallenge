import * as d3 from 'd3';
import * as floors from './tiles';
import * as items from './items';

class LevelOneMap {
  constructor (root) {
    this.numRows = 14 + 6;
    this.numCols = 15 + 6;
    this.tileSize = 40;

    this.makeMap(root);
  }

  makeMap (root) {
    this.gameMap = d3.select('body')
    .append('svg')
    .attr('class', 'game-map')
    .attr('width', this.numCols * (this.tileSize + 2))
    .attr('height', this.numRows * (this.tileSize + 2));

    this.addGrid();
    this.addDetail();
  }

  addGrid () {
    for (let y = 0; y < this.numRows; y++) {
      for (let x = 0; x < this.numCols; x++) {
        this.gameMap.append('rect')
        .attr('x', (this.tileSize / 2 + x * (this.tileSize)))
        .attr('y', (this.tileSize / 2 + y * (this.tileSize)))
        .attr('width', this.tileSize)
        .attr('height', this.tileSize)
        .style('fill', floors.regularFloor)
        .style('stroke', 'gray')
        .attr('class', 'floorTile');
      }
    }
  }

  addDetail () {
    let mapDetails = this.startingPositions();
    let mapItems = Object.keys(mapDetails);

    mapItems.forEach(tileType => {
      mapDetails[tileType].forEach(tilePos => {
        let x = tilePos[0];
        let y = tilePos[1];

        this.gameMap.append('rect')
        .attr('x', (this.tileSize / 2 + x * (this.tileSize)))
        .attr('y', (this.tileSize / 2 + y * (this.tileSize)))
        .attr('width', this.tileSize)
        .attr('height', this.tileSize)
        .style('fill', floors[tileType])
        .style('stroke', 'gray')
        .attr('class', tileType);
      });
    });
  }

  startingPositions () {
    return (
      {
        chip: [
          [10, 9]
        ],
        winPortal: [
          [10, 5]
        ],
        chipCollector: [
          [10, 6]
        ],
        help: [
          [10, 8]
        ],
        greenDoors: [
          [8, 6], [12, 6]
        ],
        greenKeys: [
          [11, 15]
        ],
        blueDoors: [
          [7, 7], [13, 11]
        ],
        blueKeys: [
          [8, 8], [8, 10]
        ],
        redDoors: [
          [13, 7], [7, 11]
        ],
        redKeys: [
          [12, 8], [12, 10]
        ],
        yellowDoors: [
          [9, 12], [11, 12]
        ],
        yellowKeys: [
          [5, 7], [15, 7]
        ],
        chips: [
          [7, 5], [13, 5], [5, 10], [15, 10],
          [8, 9], [12, 9], [5, 10], [15, 10],
          [10, 11], [9, 14], [11, 14]
        ],
        walls: [
          [5, 3], [6, 3], [7, 3], [8, 3], [9, 3],
          [11, 3], [12, 3], [13, 3], [14, 3], [15, 3],

          [5, 4], [9, 4], [10, 4], [11, 4], [15, 4],

          [5, 5], [9, 5], [11, 5], [15, 5],

          [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
          [9, 6], [11, 6], [13, 6], [14, 6], [15, 6],
          [16, 6], [17, 6],

          [3, 7], [17, 7],

          [3, 8], [7, 8], [13, 8], [17, 8],

          [3, 9], [4, 9], [5, 9], [6, 9], [7, 9],
          [13, 9], [14, 9], [15, 9], [16, 9], [17, 9],

          [3, 10], [7, 10], [13, 10], [17, 10],

          [3, 11], [17, 11],

          [3, 12], [4, 12], [5, 12], [6, 12], [7, 12],
          [8, 12], [10, 12], [12, 12], [13, 12], [14, 12],
          [15, 12], [16, 12], [17, 12],

          [7, 13], [10, 13], [13, 13],

          [7, 14], [10, 14], [13, 14],

          [7, 15], [10, 15], [13, 15],

          [7, 16], [8, 16], [9, 16], [10, 16], [11, 16],
          [12, 16], [13, 16]
        ]
      }
    );
  }
}

export default LevelOneMap;