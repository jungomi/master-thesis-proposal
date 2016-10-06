'use strict';

const readline = require('readline');

const output = stream => {
  const render = (...lines) => {
    if (!process.env.DEBUG) {
      render.clear();
      stream.write(`${lines.join('\n')}\n`);
    }
  };

  render.clear = () => {
    readline.cursorTo(stream, 0, 0);
    readline.clearScreenDown(stream);
  };

  return render;
};

module.exports = output(process.stdout);
module.exports.create = output;
