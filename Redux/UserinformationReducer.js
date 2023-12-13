
import { SAVE_USER_INFORMATION } from "./constants";

const initialstate = [{
    deviceid: "",
    lat: "",
    long: "",
    photo: "",
}]
 const UserinformationReducer = (state = initialstate, action) => {

    switch (action.type) {
        case 'SAVE_USER_INFORMATION':
            return [{
                ... state,
                data : action.payload
            }]
            default : return state;
    }
    
}

export default UserinformationReducer;