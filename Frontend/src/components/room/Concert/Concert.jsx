import React from 'react';
import styled from 'styled-components';
import EmoziBar from '../CommonComponents/BottomItems/Emozi/EmoziBar';
import { HalfSideDiv1 } from '../CommonComponents/RightSideItems/Chatting/Chatting.style';
import {
  ConcertChattingBox,
  ConcertChattingInputBox,
  ConcertChattingListBox,
} from '../CommonComponents/RightSideItems/Chatting/Chatting.style';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChattingAction,
  ChattingInputChange,
  ScreenChange,
} from '../../../store/modules/meetingRoom';
import StarVideoComponent from '../../../pages/Room/StarVideoComponent';

// 포지션작업
const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e2d8ff;
`;

const ConcertWrapper = styled.div`
  position: absolute;
  top: 4.5%;
  left: 8%;
`;

const ConcertDisplayBox = styled.div`
  position: absolute;
  /* border: solid red; */
  border-radius: 1vw;
  height: 75vh;
  width: 60vw;
  background-color: white;
  box-shadow: 0.306vh 0.306vh gray;
`;

const HolePlace = styled.div`
  position: absolute;
  top: 66vh;
  left: 56vw;
  font-size: 3vw;
  z-index: 10;
   {
    animation: 0.6s ease-in-out infinite loadEffect3;
  }

  @keyframes loadEffect3 {
    65% {
      opacity: 1;
      transform: scale(1.01);
    }
    85% {
      opacity: 1;
      transform: scale(0.97);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
const EmoziBox = styled.div`
  /* border: solid red; */
  position: absolute;
  bottom: -72vh;
  margin-left: 56.5vw;
  border-radius: 1vw;
  height: 72vh;
  width: 2vw;
  background-color: rgba(255, 255, 255, 0);
  z-index: 1; // box-shadow: 0.306vh 0.306vh gray;
`;

const EmoziEffect = styled.div`
  /* border: solid red; */
  vertical-align: bottom;
  position: absolute;
  bottom: 22px;
  font-size: 2vw;
  width: 50px;
  height: 20px;
  background-size: cover;
  animation: bubble 5s linear;
  @keyframes bubble {
    0% {
      bottom: 2vh;
      opacity: 1;
    }
    to {
      bottom: 70vh;
      opacity: 0;
    }
  }
`;

export default function Concert() {
  const [testInput, setTestinput] = React.useState('');

  const dispatch = useDispatch();

  const SubmitText = Input => dispatch(ChattingInputChange(Input));
  const AppendChattingList = inputValue => dispatch(ChattingAction(inputValue));

  const SetSelect = selectNum => dispatch(ScreenChange(selectNum));
  const handleChatMessageChange = e => {
    setTestinput(e.target.value);
  };

  const {
    storeSession,
    backgroundColor,
    chattingList,
    emoziList,
    mainStreamManager,
  } = useSelector(state => state.MeetingRoom);

  const { me } = useSelector(state => state.mypage);

  const SendMessage = e => {
    if (e.key === 'Enter') {
      const inputValue = {
        userName: me.nick,
        text: testInput,
        chatClass: 'messages__item--operator',
      };
      storeSession.signal({
        data: `${me.nick},${testInput}`,
        to: [],
        type: 'chat',
      });
      SubmitText(testInput);
      AppendChattingList(inputValue);
      setTestinput('');
    }
  };
  return (
    <BackgroundDiv>
      <ConcertWrapper>
        <ConcertDisplayBox>
          {mainStreamManager && (
            <StarVideoComponent streamManager={mainStreamManager} />
          )}
        </ConcertDisplayBox>
        <EmoziBox>
          {emoziList.map((emozi, idx) => {
            return (
              <div key={idx + emozi}>
                <EmoziEffect>
                  <span className="test">{emozi}</span>
                </EmoziEffect>
              </div>
            );
          })}
        </EmoziBox>{' '}
        <HolePlace>🎁</HolePlace>
      </ConcertWrapper>
      <HalfSideDiv1>
        <ConcertChattingBox></ConcertChattingBox>
        <ConcertChattingInputBox
          onKeyPress={SendMessage}
          value={testInput}
          onChange={handleChatMessageChange}
          color={backgroundColor}
        ></ConcertChattingInputBox>
        <ConcertChattingListBox>
          {chattingList.map((value, idx) => {
            return (
              <div key={idx + value.text}>
                <p>
                  {value.userName} : {value.text}
                </p>
              </div>
            );
          })}
        </ConcertChattingListBox>
      </HalfSideDiv1>
      <EmoziBar></EmoziBar>
      <button onClick={() => SetSelect(0)}>홈으로</button>
    </BackgroundDiv>
  );
}
