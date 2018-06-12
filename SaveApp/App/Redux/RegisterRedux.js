import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerRequest: ['fullName', 'email', 'password', 'confirmPassword'],
  registerSuccess: ['response'],
  registerFailure: null
})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  response: null,
  fetching: null,
  error: null,
  fullName: null,
  email: null,
  password: null,
  confirmPassword: null
})

/* ------------- Selectors ------------- */

export const registerSelectors = {
  selectRegisteredUser: state => state.register.response
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (
  state,
  { fullName, email, password, confirmPassword }
) =>
  state.merge({
    fetching: true,
    fullName,
    email,
    password,
    confirmPassword,
    response: null
  })

// successful avatar lookup
export const success = (state, action) => {
  const { user } = action
  return state.merge({ fetching: false, error: null, response })
}

// failed to get the avatar
export const failure = state =>
  state.merge({ fetching: false, error: true, response })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure
})
