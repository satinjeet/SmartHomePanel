import { h, render } from 'preact';
import { Container } from './playground/container';

const root = document.querySelector('#root');
while (root.firstChild) {
    root.removeChild(root.firstChild);
}

render(
    <Container />,
    root
)