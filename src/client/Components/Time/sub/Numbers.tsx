import { h, Component } from "preact";

interface INumberChartProps {
    rangeFrom: number;
    rangeTo: number;
    val: Date;
    role: 'none' | 'sec' | 'min' | 'hour';
    size?: 'sm' | 'med' | 'lg' | 'xlg';
}

/**
 * Only Positive Integers for now
 */
export class Numbers extends Component<INumberChartProps, any> {

    static counter = 0;

    private numberRange = [];
    private lastNumber = 0;
    private firstNumber = 0;
    private elRef: HTMLDivElement;
    private counter = 0;

    public state = {
        current: 0
    }

    constructor(props: INumberChartProps) {
        super(props);
        // console.log('CONS', props);
        let i = this.firstNumber = props.rangeFrom || 0;
        const j = this.lastNumber = props.rangeTo || 100;
        do {
            this.numberRange.push(`0${i++}`.slice(-2));
        } while (i <= j);
        this.counter = ++Numbers.counter;
    }

    componentDidMount = () => {
        this.scrollTargetNumber(this.props, true);
    }

    componentWillReceiveProps = (newProps: INumberChartProps) => {
        this.scrollTargetNumber(newProps, false);
    }

    render() {
        const { current } = this.state;
        const size = this.props.size || 'sm';
        const next = current == this.lastNumber ? this.firstNumber : current + 1;
        return <div class={`viewer ${this.counter}`} ref={el => this.elRef = el}>
            <div class={`viewer-area ${size} blue darken-4 white-text`}>
                {
                    this.numberRange.map(num =>
                        <div key={`num-${this.counter}-${num}`} class={[
                            "center-align",
                            "single-cell",
                            `number-${this.counter}-${num}`,
                            this.props.role,
                            'fade-transition',
                            this.state.current == num ? 'fade-in' : 'fade-out'
                        ].join(' ')}>
                            {num}
                        </div>
                    )
                }
            </div>
        </div>
    }

    private getValue(val: Date) {
        const { role } = this.props;
        switch (role) {
            case 'min': return val.getMinutes();
            case 'sec': return val.getSeconds();
            default: return val.getHours();
        }
    }

    private scrollTargetNumber = ({ val }, instantly: boolean) => {
        // const value = this.getValue(val);
        this.setState({
            current: this.getValue(val)
        })
        // instantly = instantly || (value === this.firstNumber);

        // const el: HTMLDivElement = this.elRef.querySelector(`.single-cell.number-${this.counter}-${value}`);
        // if (el) {
        //     el.scrollIntoView({ behavior: instantly ? "auto": "smooth" });
        // }
    }
}