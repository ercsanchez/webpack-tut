import HelloWorldButton from './components/hello-world-button/hello-world-button.js';
import Header from './components/header/header.js';
import addImage from "./add-image.js";

const helloWorldBtn = new HelloWorldButton();
helloWorldBtn.render();
const header = new Header();
header.render();
addImage();

if (process.env.NODE_ENV === 'production') {
  console.log('Production Mode');
} else if (process.env.NODE_ENV === 'development') {
  console.log('Development Mode');
}