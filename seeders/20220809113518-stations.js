module.exports = {
  up: async (queryInterface, Sequelize) => {
    const station = [
      '서울',
      '용산',
      '광명',
      '영등포',
      '수원',
      '평택',
      '천안',
      '대전',
      '김천구미',
      '구미',
      '부산',
      '대구',
      '울산',
      '포항',
      '강릉',
      '목포',
      '전주',
      '동해',
      '평창',
      '안동',
    ];
    for (let i in station) {
      await queryInterface.bulkInsert('Stations', [
        {
          station_name: station[i],
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stations', null, {});
  },
};
