import { h, render } from 'preact';
import { Main } from './Routes/Main';

const root = document.querySelector('#root');

while (root.firstChild) {
    root.removeChild(root.firstChild);
}

render(<Main />, root);