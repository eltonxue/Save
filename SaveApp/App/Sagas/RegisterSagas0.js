import { call, put } from 'redux-saga/effects'
import RegisterActions from '../Redux/RegisterRedux'
import deviceStorage from '../Lib/deviceStorage'

export function* registerUser(api, action) {
  const { fullName, email, password, confirmPassword } = action
  // make the call to the api

  deviceStorage.loadJWT().then(jwt => console.log('JWT=', jwt))

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

    yield put(RegisterActions.registerSuccess(response))
  } else {
    yield put(RegisterActions.registerFailure(response))
  }
}
