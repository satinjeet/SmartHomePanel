import { h, Component } from 'preact';
import Router from 'preact-router';
import { Container } from '../playground/container';
import { BridgeInfo } from '../Sections/BridgeInfo';
import { Devices } from '../Sections/Devices';

interface IMainState {
    bridgeFound: boolean;
}

export class Main extends Component<any, any> {
    state = {
        bridgeFound: false
    }

    render() {
        return <div class="row" >
            <div class="row">
                <BridgeInfo onBridgeFound={found => {
                    this.setState({ bridgeFound: found });
                }}/>
            </div>
            {
                this.state.bridgeFound && <div class="row">
                    <Router>
                        <Container path="/_/about" />
                        <Devices path="/" />
                        <Devices path="/_" />
                    </Router>
                </div>
            }
        </div>
    }
}