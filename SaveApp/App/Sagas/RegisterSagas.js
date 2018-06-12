import { call, put } from 'redux-saga/effects'
import RegisterActions from '../Redux/RegisterRedux'

export function* registerUser(api, action) {
  const { fullName, email, password, confirmPassword } = action
  // make the call to the api
  const response = yield call(
    api.registerUser,
    fullName,
    email,
    password,
    confirmPassword
  )

  if (response.ok) {
    console.log('Response...')
    console.log(response)

    // do data conversion here if needed

    yield put(GithubActions.registerSuccess(response))
  } else {
    yield put(GithubActions.registerFailure())
  }
}
