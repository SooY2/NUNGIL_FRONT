import { useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserName, PlaceTheme } from '../states/createMapState';
import box from '../assets/imgs/Box.png';

const container = css`
  width: 393px;
  padding-left: 28px;
`;

const top = css`
  display: flex;
  flex-direction: column;
  padding-top: 35px;
`;

const middle = css``;

const title = css`
  color: #262626;
  padding-bottom: 13px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -1px;
`;

const placethemespan = css`
  color: #fa7268;
`;

const subtitle = css`
  color: #909090;
  padding-bottom: 34px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.5px;
`;

const middletitle = css`
  padding-bottom: 9px;
  color: #505050;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const middlecon = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  line-height: 17px;
  padding-bottom: 32px;
`;

const middlecontop = css`
  color: #707070;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.3px;
`;

const middleconbtm = css`
  color: #262626;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.3px;
`;

const bottombtn = css`
  display: flex;
  width: 338px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #fa7268;
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
`;

const cancelbtn = css`
  display: flex;
  width: 338px;
  height: 45px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  color: #c5c5c5;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
`;

interface PropsType {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StartModal = ({ setModalOpen }: PropsType) => {
  const userName = useRecoilValue(UserName);
  const placeTheme = useRecoilValue(PlaceTheme);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      // 모달 외부 영역 클릭 시 모달창 사라짐
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    // document.addEventListener('touchstart', handler); // 모바일 코드

    return () => {
      document.removeEventListener('mousedown', handler);
      // document.removeEventListener('touchstart', handler); // 모바일 코드
    };
  }, [setModalOpen]);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div ref={modalRef} css={container} className="StartModal">
      <div css={top} className="Top">
        <div css={title} className="Title">
          <span>{userName} 님에게</span>
          <br />
          <span css={placethemespan}>{placeTheme}</span>
          <span> 을(를) 선물하세요🎁</span>
        </div>
        <div css={subtitle} className="Subtitle">
          <span>해당 테마에 어울리는 당신만의 장소를 선물하세요!</span>
          <br />
          <span>추억이 담긴 장소, 나만 아는 아지트 등 무엇이든 좋아요.</span>
        </div>
      </div>
      <div css={middle} className="Middle">
        <div css={middletitle} className="MiddleTitle">
          <span>지금까지 선물된 장소</span>
        </div>
        <div css={middlecon} className="MiddleContent">
          <img src={box}></img>
          <div className="MiddleContentSpan">
            <span css={middlecontop}>지금까지 {userName} 님에게 선물된 장소는</span>
            <br />
            <span css={middleconbtm}>총 곳이에요!</span>
          </div>
        </div>
        <div className="bottom">
          <Link to="/Map">
            <button css={bottombtn}>장소 선물 시작하기</button>
          </Link>
          <button css={cancelbtn} onClick={closeModal}>
            다음에 선물하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartModal;
