import './reactApp.jsx';
import my from './my.js';
import '../styles/main.scss'; //cssをモジュールとしてインポートする。

import add from './add.ts';

console.log('webpack!');
my();

console.log(add(3, 9));
