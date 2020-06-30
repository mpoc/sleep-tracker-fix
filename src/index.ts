import { parse } from '@fast-csv/parse';
import Axios from 'axios';
import moment from 'moment-timezone';
// @ts-ignore
import geoTz from 'geo-tz';

type SleepMarkerRow = {
  time: string,
  markerType: string,
  length: string,
  latitude: string,
  longitude: string
};

type TransformedSleepMarkerRow = {
  localTime: moment.Moment,
  utcTime: moment.Moment,
  isStart: boolean,
  length: number,
  latitude: number,
  longitude: number,
  timezone: string
};

const transformCsv = (data: SleepMarkerRow): TransformedSleepMarkerRow => {
  const IFTTT_DATE_FORMAT = 'MMMM DD[,] YYYY [at] hh:mmA';
  const IFTTT_TIMEZONE =	"Europe/Vilnius";

  const result: TransformedSleepMarkerRow = {
    localTime: moment(data.time, IFTTT_DATE_FORMAT, true),
    utcTime: moment(data.time, IFTTT_DATE_FORMAT, true),
    isStart: data.markerType == 'Started',
    length: Number(data.length),
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
    timezone: geoTz(data.latitude, data.longitude)[0],
  };
  return result;
};

(async () => {
  const url = '';
  const csv = (await Axios({ url })).data;
  const headers = ['time', 'markerType', 'length', 'latitude', 'longitude'];
  const stream = parse<SleepMarkerRow, TransformedSleepMarkerRow>({headers})
    .transform(transformCsv)
    .on('error', error => console.error(error))
    .on('data', row => console.log(row))
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

  stream.write(csv);
  stream.end();
})();
