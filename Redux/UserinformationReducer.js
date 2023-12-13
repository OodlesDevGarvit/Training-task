
import { SAVE_USER_INFORMATION } from "./constants";

const initialstate = []
const UserinformationReducer = (state = initialstate, action) => {

    switch (action.type) {
        case 'SAVE_USER_INFORMATION':
            return [...state, action.payload]

        default: return state;
    }

}

export default UserinformationReducer;