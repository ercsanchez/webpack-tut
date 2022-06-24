import Kiwi from "./kiwi.jpg"
import "./kiwi-image.scss"

class KiwiImage {
  render() {
    const img = document.createElement("img");
    img.src = Kiwi;
    img.alt = 'Kiwi';
    img.classList.add('kiwi-image');

    const bodyEl = document.querySelector("body");
    bodyEl.appendChild(img);
  }
}
export default KiwiImage;