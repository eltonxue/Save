import { call, put } from 'redux-saga/effects'
import AuthenticationActions from '../Redux/AuthenticationRedux'
import deviceStorage from '../Lib/deviceStorage'

export function* registerUser(api, action) {
  const { fullName, email, password, confirmPassword } = action
  // make the call to the api

  // deviceStorage.loadJWT().then(jwt => console.log('JWT=', jwt))

  const response = yield call(
    api.postRegister,
    fullName,
    email,
    password,
    confirmPassword
  )

  if (response.ok) {
    // do data conversion here if needed

    // Save inside async storage
    deviceStorage.saveItem('jwt', response.data.data.jwt)

    yield put(AuthenticationActions.registerSuccess(response))
  } else {
    yield put(AuthenticationActions.registerFailure(response))
  }
}

export function* loginUser(api, action) {
  const { email, password } = action
  // make the call to the api

  // deviceStorage.loadJWT().then(jwt => console.log('JWT=', jwt))

  console.log('about to make api call...', action)
  const response = yield call(api.postLogin, email, password)

  console.log('made the api call...')
  if (response.ok) {
    // do data conversion here if needed

    // Save inside async storage
    deviceStorage.saveItem('jwt', response.data.data.jwt)

    yield put(AuthenticationActions.loginSuccess(response))
  } else {
    yield put(AuthenticationActions.loginFailure(response))
  }
}
