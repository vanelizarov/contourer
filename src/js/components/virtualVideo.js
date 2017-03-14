import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
    setVideoStream,
    setCanPlay
} from '../actions';

require('webrtc-adapter');

class VirtualVideo extends Component {

    componentDidMount() {

        const constraints = {
            audio: false,
            video: {
                width: 320,
                height: 240,
                facingMode: 'user'
            }
        };

        window.navigator.mediaDevices.getUserMedia(constraints)
            .then(this._onMediaStream.bind(this))
            .catch(this._onStreamError);

    }

    _onMediaStream(stream) {
        window.stream = stream;
        this.virtualVideo.srcObject = stream;
        this.props.setVideoStream({
            videoStream: this.virtualVideo
        });
    }

    _onStreamError(error) {
        let errStr = `${error}`;
        console.log(`--> Error getting video stream: ${errStr}`);
        window.alert(errStr);
    }

    _onCanPlay() {
        this.props.setCanPlay();
    }

    render() {
        return (
            <video autoPlay={true}
                   className={'virtual-video'}
                   ref={(virtualVideo) => { this.virtualVideo = virtualVideo }}
                   onCanPlay={this._onCanPlay.bind(this)}>

            </video>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        types: state.exchanges.types
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setVideoStream: setVideoStream,
        setCanPlay: setCanPlay
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(VirtualVideo);