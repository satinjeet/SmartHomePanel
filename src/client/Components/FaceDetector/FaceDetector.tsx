import { h, Component } from "preact";
import 'tracking'

export class FaceDetector extends Component {
    private video: HTMLVideoElement;
    private canvas: HTMLCanvasElement;
    private ccontext: CanvasRenderingContext2D;

    componentDidMount() {
        console.log(this);
        var tracker = new tracking.ObjectTracker('face');
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);
    }

    render() {
        return <div>
            <video 
                id="video"
                width="320"
                height="240"
                preload="preload"
                autoplay={true}
                loop={true}
                muted={true}
                ref={el => this.video = el}
            ></video>
            <canvas
                id="canvas"
                width="320"
                height="240"
                ref={(el: HTMLCanvasElement) => {
                    this.canvas = el;
                    this.ccontext = el.getContext('2d');
                }}
            ></canvas>
        </div>
    }
} 
