const initState = {
    currentUserData: {},
    currentUserId: '',
    memberData: null,
    allMembers: [],
    currentMember: {
        allMsg: []
    },
    directMsgs:[]
}

export default function rootReducer(state=initState, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS': {
            let user = {
                userInfo: action.data,
                userData: []
            }
            return {
                ...state,
                currentUserData: user,
                currentUserId: action.data._id
            }
        }
        case 'SUCCESSFULLY_JOIN': {
            return {
                ...state,
                memberData: action.data
            }
        }
        case 'ALL_MEMBERS': {
            return {
                ...state,
                allMembers: action.data
            }
        }
        case 'GET_MESSAGES': {
            return {
                ...state,
                currentMember: {
                    ...state.currentMember,
                    allMsg: action.data
                }
            }
        }
        case 'LOGOUT_SUCCESS': {
            return {
                ...state,
                currentUserData: {},
                currentUserId: ''
            }
        }
        case 'GET_DIRECT_MSG': {
            return {
                ...state,
                directMsgs: action.data
            }
        }
        default:
        return state;
    }
}