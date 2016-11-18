import * as d3 from "d3";

const makeBox = (message) => {
  let info = d3.select('.info-pane');

  info.append('rect')
  .attr('x', 10)
  .attr('y', 10)
  .attr('width', 175)
  .attr('height', 360)
  .attr('fill', 'black')
  .attr('display', 'flex')
  .attr('justify-content', 'center')
  .attr('class', 'message-box');

  for (let yOffset = 0; yOffset < message.length * 22; yOffset += 22) {
    let i = yOffset/ 22;
    makeText(info, message[i], yOffset);
  }
};

const makeText = (info, messagePart, yOffset) => {
  info.append('text')
  .attr('x', 12.5)
  .attr('y', 40 + yOffset)
  .attr('width', 170)
  .attr('height', 355)
  .text(messagePart)
  .attr('fill', 'cyan')
  .attr('class', 'info-text');
};

export const helpBox = () => {
  let message = [
    'Oh no! The',
    'exit portal',
    'is blocked',
    'by a chip',
    'collector!',
    ' ',
    'Pick up all of',
    'the computer',
    'chips to open',
    'it and escape!',
    ' ',
    'Use the arrow',
    'keys to move',
  ];

  makeBox(message);
};

export const winBox = () => {
  let message = [
    'Yowzer!',
    ' ',
    'Great work!'
  ];

  makeBox(message);
};

export const outOfTimeBox = () => {
  let message = [
    'Oh no!',
    ' ',
    'You ran out',
    'of time!'
  ];

  makeBox(message);
};
