import HelloWorldButton from "./components/hello-world-button/hello-world-button";
import Header from "./components/header/header";

const header = new Header();
const helloWorldBtn = new HelloWorldButton();

header.render();
helloWorldBtn.render();

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode');
} else if (process.env.NODE_ENV === 'development') {
  console.log('Development mode');
}