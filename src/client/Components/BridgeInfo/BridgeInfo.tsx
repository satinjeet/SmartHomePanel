import { h, Component } from 'preact';
import moment, { Moment } from 'moment';
import * as M from 'materialize-css/dist/js/materialize';

interface IBridgeInfoState {
    ip: string;
    previousList: {
        ip: string;
        date: Moment;
    }[];
}

interface IBridgeInfoProps {
    onBridgeFound: (found: boolean) => void;
}

export class BridgeInfo extends Component<IBridgeInfoProps, IBridgeInfoState> {

    state: IBridgeInfoState = {
        ip: '0.0.0.0',
        previousList: []
    }

    private interval: number;
    private el: HTMLAnchorElement;

    componentDidMount() {
        // clearInterval(this.interval);

        this.fetchBridgeInfo();
        // this.interval = setInterval(this.fetchBridgeInfo, 10000);
        M.Dropdown.init(this.el);
    }

    componentWillUnmount() {
        // clearInterval(this.interval);
    }

    render() {
        return <nav class="blue darken-4 col s12 main-nav">
            <div class="nav-wrapper">
                <a href="#" class="custom-logo">
                    Bridge - { this.state.ip }
                </a>
                {/* <!-- Dropdown Trigger --> */}
                <a class='dropdown-trigger right row' href='#' data-target='dropdown1' ref={el => this.el = el}>
                    <i class="material-icons col s2">arrow_drop_down</i><span class="col s10">Previously Saved Addresses!</span>
                </a>

                {/* <!-- Dropdown Structure --> */}
                <ul id='dropdown1' class='dropdown-content'>
                    
                        {
                            this.state.previousList.map((pli, index) =>
                                <li>
                                    <a href="#" key={`pli-${index}`}>
                                        { pli.ip } - {pli.date.format('YYYY-MM-DD')} at { pli.date.format('HH:mm P') }
                                    </a>
                                </li>
                            )
                        }
                </ul>
            </div>
        </nav>
    }

    private fetchBridgeInfo = () => {
        fetch("/api/bridge").then((res) => {
            res.json().then(({ body }) => {
                const { fullList: previousList, ip } = body;
                const pList = previousList.map(p => {
                    p.date = moment(p.on);
                    return p;
                });

                this.setState({
                    ip,
                    previousList: pList
                });
                this.props.onBridgeFound(true);
            });
        }).catch(() => {
            this.props.onBridgeFound(false);
        });
    }
}