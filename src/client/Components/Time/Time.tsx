import { h, Component } from 'preact';
import { Numbers } from './sub/Numbers';

export class Time extends Component {

    state = {
        date: new Date
    }

    private timerId = 0;

    componentDidMount() {
        this.timerId = window.setInterval(() => {
            this.setState({ date: new Date })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return <div class="row col s12 m12 l7 valign-wrapper" style={{ minHeight: 205 }}>
            <div class="col s12 m12 l12 center-align">
                <Numbers role="hour" rangeFrom={0} rangeTo={24} val={this.state.date} size="mlg"/>
                <Numbers role="min" rangeFrom={0} rangeTo={59} val={this.state.date} size="mlg"/>
                <Numbers role="sec" rangeFrom={0} rangeTo={59} val={this.state.date} size="mlg"/>
            </div>
        </div>
    }
}