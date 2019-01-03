const url = 'http://localhost:4400/api'

export const signUpAction = (data) => {
    console.log("check2")
    return (dispatch) => {
      fetch(`${url}/signup`, {
        method : "POST", 
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
          console.log(data)
        if(data.responseStatus === '200') {
          dispatch({type: 'SIGNUP_SUCCESS', data})
        } else {
          dispatch({type: 'SIGNUP_ERR', data})
        }
      })
    }
  }

  export const logInAction = (data) => {
    return (dispatch) => {
      fetch(`${url}/login`, {
        method : "POST", 
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.user._id) {
          dispatch({type: 'LOGIN_SUCCESS', data: data.user})
        } else {
          dispatch({type: 'LOGIN_ERR', data})
        }
      })
    }
    
  }

  export function postMsg(data) {
    return dispatch => {
      fetch(`${url}/message`, {
        method : "POST", 
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({type: 'MESSAGE_POST_SUCCESSFUL', data})
      })
    }
  }

  export function joinChannel(data) {
    console.log(data)
    return dispatch => {
      fetch(`${url}/join`, {
        method : "POST", 
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
      }).then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({type: 'SUCCESSFULLY_JOIN', data: data.user})
      })
    }
  }

  export function getAllMembers() {
    return dispatch => {
      fetch(`${url}/batch1/members`)
      .then(res => res.json())
      .then(data => {
        dispatch({type: 'ALL_MEMBERS', data: data.users})
      })
    }
  }

  export function getMessages() {
    return dispatch => {
      fetch(`${url}/message`)
      .then(res => res.json())
      .then(data => {
        dispatch({type: 'GET_MESSAGES', data: data.allMsg})
      })
    }
  }

  export function whoAmI() {
    return dispatch => {
      fetch('/api/whoami')
      .then(res => res.json()) 
      .then(data =>{
        console.log(data, "whoAmI")
        dispatch({type: 'LOGIN_SUCCESS', data: data.user})
      })
    } 
  }

  export function signedOut() {
    return dispatch => {
      fetch('/api/logout').then(res => res.json())
      .then(data => {
        dispatch({type: 'LOGOUT_SUCCESS', data})
      })
    }
  }