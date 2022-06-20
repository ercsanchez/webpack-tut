import HelloWorldButton from './components/hello-world-button/hello-world-button.js';
import Header from './components/header/header.js';
import addImage from "./add-image.js";

const helloWorldBtn = new HelloWorldButton();
helloWorldBtn.render();
const header = new Header();
header.render();
addImage();