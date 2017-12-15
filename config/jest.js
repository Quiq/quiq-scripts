const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

global.requestAnimationFrame = cb => {
  setTimeout(cb, 0);
};

Enzyme.configure({adapter: new Adapter()});
