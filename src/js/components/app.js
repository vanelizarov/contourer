import React, {Component} from 'react';

import VirtualVideo from './virtualVideo';
import FrameView from './frameView';

import noise from '../logic/noise';
import gaussian from '../logic/gaussian';
import sobel from '../logic/sobel';
import laplace from '../logic/laplace';
import roberts from '../logic/roberts';

import * as types from '../logic/types';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1>Contourer</h1>
                </div>
                <div className="row">
                    <VirtualVideo />
                    <FrameView original={true}
                               title={'Original'}
                    />
                    <FrameView title={'Noise'}
                               procFunc={noise.process}
                               type={types.NOISE}
                    />
                    <FrameView title={'Gaussian'}
                               procFunc={gaussian.process}
                               type={types.GAUSSIAN}
                               typeToProc={types.NOISE}
                    />
                </div>
                <div className="row">
                    <FrameView title={'Sobel'}
                               procFunc={sobel.process}
                               type={types.SOBEL}
                    />
                    <FrameView title={'Laplace'}
                               procFunc={laplace.process}
                               type={types.LAPLACE}
                    />
                    <FrameView title={'Roberts'}
                               procFunc={roberts.process}
                               type={types.ROBERTS}
                    />
                </div>
            </div>
        );
    }

}

export default App;