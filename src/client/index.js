import {render, h} from 'preact';

const root = document.querySelector('#root');
while (root.firstChild) {
    root.removeChild(root.firstChild);
}

render(
    <div>Hello World!! now</div>,
    root
)