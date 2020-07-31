import { FormActionTypes } from  './form.types'

const INITIAL_STATE = {
    data: null
}


const formReducer = ( state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FormActionTypes.SET_FORM_DATA :
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}


export default formReducer;