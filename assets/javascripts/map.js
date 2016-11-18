import * as d3 from 'd3';
import * as tileDetail from './tiles';
import * as itemDetail from './items';

class LevelOneMap {
  constructor (root) {
    this.gameObjects = {};

    this.numRows = 14 + 6;
    // this.visibleRows = 9;
    this.numCols = 15 + 6;
    // this.visibleCols = 9;
    this.tileSize = 40;

    this.makeMap(root);

    this.chipsLeft = this.itemStartingPositions().computerChips.length;
    this.timeLeft = 100;
  }

  makeMap (root) {
    this.gameMapContainer = d3.select('body')
    .append('main')
    .attr('class', 'game-map-container')
    .attr('width', this.numCols * this.tileSize + 8)
    .attr('height', this.numRows * this.tileSize + 8);

    this.gameMap = this.gameMapContainer.append('svg')
    .attr('class', 'game-map')
    .attr('width', this.numCols * this.tileSize)
    .attr('height', this.numRows * this.tileSize);
    // .attr('width', this.visibleCols * this.tileSize)
    // .attr('height', this.visibleRows * this.tileSize);

    this.addGrid();
    this.addTiles();
    this.addItems();
    this.addOtherChipFaces();
    // this.chipNode = this.gameMap.select('.chipOurHero');
    // let chipX = this.chipNode.attr('x');
    // let chipY = this.chipNode.attr('y');
    // this.gameMap.attr('x', chipX).attr('y', chipY);
  }

  addOtherChipFaces() {
    this.makeImageDef('chip_up');
    this.makeImageDef('chip_left');
    this.makeImageDef('chip_right');
  }

  makeImageDef (nameString) {
    let defs = this.gameMap.append('svg:defs');

    defs.append('svg:pattern')
    .attr('id', `${nameString}`)
    .attr('width', this.tileSize)
    .attr('height', this.tileSize)
    .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href", `assets/images/${nameString}.png`)
    .attr("width", this.tileSize)
    .attr("height", this.tileSize)
    .attr("x", 0)
    .attr("y", 0);
  }

  addGrid () {
    let nameString = tileDetail.regularFloor;
    this.makeImageDef(nameString);

    for (let y = 0; y < this.numRows; y++) {
      for (let x = 0; x < this.numCols; x++) {
        this.gameMap.append('rect')
        .attr('x', x * this.tileSize)
        .attr('y', y * this.tileSize)
        .attr('width', this.tileSize)
        .attr('height', this.tileSize)
        .style('fill', `url(#${nameString})`)
        .attr('class', 'floorTile');
      }
    }
  }

  addTiles () {
    let tileStarts = this.tileStartingPositions();
    let tiles = Object.keys(tileStarts);

    tiles.forEach(tileType => {
      let nameString = tileDetail[tileType];
      this.makeImageDef(nameString);

      tileStarts[tileType].forEach(tilePos => {
        let x = tilePos[0];
        let y = tilePos[1];

        this.gameMap.append('rect')
        .attr('x', x * this.tileSize)
        .attr('y', y * this.tileSize)
        .attr('width', this.tileSize)
        .attr('height', this.tileSize)
        .style('fill', `url(#${nameString})`)
        .attr('class', tileType);
      });
    });
  }

  addItems () {
    let mapItems = this.itemStartingPositions();
    let items = Object.keys(mapItems);

    items.forEach(itemType => {
      let nameString = itemDetail[itemType];
      this.makeImageDef(nameString);

      mapItems[itemType].forEach(itemPos => {
        let x = itemPos[0];
        let y = itemPos[1];

        let item = this.gameMap.append('rect')
        .attr('x', x * this.tileSize)
        .attr('y', y * this.tileSize)
        .attr('width', this.tileSize)
        .attr('height', this.tileSize)
        .style('fill', `url(#${nameString})`)
        .attr('class', itemType);

        this.gameObjects[itemType] = [];
        this.gameObjects[itemType].push(item);
      });
    });
  }

  itemStartingPositions () {
    return (
      {
        hint: [
          [10, 8]
        ],
        chipOurHero: [
          [10, 9]
        ],
        chipSocket: [
          [10, 6]
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
        computerChips: [
          [7, 5], [13, 5], [5, 10], [15, 10],
          [8, 9], [12, 9], [5, 10], [15, 10],
          [10, 11], [9, 14], [11, 14]
        ]
      }
    );
  }

  tileStartingPositions () {
    return (
      {
        winPortal: [
          [10, 5]
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
