import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
    setImageData
} from '../actions';

import types from '../logic/types';

class FrameView extends Component {

    componentDidMount() {
        if (this.props.original) {

            window.setInterval(() => {

                if (this.props.videoStream && this.props.canPlay) {
                    let cameraContext = this.outputView.getContext('2d');
                    let {width: w, height: h} = this.outputView;

                    cameraContext.drawImage(this.props.videoStream, 0, 0, w, h);

                    let imageData = cameraContext.getImageData(0, 0, w, h);
                    this.props.setImageData({
                        type: types.ORIGINAL,
                        data: imageData
                    });
                }

            }, this.props.interval);

        } else {

            window.setInterval(() => {

                if (this.props.videoStream && this.props.canPlay) {

                    const {
                        procFunc,
                        type,
                        types,
                        typeToProc,
                        setImageData
                    } = this.props;

                    const processable = types[typeToProc].data;

                    if (procFunc) {

                        procFunc(processable)
                            .then((processed) => {
                                setImageData({
                                    type: type,
                                    data: processed
                                });
                                this.outputView.getContext('2d').putImageData(processed, 0, 0);
                            });

                    }

                }

            }, this.props.interval);

        }
    }

    render() {
        if (this.props.canPlay) {
            return (
                <div className={'frame-view'} >
                    <div className="frame-view--output-wrapper"
                         data-title={this.props.title}>
                        <canvas className="frame-view--output"
                                ref={(outputView) => {this.outputView = outputView}}>
                        </canvas>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="frame-view">
                    <div className="frame-view--message">
                        No stream available
                    </div>
                </div>
            )
        }
    }

}

FrameView.propTypes = {
    original: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    procFunc: React.PropTypes.func,
    interval:  React.PropTypes.number,
    typeToProc: React.PropTypes.string
};

FrameView.defaultProps = {
    original: false,
    typeToProc: types.ORIGINAL,
    interval: 40
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setImageData: setImageData,
    }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        videoStream: state.exchanges.videoStream,
        types: state.exchanges.types,
        canPlay: state.exchanges.canPlay,
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(FrameView);