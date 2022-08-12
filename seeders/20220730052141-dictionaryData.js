'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DictionaryDatas', [
      {
        loanword: '세트',
        meaning:
          '여러 요리가 한 벌을 구성하는. 도구·가구 따위의 한 벌. 순화어는 `(한) 벌',
        ex_loan:
          '(X)세트 메뉴에는 생선구이, 쇠고기, 밥, 김치, 수프가 따뜻한 물과 함께 제공됐다.',
        ex_korean:
          '(O)한 벌 차림에는 생선구이, 쇠고기, 밥, 김치, 수프가 따뜻한 물과 함께 제공됐다.',
      },
      {
        loanword: '코레일톡',
        meaning: '코레일(한국철도공사)의 승차권 예약 앱.',
        ex_loan: '(X)코레일톡으로 무궁화호 열차를 미리 구매했다.',
        ex_korean:
          '(O)코레일 승차권 예약 앱으로 무궁화호 열차를 미리 구매했다.',
      },
      {
        loanword: '쿠폰',
        meaning:
          '할인권. 안내장, 광고지, 카탈로그상에 인쇄되거나 인터넷 쇼핑몰 따위에서 발급되어 하나씩 이용하거나 할인받을 수 있도록 한 우대권 또는 할인권.',
        ex_loan: '(X)할인쿠폰을 적용해서 값 싸게 구매했다.',
        ex_korean: '(O)할인권을 적용해서 값 싸게 구매했다.',
      },
      {
        loanword: '포인트',
        meaning:
          '적립금.온라인이나 오프라인에서의 구매 활동 따위로 인해 쌓인 점수.',
        ex_loan: '(X)물건을 사서 포인트가 쌓였다.',
        ex_korean: '(O)물건을 사서 구매적립금이 쌓였다.',
      },
      {
        loanword: '큐알코드',
        meaning:
          "흑백의 격자무늬 그림으로 여러 가지 정보를 나타내는 이차원 바코드. 기존의 막대 모양으로 된 일차원 바코드보다 많은 양의 정보를 담을 수 있다. 순화어로는 '정보무늬'이다.",
        ex_loan:
          '(X)각 전시 작품 앞에 있는 큐알 코드를 통해 전시 및 작품에 대한 자세한 설명들을 읽을 수 있도록 관람객의 편의를 도모한 점도 눈에 띈다.',
        ex_korean:
          "(O)각 전시 작품 앞에 있는 '정보무늬'(혹은 이차원바코드)'를 통해 전시 및 작품에 대한 자세한 설명들을 읽을 수 있도록 관람객의 편의를 도모한 점도 눈에 띈다.",
      },
      {
        loanword: 'SR 연계',
        meaning:
          'KTX와 SRT의 운행이 겹치는 구간을 이용할 경우에 추가로 보여준다',
        ex_loan: '예시가 제공되지 않습니다.',
        ex_korean: '예시가 제공되지 않습니다.',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DictionaryDatas', null, {});
  },
};
