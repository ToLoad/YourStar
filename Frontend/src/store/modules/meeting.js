import produce from 'immer';
const initialState = {
  meeting: {},
  record: {},
  totalMeetings: [],
  approvedMeetings: [],
  warningAccount: 0, // 경고횟수
  detailMeetingLoading: false, // 미팅 상세정보
  detailMeetingDone: false,
  detailMeetingError: null,
  totalMeetingsLoading: false, // 전체 미팅일정
  totalMeetingsDone: false,
  totalMeetingsError: null,
  approvedMeetingsLoading: false, // 승인된 미팅일정
  approvedMeetingsDone: false,
  approvedMeetingsError: null,
  updateApproveLoading: false, // 팬미팅 승인 업데이트
  updateApproveDone: false,
  updateApproveError: null,
  warningCountLoading: false, // 회원 경고횟수 받아오기
  warningCountDone: false,
  warningCountError: null,
  warningMemberLoading: false, // 회원에서 경고주기
  warningMemberDone: false,
  warningMemberError: null,
  insertMeetingLoading: false, // 미팅신청
  insertMeetingDone: false,
  insertMeetingError: null,
  endMeetingLoading: false, // 미팅 종료
  endMeetingDone: false,
  endMeetingError: null,
  getRecordLoading: false, // 추억보관함 사진, 비디오 불러오기
  getRecordDone: false,
  getRecordError: null,
};

export const DETAIL_MEETING_REQUEST = 'DETAIL_MEETING_REQUEST'; // 상세정보 미팅
export const DETAIL_MEETING_SUCCESS = 'DETAIL_MEETING_SUCCESS';
export const DETAIL_MEETING_FAILURE = 'DETAIL_MEETING_FAILURE';

export const TOTAL_MEETINGS_REQUEST = 'TOTAL_MEETINGS_REQUEST'; // 전체미팅
export const TOTAL_MEETINGS_SUCCESS = 'TOTAL_MEETINGS_SUCCESS';
export const TOTAL_MEETINGS_FAILURE = 'TOTAL_MEETINGS_FAILURE';

export const APPROVED_MEETINGS_REQUEST = 'APPROVED_MEETINGS_REQUEST'; //  승인된 미팅
export const APPROVED_MEETINGS_SUCCESS = 'APPROVED_MEETINGS_SUCCESS';
export const APPROVED_MEETINGS_FAILURE = 'APPROVED_MEETINGS_FAILURE';

export const UPDATE_APPROVE_REQUEST = 'UPDATE_APPROVE_REQUEST'; // 팬미팅 승인하기
export const UPDATE_APPROVE_SUCCESS = 'UPDATE_APPROVE_SUCCESS';
export const UPDATE_APPROVE_FAILURE = 'UPDATE_APPROVE_FAILURE';

export const WARNING_MEMBER_REQUEST = 'WARNING_MEMBER_REQUEST'; // 팬에게 경고주기
export const WARNING_MEMBER_SUCCESS = 'WARNING_MEMBER_SUCCESS';
export const WARNING_MEMBER_FAILURE = 'WARNING_MEMBER_FAILURE';

export const WARNING_COUNT_REQUEST = 'WARNING_COUNT_REQUEST'; // 팬에게 경고주기
export const WARNING_COUNT_SUCCESS = 'WARNING_COUNT_SUCCESS';
export const WARNING_COUNT_FAILURE = 'WARNING_COUNT_FAILURE';

export const INSERT_MEETING_REQUEST = 'INSERT_MEETING_REQUEST'; // 미팅 신청(스타)
export const INSERT_MEETING_SUCCESS = 'INSERT_MEETING_SUCCESS';
export const INSERT_MEETING_FAILURE = 'INSERT_MEETING_FAILURE';

export const END_MEETING_REQUEST = 'END_MEETING_REQUEST'; // 미팅 종료(스타)
export const END_MEETING_SUCCESS = 'END_MEETING_SUCCESS';
export const END_MEETING_FAILURE = 'END_MEETING_FAILURE';

export const GET_RECORD_REQUEST = 'GET_RECORD_REQUEST'; // 추억보관함 가져오기
export const GET_RECORD_SUCCESS = 'GET_RECORD_SUCCESS';
export const GET_RECORD_FAILURE = 'GET_RECORD_FAILURE';

export const ADD_APPLICANT_MEMBER = 'ADD_APPLICANT_MEMBER';
export const REMOVE_APPLICANT_MEMBER = 'REMOVE_APPLICANT_MEMBER';

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DETAIL_MEETING_REQUEST:
        draft.detailMeetingLoading = true;
        draft.detailMeetingDone = false;
        draft.detailMeetingError = null;
        break;
      case DETAIL_MEETING_SUCCESS:
        draft.detailMeetingLoading = false;
        draft.detailMeetingDone = true;
        draft.meeting = action.data;
        break;
      case DETAIL_MEETING_FAILURE:
        draft.detailMeetingLoading = false;
        draft.detailMeetingError = action.error;
        break;
      case TOTAL_MEETINGS_REQUEST:
        draft.totalMeetingsLoading = true;
        draft.totalMeetingsDone = false;
        draft.totalMeetingsError = null;
        break;
      case TOTAL_MEETINGS_SUCCESS:
        draft.totalMeetingsLoading = false;
        draft.totalMeetingsDone = true;
        draft.totalMeetings = action.data;
        break;
      case TOTAL_MEETINGS_FAILURE:
        draft.totalMeetingsLoading = false;
        draft.totalMeetingsError = action.error;
        break;
      case APPROVED_MEETINGS_REQUEST:
        draft.approvedMeetingsLoading = true;
        draft.approvedMeetingsDone = false;
        draft.approvedMeetingsError = null;
        break;
      case APPROVED_MEETINGS_SUCCESS:
        draft.approvedMeetingsLoading = false;
        draft.approvedMeetingsDone = true;
        draft.approvedMeetings = action.data;
        break;
      case APPROVED_MEETINGS_FAILURE:
        draft.approvedMeetingsLoading = false;
        draft.approvedMeetingsError = action.error;
        break;
      case UPDATE_APPROVE_REQUEST:
        draft.updateApproveLoading = true;
        draft.updateApproveDone = false;
        draft.updateApproveError = null;
        break;
      case UPDATE_APPROVE_SUCCESS:
        draft.updateApproveLoading = false;
        draft.updateApproveDone = true;
        let num = draft.totalMeetings.findIndex(m => m.id === action.data.id);
        draft.totalMeetings[num] = action.data;
        draft.approvedMeetings.push(action.data);
        draft.meeting.approve = true;
        break;
      case UPDATE_APPROVE_FAILURE:
        draft.updateApproveLoading = false;
        draft.updateApproveError = action.error;
        break;
      case WARNING_COUNT_REQUEST:
        draft.warningCountLoading = true;
        draft.warningCountDone = false;
        draft.warningCountError = null;
        break;
      case WARNING_COUNT_SUCCESS:
        draft.warningCountLoading = false;
        draft.warningCountDone = true;
        draft.warningAccount = action.data.applicant.applicantWarnCount; //경고횟수 저장하기!!!!!
        break;
      case WARNING_COUNT_FAILURE:
        draft.warningCountLoading = false;
        draft.warningCountError = action.error;
        break;
      case WARNING_MEMBER_REQUEST:
        draft.warningMemberLoading = true;
        draft.warningMemberDone = false;
        draft.warningMemberError = null;
        break;
      case WARNING_MEMBER_SUCCESS:
        draft.warningMemberLoading = false;
        draft.warningMemberDone = true;
        console.log(action);
        break;
      case WARNING_MEMBER_FAILURE:
        draft.warningMemberLoading = false;
        draft.warningMemberError = action.error;
        break;
      case INSERT_MEETING_REQUEST:
        draft.insertMeetingLoading = true;
        draft.insertMeetingDone = false;
        draft.insertMeetingError = null;
        break;
      case INSERT_MEETING_SUCCESS:
        draft.insertMeetingLoading = false;
        draft.insertMeetingDone = true;
        break;
      case INSERT_MEETING_FAILURE:
        draft.insertMeetingLoading = false;
        draft.insertMeetingError = action.error;
        break;
      case END_MEETING_REQUEST:
        draft.endMeetingLoading = true;
        draft.endMeetingDone = false;
        draft.endMeetingError = null;
        break;
      case END_MEETING_SUCCESS:
        draft.endMeetingLoading = false;
        draft.endMeetingDone = true;
        break;
      case END_MEETING_FAILURE:
        draft.endMeetingLoading = false;
        draft.endMeetingError = action.error;
        break;
      case GET_RECORD_REQUEST:
        draft.getRecordLoading = true;
        draft.getRecordDone = false;
        draft.getRecordError = null;
        break;
      case GET_RECORD_SUCCESS:
        draft.getRecordLoading = false;
        draft.getRecordDone = true;
        draft.record = action.data;
        break;
      case GET_RECORD_FAILURE:
        draft.getRecordLoading = false;
        draft.getRecordError = action.error;
        break;
      case ADD_APPLICANT_MEMBER:
        draft.meeting.applicantCnt++;
        draft.meeting.isReserve = true;
        break;
      case REMOVE_APPLICANT_MEMBER:
        draft.meeting.applicantCnt--;
        draft.meeting.isReserve = false;
        break;
      default:
        break;
    }
  });
export default reducer;
