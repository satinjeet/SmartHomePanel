import { h, Component } from 'preact';
import Router from 'preact-router';
import { Container } from '../playground/container';
import { BridgeInfo } from '../Components/BridgeInfo/BridgeInfo';
import { Devices } from '../Components/Devices/Devices';
import { RTConnection } from '../Connection/realtime';
import { WeatherWidget } from '../Components/WeatherWidget/WeatherWidget';
import { Time } from '../Components/Time/Time';
// import { FaceDetector } from '../Components/FaceDetector/FaceDetector';

interface IMainState {
    bridgeFound: boolean;
}

export class IndividualComponentRouter extends Component<any, any> {
    render() {
        return [
            <Devices path="/devices" />,
            <WeatherWidget path="/weather" />,
            <Time path="/time" />
        ]
    }
}

export class Main extends Component<any, any> {
    state = {
        bridgeFound: false
    }

    componentDidMount() {
        RTConnection
    }

    render() {
        return <div class="row">
            <div class="row">
                <BridgeInfo onBridgeFound={found => {
                    this.setState({ bridgeFound: found });
                }}/>
            </div>
            {
                this.state.bridgeFound && <div class="row">
                    <Router>
                        <div class="row" path="/">
                            <div class="row">
                                <Time />
                                <WeatherWidget />
                            </div>
                            <Devices />
                            {/* <FaceDetector /> */}
                        </div>
                        <Devices path="/_/devices" />
                        <WeatherWidget path="/_/weather" />
                        <Time path="/_/time" />
                        <Container path="/_/about" />
                    </Router>
                </div>
            }
            <a class="btn-floating btn-large waves-effect waves-light teal right" style={{
                bottom: '5px',
                position: 'absolute',
                left: '5px'
            }} onClick={() => {
                document.querySelector('#root').requestFullscreen();
            }}>
                <i class="material-icons">fullscreen</i>  
            </a>
        </div>
    }
}