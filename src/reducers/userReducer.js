const defaultState = {
  isLogin: null,
  dataUser: null,
  phoneNumbers: null
}

const userReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, isLogin: true, dataUser: action.payload}

    case 'LOGOUT':
      return {...state, isLogin: false, dataUser: null, phoneNumbers: null}

    case 'GET_PHONE_NUMBERS':
      return {...state, phoneNumbers: action.payload}

  default:
    return state
  }
}

export default userReducer
