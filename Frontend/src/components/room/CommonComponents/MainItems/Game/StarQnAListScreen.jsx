import React from 'react';
import styled from 'styled-components';
import OtherScreenAngle from '../OtherScreen/OtherScreenAngle';
import { MainDiv } from '../Main.style';

const StarScreen = styled.div`
  overflow: auto;
  position: relative;
  width: 60.041vw;
  height: 66.5vh;
  background-color: white;
  border-radius: 3.0643vh;
  box-shadow: 0.306vh 0.306vh gray;
`;

const PerScPosition = styled.div`
  position: relative;
  top: 2%;
  left: 4%;
`;

export default function StarQnAListScreen() {
  return (
    <MainDiv>
      <StarScreen>
        <PerScPosition>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
          <OtherScreenAngle></OtherScreenAngle>
        </PerScPosition>
      </StarScreen>
    </MainDiv>
  );
}
