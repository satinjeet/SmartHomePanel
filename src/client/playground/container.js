import { Component, h} from 'preact';
export class Container extends Component {
    render() {
        return <div class="row">
            <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">Demo Application</span>
                        <p>
                            <p>Here <b>Parcel</b> bundler is used to build the Javascript using <b>Preact</b>.</p>
                            <p>CSS layout is using <b>Materialize</b>.</p>

                            <p>Page is served by <b>Express</b> application on a node server.</p>
                            <p>Templates provided by <b>Pug</b>.</p>

                            <p>
                                Usage: <code>
                                    <br />
                                    npm install
                                    <br />
                                    npm start
                                </code>
                            </p>
                        </p>
                    </div>
                    <div class="card-action">
                        <a target="_blank" href="https://parceljs.org/">Parcel</a>
                        <a target="_blank" href="https://preactjs.com/">Preact</a>
                        <a target="_blank" href="https://materializecss.com/">Materialize</a>
                        <a target="_blank" href="https://expressjs.com/">Express</a>
                        <a target="_blank" href="https://pugjs.org/">Pug</a>
                    </div>
                </div>
            </div>
        </div>
    }
}