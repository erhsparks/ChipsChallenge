import * as d3 from 'd3';

const makeImageDef = (
  d3El,
  tileSize,
  nameString,
  idName = nameString,
  patternWidthOffset = 0,
  xOffset = 0
) => {
  let defs = d3El.append('svg:defs');

  let patternWidth = tileSize + patternWidthOffset;
  let x = xOffset || 0;

  defs.append('svg:pattern')
  .attr('id', `${idName}`)
  .attr('width', patternWidth)
  .attr('height', tileSize)
  .attr("patternUnits", "userSpaceOnUse")
  .append("svg:image")
  .attr("xlink:href", `assets/images/${nameString}.png`)
  .attr("width", tileSize)
  .attr("height", tileSize)
  .attr("x", x)
  .attr("y", 0);
};

export default makeImageDef;
