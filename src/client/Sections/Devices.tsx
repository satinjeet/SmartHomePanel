import { h, Component } from 'preact';

interface ILight {
    key: number;
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
    }

    render() {
        return <div class="row">
            <div class="row">
            {
                this.state.lights.map(light => {
                    const isOn = light.state.on;
                    return <div class="col s12 m6">
                        <div class="card">
                            <div class={"card-image backdrop-grad" + (!isOn ? ' backdrop-grad--off': '')}>
                                
                                <span class="card-title">
                                    <i class="material-icons medium">lightbulb_outline</i> { light.name }
                                </span>
                                <a 
                                    class={"btn-floating halfway-fab waves-effect waves-light " + (isOn? 'teal': 'grey')}
                                    onClick={this.turnLightOnAndOff.bind(this, light, !isOn)}
                                >
                                    {
                                        isOn ?
                                            <i class="material-icons">remove_circle</i>:
                                            <i class="material-icons">wb_sunny</i>
                                    }
                                </a>
                            </div>
                                <div class="card-content">
                                    <p>
                                        { light.name } <span
                                            class={
                                                
                                                [
                                                    'white-text',
                                                    !isOn ? 'grey': 'teal',
                                                    'badge'
                                                ].join(' ')
                                            }
                                        >{ isOn ? 'On': 'Off' }</span>
                                        {
                                            light.state.on && `is at ${ light.state.bri / 254 * 100}%`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                })
            }
            </div>
        </div>;
    }

    private refreshDevices() {
        fetch("/api/devices").then(res => {
            res.json().then((lights) => {
                const lightList = [];
                for (let key in lights) {
                    lights[key].key = key;
                    lightList.push(lights[key]);
                }

                this.setState({ lights: lightList });
            });
        });
    }

    private turnLightOnAndOff(light: ILight, turnOn: boolean = true) {
        console.log("Request to ", light.name, turnOn);
        fetch(
            `/api/devices/${light.key}`,
            {
                method: "POST",
                body: JSON.stringify({ lampOn: turnOn })
            }
        ).then(() => this.refreshDevices()).catch(() => this.refreshDevices())
    }
}