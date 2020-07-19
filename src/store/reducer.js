import * as actionTypes from './actions';

const initialState = {
    answers: [{
        count: 0,
        name: 'Piyush Agarwal',
        email: 'piyushagarwal490gmail.com',
        answerText: 'Sample answer by Piyush Agarwal. Sample answer by Piyush Agarwal. Sample answer by Piyush Agarwal. Sample answer by Piyush Agarwal.',
        blobURL: 'null'
    }]
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LIKE_ANSWER: {
            return {
                ...state,
                answers: state.answers.map((answer, ind) => 
                    ind === action.payload.index ? 
                    { ...state.answers[action.payload.index], 
                        count: ++state.answers[action.payload.index].count 
                    } : answer)
            };
        }
        case actionTypes.DISLIKE_ANSWER: {
            return {
                ...state,
                answers: state.answers.map((answer, ind) => 
                    ind === action.payload.index ? 
                    { ...state.answers[action.payload.index], 
                        count: --state.answers[action.payload.index].count 
                    } : answer)
            };
        }
        case actionTypes.ADD_ANSWER: {
            return {
                ...state,
                answers: [...state.answers, action.payload]
            }
        }
        default:
            return state;
    }
};

export default reducer;