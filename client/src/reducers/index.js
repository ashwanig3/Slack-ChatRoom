const initState = {
    currentUserData: {},
    currentUserId: ''
}

export default function rootReducer(state=initState, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS': {
            let user = {
                userInfo: action.data,
                userData: []
            }
            return {
                currentUserData: user,
                currentUserId: action.data._id
            }
        }
        default:
        return state;
    }
}