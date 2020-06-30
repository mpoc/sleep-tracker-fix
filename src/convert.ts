import {parse} from '@fast-csv/parse';
import Axios from 'axios';
import moment from 'moment-timezone';
// @ts-ignore
import geoTz from 'geo-tz';

export type SleepMarkerRow = {
  time: string;
  markerType: string;
  length: string;
  latitude: string;
  longitude: string;
};

export type TransformedSleepMarkerRow = {
  localTime: moment.Moment;
  utcTime: moment.Moment;
  isStart: boolean;
  length: number;
  latitude: number;
  longitude: number;
  timezone: string;
};

export const transformSleepMarker = (
  data: SleepMarkerRow
): TransformedSleepMarkerRow => {
  const IFTTT_DATE_FORMAT = 'MMMM DD[,] YYYY [at] hh:mmA';
  const IFTTT_TIMEZONE = 'Europe/Vilnius';

  const IFTTTtime = moment.tz(data.time, IFTTT_DATE_FORMAT, IFTTT_TIMEZONE);
  const localTimezone = geoTz(data.latitude, data.longitude)[0];

  const result: TransformedSleepMarkerRow = {
    utcTime: IFTTTtime.clone().utc(),
    localTime: IFTTTtime.clone().tz(localTimezone),
    isStart: data.markerType == 'Started',
    length: Number(data.length),
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
    timezone: localTimezone,
  };
  return result;
};

export const convert = async () => {
  const url =
    'https://docs.google.com/spreadsheets/d/1GL3O-lucueloWQBl2GDmgYBEDNxWTHDrqWxPKWB9P58/export?format=csv';
  const csv = (await Axios({url})).data;
  const headers = ['time', 'markerType', 'length', 'latitude', 'longitude'];
  const stream = parse<SleepMarkerRow, TransformedSleepMarkerRow>({headers})
    .transform(transformSleepMarker)
    .on('error', error => console.error(error))
    .on('data', row => console.log(row))
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

  stream.write(csv);
  stream.end();
};