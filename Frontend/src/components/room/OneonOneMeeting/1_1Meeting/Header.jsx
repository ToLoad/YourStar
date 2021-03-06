import React, { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Timer from '../../Timer/Timer';
import { IoMdCreate, IoIosAperture } from 'react-icons/io';
import { ImVideoCamera } from 'react-icons/im';
import axios from 'axios';
import swal from 'sweetalert';
import { setSignButton } from '../../../../store/modules/meetingRoom';
import ModalSign from '../../../utils/modal/modalSign';
import { SmallIconWrapper, SmallWrapper } from './Header.style';

export default function Header(props) {
  const [prevIdx, setPrevIdx] = useState(-1);
  const [prevCnt, setPrevCnt] = useState(-1);
  const { me } = useSelector(state => state.mypage);
  const {
    index,
    storeSession,
    subscribers,
    onebyoneStream,
    checkCnt,
    oneByOneMeetingTime,
  } = useSelector(state => ({
    index: state.MeetingRoom.index,
    storeSession: state.MeetingRoom.storeSession,
    subscribers: state.MeetingRoom.subscribers,
    onebyoneStream: state.MeetingRoom.onebyoneStream,
    checkCnt: state.MeetingRoom.checkCnt,
    oneByOneMeetingTime: state.MeetingRoom.oneByOneMeetingTime,
  }));

  const OPENVIDU_SERVER_URL = 'https://i6e204.p.ssafy.io:8443';
  const OPENVIDU_SERVER_SECRET = 'YOURSTAR';

  const myAudio = new Audio();

  const signalToNextUser = idx => {
    setPrevIdx(idx);

    // 다음 사람에게 남은 시간 알리기
    if (idx < subscribers.length - 1) {
      for (let i = idx + 1, order = 1; i < subscribers.length; i++, order++) {
        const sessionId = storeSession.sessionId;
        const time = order * (parseInt(oneByOneMeetingTime) + parseInt(5));
        const data = {
          session: sessionId.substring(0, sessionId.length - 9), // 1-onebyone 일때 1만 뽑아내기
          to: [subscribers[i].stream.connection.connectionId],
          type: 'signal:userwait',
          data: String(time),
        };
        axios
          .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal', data, {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => console.error(error));
      }
    }

    // 다음 사람 데려오기
    if (idx < subscribers.length) {
      const sessionId = storeSession.sessionId;
      const nextName = JSON.parse(
        subscribers[idx].stream.streamManager.stream.connection.data
      ).clientData;
      myAudio.src = require('../../../../assets/sound effects/pop.mp3');
      myAudio.play();
      swal({
        title: '유저 입장 알림',
        text: nextName + '님이 입장하고 있습니다.',
        icon: 'info',
        timer: 2000,
      });
      const data = {
        session: sessionId.substring(0, sessionId.length - 9), // 1-onebyone 일때 1만 뽑아내기
        to: [subscribers[idx].stream.connection.connectionId],
        type: 'signal:one',
        data: `6, ${oneByOneMeetingTime}`,
      };
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => console.error(error));
    }

    // 스타 돌려 보내기
    if (idx >= subscribers.length) {
      const sessionId = storeSession.sessionId;

      const data = {
        session: sessionId,
        to: [storeSession.connection.connectionId],
        type: 'signal:starback',
        data: '0',
      };
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => console.error(error));
    }
  };

  const signalToCurUserOut = () => {
    // 스타 퇴장 알림
    if (index >= subscribers.length - 1) {
      swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        title: '미팅룸 이동 알림',
        text: '대기 시간 이후 미팅룸으로 자동 이동됩니다',
        icon: 'info',
        buttons: false,
        timer: 5000,
      });
    }

    // 다시 이전 세션으로 보내기
    setPrevCnt(checkCnt);
    const sessionId = storeSession.sessionId;

    const data = {
      session: sessionId,
      to: [onebyoneStream.stream.connection.connectionId],
      type: 'signal:oneback',
      data: '0',
    };
    axios
      .post(OPENVIDU_SERVER_URL + '/openvidu/api/signal', data, {
        headers: {
          Authorization:
            'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error(error));
  };
  const dispatch = useDispatch();
  const { signButton } = useSelector(state => state.MeetingRoom);

  const onSignClick = () => {
    storeSession.signal({
      data: '0',
      to: [],
      type: 'signon',
    });
    dispatch(setSignButton(true));
  };
  return (
    <SmallWrapper>
      <Timer userNick={props.userNick} />
      {me.code !== 3 && (
        <SmallIconWrapper>
          {prevIdx !== index ? signalToNextUser(index) : null}
          {prevCnt !== checkCnt ? signalToCurUserOut() : null}
          <IoMdCreate onClick={() => onSignClick()} />
          <ImVideoCamera style={{ color: 'red' }} />
          <div
            style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}
          >
            녹화중
          </div>
          {signButton && <ModalSign />}
        </SmallIconWrapper>
      )}
    </SmallWrapper>
  );
}
