import Header from './components/header/header.js';
import KiwiImage from './components/kiwi-image/kiwi-image.js';
import React from 'react';

const header = new Header();
const kiwiImg = new KiwiImage()
header.render('kiwi');
kiwiImg.render();

