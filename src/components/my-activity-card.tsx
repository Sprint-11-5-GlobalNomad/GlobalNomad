import Image from "next/image";

export function myActivityCard() {
  return (
    <div>
      <Image src={} alt={"체험 이미지"} />
      <div>
        <div>
          {/*내 체험 관리일 때 <div>레이팅</div> */}
          {/* 예약 내역일 때 <div>예약 상태</div> */}
          <div>타이틀</div>
          {/*예약 내역일 때 <div>날짜 · 시각 · 인원 수</div> */}
        </div>
        <div>
          <div>가격</div>
          {/* 내 체험 관리일 때
          <div>
            <button>···</button>
            <ul>
              <li>수정하기</li>
              <li>삭제하기</li>
            </ul>
          </div> */}
          {/*예약내역이고 예약상태가 완료일 때 <div>예약 취소</div> 나중에 버튼 태그로 바꿔야함 */}
          {/*예약내역이고 예약상태가 체험완료일 때 <div>후기 작성</div> 나중에 버튼 태그로 바꿔야 함*/}
        </div>
      </div>
    </div>
  );
}
