package com.ssafy.yourstar.domain.meeting.service;

import com.ssafy.yourstar.domain.meeting.db.entity.Applicant;
import com.ssafy.yourstar.domain.meeting.db.entity.Meeting;
import com.ssafy.yourstar.domain.meeting.request.MeetingApplyByStarPostReq;
import com.ssafy.yourstar.domain.meeting.request.MeetingApplyByUserPostReq;
import com.ssafy.yourstar.domain.meeting.response.MeetingGetRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public interface MeetingService {
    MeetingGetRes meetingApplyByStar(MeetingApplyByStarPostReq meetingApplyByStarPostReq, MultipartHttpServletRequest request);
    MeetingGetRes meetingModifyByStar(Meeting meeting, MultipartHttpServletRequest request);
    boolean meetingRemoveByStar(int meetingId);
    Page<Meeting> meetingList(Pageable pageable);
    Page<Meeting> meetingPendingList(Pageable pageable);
    Page<Meeting> meetingApproveList(Pageable pageable);
    Meeting meetingDetail(int meetingId);
    Applicant meetingApplyByUser(MeetingApplyByUserPostReq meetingApplyByUserPostReq);
    boolean meetingRemoveByUser(int memberId, int meetingId);
    Page<Meeting> meetingApplyListByUser(int memberId, Pageable pageable);
    Applicant applicantDetail(int memberId, int meetingId);
    boolean meetingGiveWarnToUser(int memberId, int meetingId);

}
