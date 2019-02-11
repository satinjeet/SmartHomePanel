import { h, Component } from 'preact';
import { RTConnection } from '../Connection/realtime';
import { CircleSlider } from "./internal/src/index";

const colorShades = [
    'lighten-5 black-text',
    'lighten-4 black-text',
    'lighten-3 black-text',
    'lighten-2 black-text',
    'lighten-1',
    '',
    'darken-1',
    'darken-2',
    'darken-3',
    'darken-4',
    'black',
].reverse();

interface ILight {
    key: number;
    requestPending: boolean;
    state: {
        on: boolean,
        bri: number,
        alert: string,
        mode: string,
        reachable: boolean
    },
    swupdate: {
        state: string,
        lastinstall: string //2019-01-27T13:22:34
    },
    type: "Dimmable light" | string,
    name: string,
    modelid: string,
    manufacturername: string,
    productname: string,
    capabilities: {
        certified: boolean,
        control: {
            mindimlevel: 5000, maxlumen: 840
        },
        streaming: {
            renderer: false,
            proxy: false
        }
    },
    config: {
        function: "functional" | string,
        direction: "omnidirectional" | string,
    },
    uniqueid: string
}

interface IDeviceState {
    lights: ILight[]
}

export class Devices extends Component<any, IDeviceState> {
    state: IDeviceState = {
        lights: []
    }
    componentDidMount() {
        this.refreshDevices();
        RTConnection.subscribe("event.devices.list", this.refreshDevices)
    }

    render() {
        return <div class="row devices">
            <div class="row">
            {
                this.state.lights.map((light, index) => {
                    const isOn = light.state.on;
                    return <a class="clickable-area" href="#">
                        <div class="col s3 m3" key={`light-${index}`}>
                            <div class="card">
                                {
                                    light.requestPending && <div class="progress">
                                        <div class="indeterminate teal"></div>
                                    </div>
                                }
                                <div class="card-content row" style={
                                    { filter: isOn? 'none': 'grayscale(100%)' }
                                }>
                                    <span class="card-title">
                                        {light.name}
                                    </span>
                                    <CircleSlider
                                        value={Math.round(light.state.bri / 254 * 100)}
                                        onChange={e => {
                                            console.log(e);
                                            this.setLightBrightness(light, index, 254 * (e / 100));
                                        }}
                                        isOn={isOn}
                                        onClick={this.turnLightOnAndOff.bind(this, light, index, !isOn)}
                                    />
                                </div>
                            </div>
                        </div>
                    </a>
                })
            }
            </div>
        </div>;
    }

    private refreshDevices = () => {
        fetch("/api/devices").then(res => {
            res.json().then((lights) => {
                const lightList = [];
                for (let key in lights) {
                    lights[key].key = key;
                    lights[key].requestPending = false;
                    lightList.push(lights[key]);
                }

                this.setState({ lights: lightList });
            });
        });
    }

    private turnLightOnAndOff(light: ILight, index: number, turnOn: boolean = true) {
        console.log("Request to ", light.name, turnOn);
        const lights = this.state.lights;
        lights[index].requestPending = true;

        this.setState({ lights }, () => {
            fetch(`/api/devices/${light.key}`, {
                method: "POST",
                body: JSON.stringify({ lampOn: turnOn }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });
    }

    private setLightBrightness(light: ILight, index: number, brightNess: number) {
        console.log("Request to set brightness", light.name, brightNess);
        const lights = this.state.lights;
        lights[index].requestPending = true;
        lights[index].state.bri = brightNess;

        this.setState({ lights }, () => {
            fetch( `/api/devices/${light.key}`, {
                method: "POST",
                body: JSON.stringify({ bri: brightNess }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });
    }
}