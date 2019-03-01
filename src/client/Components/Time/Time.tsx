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
        const hh = this.state.date.getHours();
        const mm = this.state.date.getMinutes();
        const ss = this.state.date.getSeconds();

        // console.log(hh, mm, ss)
        return <div class="row col s12 m12 l7 valign-wrapper" style={{ minHeight: 205 }}>
            <div class="col s12 m12 l12 center-align">
                <Numbers role="hour" rangeFrom={0} rangeTo={24} val={this.state.date} size="lg"/>
                <Numbers role="min" rangeFrom={0} rangeTo={59} val={this.state.date} size="lg"/>
                <Numbers role="sec" rangeFrom={0} rangeTo={59} val={this.state.date} size="lg"/>
            </div>
        </div>
    }
}