import {
    getAllGroupsString,
} from '../constants/actionStrings';

export default (state = {}, action) => {
    console.log("GROUP REDUCER action ----------XXXX", action.payload);
    switch (action.type) {
        case getAllGroupsString:
            return {
                ...state,
                groups: action.payload.data,
            }
        default:
            return state;
    }
};
