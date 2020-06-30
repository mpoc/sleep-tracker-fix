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

export type TransformedSleepMarker = {
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
): TransformedSleepMarker => {
  const IFTTT_DATE_FORMAT = 'MMMM DD[,] YYYY [at] hh:mmA';
  const IFTTT_TIMEZONE = 'Europe/Vilnius';

  const IFTTTtime = moment.tz(data.time, IFTTT_DATE_FORMAT, IFTTT_TIMEZONE);
  const localTimezone = geoTz(data.latitude, data.longitude)[0];

  const result: TransformedSleepMarker = {
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
  const url = process.env.SPREADSHEET_CSV_URL;
  const csv = (await Axios({url})).data;
  const headers = ['time', 'markerType', 'length', 'latitude', 'longitude'];
  
  const sleepMarkers: TransformedSleepMarker[] = [];

  const stream = parse<SleepMarkerRow, TransformedSleepMarker>({headers})
    .transform(transformSleepMarker)
    .on('error', error => console.error(error))
    .on('data', row => sleepMarkers.push(row))
    .on('end', (rowCount: number) => {
        console.log(sleepMarkers);
        console.log(`Parsed ${rowCount} rows`);
        console.log(convertToNewFormat(sleepMarkers));
    });

  stream.write(csv);
  stream.end();
};

type NewSleepMarkerFormat = {
  "Timezone local time": string,
  "Latitude": string,
  "Longitude": string,
  "Timezone": string,
  "UTC time": string
}

export const convertToNewFormat = (sleepMarkers: TransformedSleepMarker[]): NewSleepMarkerFormat[] => {
  return sleepMarkers.map((sleepMarker): NewSleepMarkerFormat => ({
    "Timezone local time": sleepMarker.localTime.format('YYYY-MM-DD HH:mm:ss'),
    "Latitude": String(sleepMarker.latitude),
    "Longitude": String(sleepMarker.longitude),
    "Timezone": sleepMarker.timezone,
    "UTC time": sleepMarker.utcTime.format('YYYY-MM-DD HH:mm:ss')
  }))
}
