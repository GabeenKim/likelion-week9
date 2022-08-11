import sequelize from 'sequelize';
import Station from '../../../models/station';
import Train from '../../../models/train';
import Seat from '../../../models/seat';
import { add, differenceInMinutes, getDay, format } from 'date-fns';
import Comp from '../../../models/comp';

export async function getStations() {
  return await Station.findAll();
}

export async function getStationById(stationId) {
  return await Station.findByPk(stationId);
}

export async function getDate() {
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const krTimeCalculate = 9 * 60 * 60 * 1000;
  const kraNow = new Date(utcNow + krTimeCalculate);

  let dayOfWeek = getDay(kraNow); //일요일 : 0, 토요일 : 6)
  const date = format(kraNow, 'yyyy-MM-dd');
  const time = format(kraNow, 'HH:mm');

  let nextDate = [];
  let nextDay = [];
  for (let i = 0; i < 31; i++) {
    nextDate[i] = format(add(kraNow, { days: 1 + i }), 'MM-dd');
    nextDay[i] = getDay(add(kraNow, { days: 1 + i }));
    switch ((dayOfWeek, nextDay[i])) {
      case 0:
        dayOfWeek = '일요일';
        nextDay[i] = '일';
        break;
      case 1:
        dayOfWeek = '월요일';
        nextDay[i] = '월';
        break;
      case 2:
        dayOfWeek = '화요일';
        nextDay[i] = '화';
        break;
      case 3:
        dayOfWeek = '수요일';
        nextDay[i] = '수';
        break;
      case 4:
        dayOfWeek = '목요일';
        nextDay[i] = '목';
        break;
      case 5:
        dayOfWeek = '금요일';
        nextDay[i] = '금';
        break;
      case 6:
        dayOfWeek = '토요일';
        nextDay[i] = '토';
        break;
    }
  }
  let timeTable = [];
  for (let i = 0; i < 24; i++) {
    timeTable[i] = i + '시';
  }
  const today = {
    currentDate: date,
    currentTime: time,
    currentDay: dayOfWeek,
  };
  const next = {
    nextDate: nextDate,
    nextDay: nextDay,
  };
  return { today, next, timeTable };
}

export async function getCompAndSeatById(trainNo, compId) {
  return await Comp.findAll({
    where: { train_id: trainNo, id: compId },
    include: [
      {
        model: Seat,
        attributes: ['id', 'seat_name', 'is_booked'],
        where: { comp_id: compId },
      },
    ],
  });
}

export async function getTrainById(trainNo) {
  const depPlaceTime = await Train.findByPk(trainNo, {
    attributes: ['dep_pland_time'],
  });
  const arrPlaceTime = await Train.findByPk(trainNo, {
    attributes: ['arr_pland_time'],
  });
  const minuteDiff = differenceInMinutes(
    arrPlaceTime.dataValues.arr_pland_time,
    depPlaceTime.dataValues.dep_pland_time
  );
  const data = {
    hourDiff: parseInt(minuteDiff / 60),
    minuteDiff: minuteDiff % 60,
  };
  return data;
}

export async function getTrains(depPlaceId, arrPlaceId, depPlandTime) {
  const depPlaceName = (await getStationById(depPlaceId)).dataValues
    .station_name;
  const arrPlaceName = (await getStationById(arrPlaceId)).dataValues
    .station_name;
  return await Train.findAll({
    where: {
      dep_place_name: depPlaceName,
      arr_place_name: arrPlaceName,
      //날짜
    },
  });
}

export async function createTicket(trainNo, compId, seats) {
  const seatIds = seats.map((s) => {
    Seat.update({ is_booked: true }, { where: { id: s.seatId } });
    return s.seatId;
  });
  console.log(seatIds);
  return await Train.findByPk(trainNo, {
    include: [
      {
        model: Comp,
        attributes: ['id', 'comp_name', 'comp_type'],
        where: {
          id: compId,
        },
        include: [
          {
            model: Seat,
            attributes: ['id', 'seat_name'],
            where: { id: { [sequelize.Op.or]: seatIds } },
          },
        ],
      },
    ],
  });
}
