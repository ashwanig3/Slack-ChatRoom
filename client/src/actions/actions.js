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