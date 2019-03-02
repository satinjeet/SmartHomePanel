import { h, Component } from 'preact';

export class WeatherWidget extends Component {

    state = {
        refreshTimer: new Date()
    }

    constructor() {
        super();
    }

    componentDidMount() {
        const { debugThis } = window as any;

        if (debugThis) {
            setInterval(() => {
                debugThis && console.log('Updating Weather Info');

                const { __weatherwidget_init } = window as any;
                this.setState({ refreshTimer: new Date() }, () => { __weatherwidget_init(); });
            }, 1 * 60 * 60 * 1000)
        }
    }

    render() {
        return <div class={`row col s12 m12 l5`} key={this.state.refreshTimer.getTime()}>
            <a
                class="weatherwidget-io col s12 m12"
                href="https://forecast7.com/en/43d62n79d51/etobicoke/"
                data-label_1="ETOBICOKE"
                data-label_2="=> Weather"
                data-font="Ubuntu"
                data-icons="Climacons Animated"
                data-theme="dark"
                key={this.state.refreshTimer.getTime()}
            >
                ETOBICOKE => Weather
            </a>
            <script>
                {
                    `!function(d,s,id){
                                var js,fjs=d.getElementsByTagName(s)[0];
                                if(!d.getElementById(id)){
                                    js = d.createElement(s);
                                    js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';
                                    fjs.parentNode.insertBefore(js,fjs);
                                }
                            }(document,'script','weatherwidget-io-js');`
                }
            </script>
        </div>
    }
}