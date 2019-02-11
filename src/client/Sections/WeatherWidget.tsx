import { h } from 'preact';

export function WeatherWidget(): JSX.Element {
    return <div class="row">
        <a class="weatherwidget-io" href="https://forecast7.com/en/43d62n79d51/etobicoke/" data-label_1="ETOBICOKE" data-label_2="=> Weather" data-font="Ubuntu" data-icons="Climacons Animated" data-theme="dark" >ETOBICOKE => Weather</a>
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