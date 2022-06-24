import styles from './header.module.scss';

class Header {
  render(pageName) {
    const h1 = document.createElement('h1');
    const body = document.querySelector('body');
    h1.innerHTML = `This is the ${pageName} page`;
    body.appendChild(h1);
  }
}

export default Header;