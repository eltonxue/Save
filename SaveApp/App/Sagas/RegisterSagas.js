import { call, put } from 'redux-saga/effects'
import RegisterActions from '../Redux/RegisterRedux'

export function* registerUser(api, action) {
  const { fullName, email, password, confirmPassword } = action
  // make the call to the api

  const response = yield call(
    api.postRegister,
    fullName,
    email,
    password,
    confirmPassword
  )

  if (response.ok) {
    // do data conversion here if needed

    yield put(RegisterActions.registerSuccess(response))
  } else {
    yield put(RegisterActions.registerFailure(response))
  }
}
