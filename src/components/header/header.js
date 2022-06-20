import styles from './header.module.scss';

class Header {
  render() {
    const h1 = document.createElement('h1');
    const body = document.querySelector('body');
    h1.innerHTML = 'This is the Header';
    body.appendChild(h1);
  }
}

export default Header;