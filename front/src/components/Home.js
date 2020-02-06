import * as React from 'react';
import ImagesSelector from './../components/ImagesSelector';
import Slider from './../components/Slider';
import Viewer from './../components/Viewer';

class Home extends React.Component {
    render() {
        return (
            <div>
                <ImagesSelector></ImagesSelector>
                <Slider></Slider>
                <Viewer></Viewer>
            </div>
        );
    }
}

export default Home;