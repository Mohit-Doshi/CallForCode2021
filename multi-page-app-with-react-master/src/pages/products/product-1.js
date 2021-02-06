import React from 'react';
import ReactDOM from 'react-dom';
import Uploader from 'components/Uploader';

import './product-1.css';
import productPicture from './product-logo.png';

ReactDOM.render(<Uploader />, document.getElementById('menu'));
document.getElementById('product-pic').setAttribute('src', productPicture);
