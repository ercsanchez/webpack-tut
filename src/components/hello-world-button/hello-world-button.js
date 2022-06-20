// import "./hello-world-button.scss";
import styles from "./hello-world-button.module.scss";

class HelloWorldButton {
  // buttonCssClass = 'hello-world-button';

  render() {
    console.log(styles);
    const button = document.createElement("button");
    button.innerHTML = "Hello World!";
    button.classList.add(`${styles[`hello-world-button`]}`);
    const body = document.querySelector("body");
    button.onclick = () => {
      const p = document.createElement("p");
      p.innerHTML = "Hello World!";
      p.classList.add(styles['hello-world-text']);
      body.appendChild(p);
    }
    button.classList.add(styles[`hello-world-button`]);
    body.appendChild(button);
  }
}

export default HelloWorldButton;