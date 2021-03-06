import {
  all,
  fork,
  put,
  takeLatest,
  call,
  getContext,
  takeEvery,
  delay,
} from 'redux-saga/effects';
import {
  EmailCheckAPI,
  LoginAPI,
  LogoutAPI,
  NickNameCheckAPI,
  ResetPasswordAPI,
  SignupAPI,
} from '../apis/Main/member';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FIND_PW_REQUEST,
  FIND_PW_SUCCESS,
  FIND_PW_FAILURE,
  NICK_CHECK_SUCCESS,
  NICK_CHECK_FAILURE,
  NICK_CHECK_REQUEST,
  EMAIL_CHECK_REQUEST,
  EMAIL_CHECK_FAILURE,
  EMAIL_CHECK_SUCCESS,
} from '../modules/member';
import { MY_PAGE_REQUEST } from '../modules/mypage';
import swal from 'sweetalert';
// 로그인 처리
function* loadLogin(action) {
  try {
    const result = yield call(LoginAPI, action.data);
    yield put({ type: LOG_IN_SUCCESS, data: result });
    sessionStorage.setItem('userToken', result.data.accessToken); // userToken 세션스토리지 저장
    yield put({ type: MY_PAGE_REQUEST, data: result.data.accessToken }); // mypage 정보 바로 조회
    swal('로그인 성공', '  ', 'success', {
      buttons: false,
      timer: 1800,
    });
  } catch (err) {
    swal(
      '로그인 실패',
      '아이디 또는 비밀번호가 일치하지 않거나, 이메일 인증 후 로그인 시도 바랍니다.',
      'error',
      {
        buttons: false,
        timer: 2500,
      }
    );
    yield put({ type: LOG_IN_FAILURE });
  }
}

function* watchLoadLogin() {
  yield takeLatest(LOG_IN_REQUEST, loadLogin);
}

// 로그아웃 처리
function* loadLogout(action) {
  try {
    const result = yield call(LogoutAPI, action.data);
    sessionStorage.clear(); // userToken 세션스토리지 삭제
    document.location.href = '/'; // 로그아웃 처리하면 새로고침 해서 세션 사라진 걸 인식 해줘야함.
    yield put({ type: LOG_OUT_SUCCESS, data: result });
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE });
  }
}

function* watchLoadLogout() {
  yield takeLatest(LOG_OUT_REQUEST, loadLogout);
}

// 회원가입 처리
function* loadSignup(action) {
  try {
    const result = yield call(SignupAPI, action.data);
    yield put({ type: SIGN_UP_SUCCESS, data: result });
    swal('회원가입 성공', '이메일 인증 후 로그인 할 수 있습니다.', 'success');
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE });
  }
}

function* watchLoadSignup() {
  yield takeLatest(SIGN_UP_REQUEST, loadSignup);
}

// 이메일 중복체크 처리
function* loadEmailCheck(action) {
  try {
    const result = yield call(EmailCheckAPI, action.data);
    alert('사용할 수 있는 이메일 입니다.');
    yield put({ type: EMAIL_CHECK_SUCCESS, data: result });
  } catch (err) {
    alert('이미 사용중이거나 사용할 수 없는 이메일 입니다.');
    yield put({ type: EMAIL_CHECK_FAILURE });
  }
}

function* watchLoadEmailCheck() {
  yield takeLatest(EMAIL_CHECK_REQUEST, loadEmailCheck);
}

// 닉네임 중복체크 처리
function* loadNickCheck(action) {
  try {
    const result = yield call(NickNameCheckAPI, action.data);
    alert('사용할 수 있는 닉네임 입니다.');
    yield put({ type: NICK_CHECK_SUCCESS, data: result });
  } catch (err) {
    alert('이미 사용중이거나 사용할 수 없는 닉네임 입니다.');
    yield put({ type: NICK_CHECK_FAILURE });
  }
}

function* watchLoadNickCheck() {
  yield takeLatest(NICK_CHECK_REQUEST, loadNickCheck);
}

// 비밀번호 찾기 처리
function* loadFindPw(action) {
  try {
    const result = yield call(ResetPasswordAPI, action.data);
    yield put({ type: FIND_PW_SUCCESS, data: result });
    swal(
      '',
      '이메일로 임시 비밀번호가 전송되었습니다. 로그인 후 비밀번호 변경 바랍니다.',
      'success'
    );
  } catch (err) {
    alert('이메일 또는 이름이 일치하지 않습니다.');
    yield put({ type: FIND_PW_FAILURE });
  }
}

function* watchLoadFindPw() {
  yield takeLatest(FIND_PW_REQUEST, loadFindPw);
}

export default function* memberSaga() {
  yield all([
    fork(watchLoadLogin),
    fork(watchLoadLogout),
    fork(watchLoadSignup),
    fork(watchLoadFindPw),
    fork(watchLoadEmailCheck),
    fork(watchLoadNickCheck),
  ]);
}
