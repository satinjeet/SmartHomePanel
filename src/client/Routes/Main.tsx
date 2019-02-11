import { h, Component } from 'preact';
import Router from 'preact-router';
import { Container } from '../playground/container';
import { BridgeInfo } from '../Sections/BridgeInfo';
import { Devices } from '../Sections/Devices';
import { RTConnection } from '../Connection/realtime';
import { WeatherWidget } from '../Sections/WeatherWidget';

interface IMainState {
    bridgeFound: boolean;
}

export class Main extends Component<any, any> {
    state = {
        bridgeFound: false
    }

    componentDidMount() {
        RTConnection
    }

    render() {
        return <div class="row" >
            <div class="row">
                <BridgeInfo onBridgeFound={found => {
                    this.setState({ bridgeFound: found });
                }}/>
            </div>
            <WeatherWidget />
            {
                this.state.bridgeFound && <div class="row">
                    <Router>
                        <Container path="/_/about" />
                        <Devices path="/" />
                        <Devices path="/_" />
                    </Router>
                </div>
            }
            <a class="btn-floating btn-large waves-effect waves-light teal right" style={{
                bottom: '5px',
                position: 'absolute',
                right: '5px'
            }} onClick={() => {
                document.querySelector('#root').requestFullscreen();
            }}>
                <i class="material-icons">fullscreen</i>  
            </a>
        </div>
    }
}