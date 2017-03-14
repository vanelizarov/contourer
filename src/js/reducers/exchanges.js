import * as actionTypes from '../actions/types';

export default (state = {canPlay: false}, action) => {

    switch (action.type) {
        case actionTypes.SET_CAN_PLAY:
            return Object.assign({}, state, {
                canPlay: true
            });

        case actionTypes.SET_VIDEO_STREAM:
            return Object.assign({}, state, {
                videoStream: action.payload.videoStream
            });

        case actionTypes.SET_IMG_DATA:
            const {data, type} = action.payload;

            return Object.assign({}, state, {
                types: Object.assign({}, state.types, {
                    [type]: {
                        data
                    }
                })
            });

        default:
            return state;
    }
};