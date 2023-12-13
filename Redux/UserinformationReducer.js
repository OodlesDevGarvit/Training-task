
import { SAVE_USER_INFORMATION } from "./constants";

const initialstate = {
    users: [],
    data: {
        name: "Garvit"
    }
}
const UserinformationReducer = (state = initialstate, action) => {

    switch (action.type) {
        case 'SAVE_USER_INFORMATION':
            return {
                ...state,
                users: [...state.users, action.payload]
            }

        default: return state;
    }

}

export default UserinformationReducer;