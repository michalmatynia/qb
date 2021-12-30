import React from 'react';
import styled from 'styled-components';
import leftBtn from '../../../../../../Resources/assets/png/arrow-left3.png';
import rightBtn from '../../../../../../Resources/assets/png/arrow-right3.png';

// import leftBtn from '../icons/left.svg'; // Svg Icon
// import leftBtn from '../../../../../../Resources/assets/svg/arrow-left.svg';  // Svg Icon
// import rightBtn from '../../../../../../Resources/assets/svg/arrow-right.svg';  // Svg Icon

// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { ArrowUpward, ArrowDownward } from '@material-ui/icons';

const Button = styled.img`
  position: absolute;
  top: 50%;
  z-index: 10;
  cursor: pointer;
  font-size: 15px;
  transform: translateY(-50%);
  left: ${props => props.side === 'prev' && 5}px;
  right: ${props => props.side === 'next' && 5}px;
  height: 5%;
  width: 5%;
`;
function Buttons({ handleClickPrev, handleClicknext }) {
  return (
    <>
      <Button src={leftBtn} side="prev" onClick={handleClickPrev} />
      <Button src={rightBtn} side="next" onClick={handleClicknext} /> 
    </>
  );
}
export default Buttons;