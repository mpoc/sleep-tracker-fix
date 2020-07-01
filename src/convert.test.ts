import {
  transformSleepMarker,
  SleepMarkerRow,
} from './convert';
import moment from 'moment-timezone';

test('Correctly converts summer sleep marker times from Lithuania', () => {
  const sleepMarkerRows: SleepMarkerRow[] = [
    {
      time: 'June 30, 2020 at 01:09AM',
      markerType: 'Started',
      length: '',
      latitude: '55.6853691',
      longitude: '25.1427926',
    },
    {
      time: 'June 30, 2020 at 00:09AM',
      markerType: 'Started',
      length: '',
      latitude: '55.6853691',
      longitude: '25.1427926',
    },
    {
      time: 'June 30, 2020 at 12:09AM',
      markerType: 'Started',
      length: '',
      latitude: '55.6853691',
      longitude: '25.1427926',
    },
    {
      time: 'June 30, 2020 at 00:00AM',
      markerType: 'Started',
      length: '',
      latitude: '55.6853691',
      longitude: '25.1427926',
    },
    {
      time: 'June 30, 2020 at 12:00PM',
      markerType: 'Started',
      length: '',
      latitude: '55.6853691',
      longitude: '25.1427926',
    },
    {
      time: 'May 30, 2020 at 12:01PM',
      markerType: 'Started',
      length: '',
      latitude: '55.6853691',
      longitude: '25.1427926',
    }
  ];

  const transformed = sleepMarkerRows.map(transformSleepMarker);

  expect(transformed[0].localTime.isSame(moment.tz('2020-06-30 01:09:00', 'Europe/Vilnius'))).toBe(true);
  expect(transformed[0].localTime.tz()).toBe('Europe/Vilnius');
  expect(transformed[0].timezone).toBe('Europe/Vilnius');
  expect(transformed[0].utcTime.isSame(moment.tz('2020-06-29 22:09:00', 'UTC'))).toBe(true);

  expect(transformed[1].localTime.isSame(moment.tz('2020-06-30 00:09:00', 'Europe/Vilnius'))).toBe(true);
  expect(transformed[1].localTime.tz()).toBe('Europe/Vilnius');
  expect(transformed[1].timezone).toBe('Europe/Vilnius');
  expect(transformed[1].utcTime.isSame(moment.tz('2020-06-29 21:09:00', 'UTC'))).toBe(true);

  expect(transformed[2].localTime.isSame(moment.tz('2020-06-30 00:09:00', 'Europe/Vilnius'))).toBe(true);
  expect(transformed[2].localTime.tz()).toBe('Europe/Vilnius');
  expect(transformed[2].timezone).toBe('Europe/Vilnius');
  expect(transformed[2].utcTime.isSame(moment.tz('2020-06-29 21:09:00', 'UTC'))).toBe(true);

  expect(transformed[3].localTime.isSame(moment.tz('2020-06-30 00:00:00', 'Europe/Vilnius'))).toBe(true);
  expect(transformed[3].localTime.tz()).toBe('Europe/Vilnius');
  expect(transformed[3].timezone).toBe('Europe/Vilnius');
  expect(transformed[3].utcTime.isSame(moment.tz('2020-06-29 21:00:00', 'UTC'))).toBe(true);

  expect(transformed[4].localTime.isSame(moment.tz('2020-06-30 12:00:00', 'Europe/Vilnius'))).toBe(true);
  expect(transformed[4].localTime.tz()).toBe('Europe/Vilnius');
  expect(transformed[4].timezone).toBe('Europe/Vilnius');
  expect(transformed[4].utcTime.isSame(moment.tz('2020-06-30 09:00:00', 'UTC'))).toBe(true);

  expect(transformed[5].localTime.isSame(moment.tz('2020-05-30 12:01:00', 'Europe/Vilnius'))).toBe(true);
  expect(transformed[5].localTime.tz()).toBe('Europe/Vilnius');
  expect(transformed[5].timezone).toBe('Europe/Vilnius');
  expect(transformed[5].utcTime.isSame(moment.tz('2020-05-30 09:01:00', 'UTC'))).toBe(true);
});

test('Correctly converts winter sleep marker times from Lithuania', () => {
  const sleepMarkerRows: SleepMarkerRow[] = [
    {
      time: 'December 22, 2019 at 01:00PM',
      markerType: 'Stopped',
      length: '9.85',
      latitude: '54.9472165',
      longitude: '23.400941',
    },
    {
      time: 'December 22, 2019 at 01:01PM',
      markerType: 'Stopped',
      length: '9.85',
      latitude: '54.9472165',
      longitude: '23.400941',
    },
    {
      time: 'December 26, 2019 at 06:30AM',
      markerType: 'Stopped',
      length: '9.85',
      latitude: '54.9472165',
      longitude: '23.400941',
    },
    {
      time: 'December 26, 2019 at 00:00AM',
      markerType: 'Stopped',
      length: '9.85',
      latitude: '54.9472165',
      longitude: '23.400941',
    },
    {
      time: 'December 26, 2019 at 12:00AM',
      markerType: 'Stopped',
      length: '9.85',
      latitude: '54.9472165',
      longitude: '23.400941',
    },
  ];

  const transformed = sleepMarkerRows.map(transformSleepMarker);

  expect(transformed[0].localTime.isSame(moment.tz('2019-12-22 13:00:00', 'Europe/Vilnius'))).toBe(true);
  expect(transformed[0].localTime.tz()).toBe('Europe/Vilnius');
  expect(transformed[0].timezone).toBe('Europe/Vilnius');
  expect(transformed[0].utcTime.isSame(moment.tz('2019-12-22 11:00:00', 'UTC'))).toBe(true);

  expect(transformed[1].localTime.isSame(moment.tz('2019-12-22 13:01:00', 'Europe/Vilnius'))).toBe(true);
  expect(transformed[1].localTime.tz()).toBe('Europe/Vilnius');
  expect(transformed[1].timezone).toBe('Europe/Vilnius');
  expect(transformed[1].utcTime.isSame(moment.tz('2019-12-22 11:01:00', 'UTC'))).toBe(true);

  expect(transformed[2].localTime.isSame(moment.tz('2019-12-26 06:30:00', 'Europe/Vilnius'))).toBe(true);
  expect(transformed[2].localTime.tz()).toBe('Europe/Vilnius');
  expect(transformed[2].timezone).toBe('Europe/Vilnius');
  expect(transformed[2].utcTime.isSame(moment.tz('2019-12-26 04:30:00', 'UTC'))).toBe(true);

  expect(transformed[3].localTime.isSame(moment.tz('2019-12-26 00:00:00', 'Europe/Vilnius'))).toBe(true);
  expect(transformed[3].localTime.tz()).toBe('Europe/Vilnius');
  expect(transformed[3].timezone).toBe('Europe/Vilnius');
  expect(transformed[3].utcTime.isSame(moment.tz('2019-12-25 22:00:00', 'UTC'))).toBe(true);

  expect(transformed[4].localTime.isSame(moment.tz('2019-12-26 00:00:00', 'Europe/Vilnius'))).toBe(true);
  expect(transformed[4].localTime.tz()).toBe('Europe/Vilnius');
  expect(transformed[4].timezone).toBe('Europe/Vilnius');
  expect(transformed[4].utcTime.isSame(moment.tz('2019-12-25 22:00:00', 'UTC'))).toBe(true);
});

test('Correctly converts winter sleep marker times from UK', () => {
  const sleepMarkerRows: SleepMarkerRow[] = [
    {
      time: 'January 08, 2020 at 08:58AM',
      markerType: 'Stopped',
      length: '6.47',
      latitude: '51.5069638',
      longitude: '-0.1710014',
    },
    {
      time: 'February 10, 2020 at 02:24AM',
      markerType: 'Started',
      length: '',
      latitude: '51.5069638',
      longitude: '-0.1710014',
    },
    {
      time: 'February 10, 2020 at 01:24AM',
      markerType: 'Started',
      length: '',
      latitude: '51.5069638',
      longitude: '-0.1710014',
    },
    {
      time: 'February 10, 2020 at 00:24AM',
      markerType: 'Started',
      length: '',
      latitude: '51.5069638',
      longitude: '-0.1710014',
    },
    {
      time: 'February 10, 2020 at 12:24AM',
      markerType: 'Started',
      length: '',
      latitude: '51.5069638',
      longitude: '-0.1710014',
    },
    {
      time: 'January 08, 2020 at 11:59AM',
      markerType: 'Stopped',
      length: '6.47',
      latitude: '51.5069638',
      longitude: '-0.1710014',
    },
  ];

  const transformed = sleepMarkerRows.map(transformSleepMarker);

  expect(transformed[0].localTime.isSame(moment.tz('2020-01-08 06:58:00', 'Europe/London'))).toBe(true);
  expect(transformed[0].localTime.tz()).toBe('Europe/London');
  expect(transformed[0].timezone).toBe('Europe/London');
  expect(transformed[0].utcTime.isSame(moment.tz('2020-01-08 06:58:00', 'UTC'))).toBe(true);

  expect(transformed[1].localTime.isSame(moment.tz('2020-02-10 00:24:00', 'Europe/London'))).toBe(true);
  expect(transformed[1].localTime.tz()).toBe('Europe/London');
  expect(transformed[1].timezone).toBe('Europe/London');
  expect(transformed[1].utcTime.isSame(moment.tz('2020-02-10 00:24:00', 'UTC'))).toBe(true);

  expect(transformed[2].localTime.isSame(moment.tz('2020-02-09 23:24:00', 'Europe/London'))).toBe(true);
  expect(transformed[2].localTime.tz()).toBe('Europe/London');
  expect(transformed[2].timezone).toBe('Europe/London');
  expect(transformed[2].utcTime.isSame(moment.tz('2020-02-09 23:24:00', 'UTC'))).toBe(true);

  expect(transformed[3].localTime.isSame(moment.tz('2020-02-09 22:24:00', 'Europe/London'))).toBe(true);
  expect(transformed[3].localTime.tz()).toBe('Europe/London');
  expect(transformed[3].timezone).toBe('Europe/London');
  expect(transformed[3].utcTime.isSame(moment.tz('2020-02-09 22:24:00', 'UTC'))).toBe(true);

  expect(transformed[4].localTime.isSame(moment.tz('2020-02-09 22:24:00', 'Europe/London'))).toBe(true);
  expect(transformed[4].localTime.tz()).toBe('Europe/London');
  expect(transformed[4].timezone).toBe('Europe/London');
  expect(transformed[4].utcTime.isSame(moment.tz('2020-02-09 22:24:00', 'UTC'))).toBe(true);

  expect(transformed[5].localTime.isSame(moment.tz('2020-01-08 09:59:00', 'Europe/London'))).toBe(true);
  expect(transformed[5].localTime.tz()).toBe('Europe/London');
  expect(transformed[5].timezone).toBe('Europe/London');
  expect(transformed[5].utcTime.isSame(moment.tz('2020-01-08 09:59:00', 'UTC'))).toBe(true);
});

test('Correctly converts summer sleep marker times from UK', () => {
  const sleepMarkerRows: SleepMarkerRow[] = [
    {
      time: 'May 09, 2020 at 01:25PM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'May 10, 2020 at 03:55AM',
      markerType: 'Started',
      length: '',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'May 10, 2020 at 01:11PM',
      markerType: 'Stopped',
      length: '9.27',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'May 11, 2020 at 03:20AM',
      markerType: 'Started',
      length: '',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'May 11, 2020 at 12:51PM',
      markerType: 'Stopped',
      length: '9.52',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'May 12, 2020 at 03:26AM',
      markerType: 'Started',
      length: '',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'May 12, 2020 at 12:22PM',
      markerType: 'Stopped',
      length: '8.93',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
  ];

  const transformed = sleepMarkerRows.map(transformSleepMarker);

  expect(transformed[0].localTime.isSame(moment.tz('2020-05-09 11:25:00', 'Europe/London'))).toBe(true);
  expect(transformed[0].localTime.tz()).toBe('Europe/London');
  expect(transformed[0].timezone).toBe('Europe/London');
  expect(transformed[0].utcTime.isSame(moment.tz('2020-05-09 10:25:00', 'UTC'))).toBe(true);

  expect(transformed[1].localTime.isSame(moment.tz('2020-05-10 01:55:00', 'Europe/London'))).toBe(true);
  expect(transformed[1].localTime.tz()).toBe('Europe/London');
  expect(transformed[1].timezone).toBe('Europe/London');
  expect(transformed[1].utcTime.isSame(moment.tz('2020-05-10 00:55:00', 'UTC'))).toBe(true);

  expect(transformed[2].localTime.isSame(moment.tz('2020-05-10 11:11:00', 'Europe/London'))).toBe(true);
  expect(transformed[2].localTime.tz()).toBe('Europe/London');
  expect(transformed[2].timezone).toBe('Europe/London');
  expect(transformed[2].utcTime.isSame(moment.tz('2020-05-10 10:11:00', 'UTC'))).toBe(true);

  expect(transformed[3].localTime.isSame(moment.tz('2020-05-11 01:20:00', 'Europe/London'))).toBe(true);
  expect(transformed[3].localTime.tz()).toBe('Europe/London');
  expect(transformed[3].timezone).toBe('Europe/London');
  expect(transformed[3].utcTime.isSame(moment.tz('2020-05-11 00:20:00', 'UTC'))).toBe(true);

  expect(transformed[4].localTime.isSame(moment.tz('2020-05-11 10:51:00', 'Europe/London'))).toBe(true);
  expect(transformed[4].localTime.tz()).toBe('Europe/London');
  expect(transformed[4].timezone).toBe('Europe/London');
  expect(transformed[4].utcTime.isSame(moment.tz('2020-05-11 09:51:00', 'UTC'))).toBe(true);

  expect(transformed[5].localTime.isSame(moment.tz('2020-05-12 01:26:00', 'Europe/London'))).toBe(true);
  expect(transformed[5].localTime.tz()).toBe('Europe/London');
  expect(transformed[5].timezone).toBe('Europe/London');
  expect(transformed[5].utcTime.isSame(moment.tz('2020-05-12 00:26:00', 'UTC'))).toBe(true);

  expect(transformed[6].localTime.isSame(moment.tz('2020-05-12 10:22:00', 'Europe/London'))).toBe(true);
  expect(transformed[6].localTime.tz()).toBe('Europe/London');
  expect(transformed[6].timezone).toBe('Europe/London');
  expect(transformed[6].utcTime.isSame(moment.tz('2020-05-12 09:22:00', 'UTC'))).toBe(true);
});

test('Correctly converts DST start edge sleep marker times from UK', () => {
  const sleepMarkerRows: SleepMarkerRow[] = [
    // 2018
    {
      time: 'March 25, 2018 at 02:59AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'March 25, 2018 at 04:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'March 25, 2018 at 04:01AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    // Technically, there's no such time in timezone Europe/Vilnius, but test anyway
    {
      time: 'March 25, 2018 at 03:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    // 2019
    {
      time: 'March 31, 2019 at 02:59AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'March 31, 2019 at 04:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'March 31, 2019 at 04:01AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    // Technically, there's no such time in timezone Europe/Vilnius, but test anyway
    {
      time: 'March 31, 2019 at 03:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    // 2020
    {
      time: 'March 29, 2020 at 02:59AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'March 29, 2020 at 04:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    {
      time: 'March 29, 2020 at 04:01AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    // Technically, there's no such time in timezone Europe/Vilnius, but test anyway
    {
      time: 'March 29, 2020 at 03:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },    
  ];

  const transformed = sleepMarkerRows.map(transformSleepMarker);

  // 2018
  expect(transformed[0].localTime.isSame(moment.tz('2018-03-25 00:59:00', 'Europe/London'))).toBe(true);
  expect(transformed[0].localTime.tz()).toBe('Europe/London');
  expect(transformed[0].timezone).toBe('Europe/London');
  expect(transformed[0].utcTime.isSame(moment.tz('2018-03-25 00:59:00', 'UTC'))).toBe(true);

  expect(transformed[1].localTime.isSame(moment.tz('2018-03-25 02:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[1].localTime.tz()).toBe('Europe/London');
  expect(transformed[1].timezone).toBe('Europe/London');
  expect(transformed[1].utcTime.isSame(moment.tz('2018-03-25 01:00:00', 'UTC'))).toBe(true);

  expect(transformed[2].localTime.isSame(moment.tz('2018-03-25 02:01:00', 'Europe/London'))).toBe(true);
  expect(transformed[2].localTime.tz()).toBe('Europe/London');
  expect(transformed[2].timezone).toBe('Europe/London');
  expect(transformed[2].utcTime.isSame(moment.tz('2018-03-25 01:01:00', 'UTC'))).toBe(true);

  expect(transformed[3].localTime.isSame(moment.tz('2018-03-25 02:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[3].localTime.tz()).toBe('Europe/London');
  expect(transformed[3].timezone).toBe('Europe/London');
  expect(transformed[3].utcTime.isSame(moment.tz('2018-03-25 01:00:00', 'UTC'))).toBe(true);

  // 2019
  expect(transformed[4].localTime.isSame(moment.tz('2019-03-31 00:59:00', 'Europe/London'))).toBe(true);
  expect(transformed[4].localTime.tz()).toBe('Europe/London');
  expect(transformed[4].timezone).toBe('Europe/London');
  expect(transformed[4].utcTime.isSame(moment.tz('2019-03-31 00:59:00', 'UTC'))).toBe(true);

  expect(transformed[5].localTime.isSame(moment.tz('2019-03-31 02:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[5].localTime.tz()).toBe('Europe/London');
  expect(transformed[5].timezone).toBe('Europe/London');
  expect(transformed[5].utcTime.isSame(moment.tz('2019-03-31 01:00:00', 'UTC'))).toBe(true);

  expect(transformed[6].localTime.isSame(moment.tz('2019-03-31 02:01:00', 'Europe/London'))).toBe(true);
  expect(transformed[6].localTime.tz()).toBe('Europe/London');
  expect(transformed[6].timezone).toBe('Europe/London');
  expect(transformed[6].utcTime.isSame(moment.tz('2019-03-31 01:01:00', 'UTC'))).toBe(true);

  expect(transformed[7].localTime.isSame(moment.tz('2019-03-31 02:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[7].localTime.tz()).toBe('Europe/London');
  expect(transformed[7].timezone).toBe('Europe/London');
  expect(transformed[7].utcTime.isSame(moment.tz('2019-03-31 01:00:00', 'UTC'))).toBe(true);

  // 2020
  expect(transformed[8].localTime.isSame(moment.tz('2020-03-29 00:59:00', 'Europe/London'))).toBe(true);
  expect(transformed[8].localTime.tz()).toBe('Europe/London');
  expect(transformed[8].timezone).toBe('Europe/London');
  expect(transformed[8].utcTime.isSame(moment.tz('2020-03-29 00:59:00', 'UTC'))).toBe(true);

  expect(transformed[9].localTime.isSame(moment.tz('2020-03-29 02:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[9].localTime.tz()).toBe('Europe/London');
  expect(transformed[9].timezone).toBe('Europe/London');
  expect(transformed[9].utcTime.isSame(moment.tz('2020-03-29 01:00:00', 'UTC'))).toBe(true);

  expect(transformed[10].localTime.isSame(moment.tz('2020-03-29 02:01:00', 'Europe/London'))).toBe(true);
  expect(transformed[10].localTime.tz()).toBe('Europe/London');
  expect(transformed[10].timezone).toBe('Europe/London');
  expect(transformed[10].utcTime.isSame(moment.tz('2020-03-29 01:01:00', 'UTC'))).toBe(true);

  expect(transformed[11].localTime.isSame(moment.tz('2020-03-29 02:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[11].localTime.tz()).toBe('Europe/London');
  expect(transformed[11].timezone).toBe('Europe/London');
  expect(transformed[11].utcTime.isSame(moment.tz('2020-03-29 01:00:00', 'UTC'))).toBe(true);
});

test('Correctly converts DST end edge sleep marker times (in UK)', () => {
  const sleepMarkerRows: SleepMarkerRow[] = [
    // 2018
    { 
      time: 'October 28, 2018 at 02:59AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    // Ambiguous, can be either before or after end of DST, but moment will parse as before
    { 
      time: 'October 28, 2018 at 03:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },    
    { 
      time: 'October 28, 2018 at 04:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    // 2019
    { 
      time: 'October 27, 2019 at 02:59AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    // Ambiguous, can be either before or after end of DST, but moment will parse as before
    { 
      time: 'October 27, 2019 at 03:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },    
    { 
      time: 'October 27, 2019 at 04:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    // 2020
    { 
      time: 'October 25, 2020 at 02:59AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
    // Ambiguous, can be either before or after end of DST, but moment will parse as before
    { 
      time: 'October 25, 2020 at 03:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },    
    { 
      time: 'October 25, 2020 at 04:00AM',
      markerType: 'Stopped',
      length: '8.25',
      latitude: '51.5069638',
      longitude: '-0.1710014'
    },
  ];

  const transformed = sleepMarkerRows.map(transformSleepMarker);

  // 2018
  expect(transformed[0].localTime.isSame(moment.tz('2018-10-28 00:59:00', 'Europe/London'))).toBe(true);
  expect(transformed[0].localTime.tz()).toBe('Europe/London');
  expect(transformed[0].timezone).toBe('Europe/London');
  expect(transformed[0].utcTime.isSame(moment.tz('2018-10-27 23:59:00', 'UTC'))).toBe(true);

  // Before end of DST
  expect(transformed[1].localTime.isSame(moment.tz('2018-10-28 01:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[1].localTime.tz()).toBe('Europe/London');
  expect(transformed[1].timezone).toBe('Europe/London');
  expect(transformed[1].utcTime.isSame(moment.tz('2018-10-28 00:00:00', 'UTC'))).toBe(true);

  expect(transformed[2].localTime.isSame(moment.tz('2018-10-28 02:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[2].localTime.tz()).toBe('Europe/London');
  expect(transformed[2].timezone).toBe('Europe/London');
  expect(transformed[2].utcTime.isSame(moment.tz('2018-10-28 02:00:00', 'UTC'))).toBe(true);

  // 2019
  expect(transformed[3].localTime.isSame(moment.tz('2019-10-27 00:59:00', 'Europe/London'))).toBe(true);
  expect(transformed[3].localTime.tz()).toBe('Europe/London');
  expect(transformed[3].timezone).toBe('Europe/London');
  expect(transformed[3].utcTime.isSame(moment.tz('2019-10-26 23:59:00', 'UTC'))).toBe(true);

  // Before end of DST
  expect(transformed[4].localTime.isSame(moment.tz('2019-10-27 01:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[4].localTime.tz()).toBe('Europe/London');
  expect(transformed[4].timezone).toBe('Europe/London');
  expect(transformed[4].utcTime.isSame(moment.tz('2019-10-27 00:00:00', 'UTC'))).toBe(true);

  expect(transformed[5].localTime.isSame(moment.tz('2019-10-27 02:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[5].localTime.tz()).toBe('Europe/London');
  expect(transformed[5].timezone).toBe('Europe/London');
  expect(transformed[5].utcTime.isSame(moment.tz('2019-10-27 02:00:00', 'UTC'))).toBe(true);

  // 2020
  expect(transformed[6].localTime.isSame(moment.tz('2020-10-25 00:59:00', 'Europe/London'))).toBe(true);
  expect(transformed[6].localTime.tz()).toBe('Europe/London');
  expect(transformed[6].timezone).toBe('Europe/London');
  expect(transformed[6].utcTime.isSame(moment.tz('2020-10-24 23:59:00', 'UTC'))).toBe(true);

  // Before end of DST
  expect(transformed[7].localTime.isSame(moment.tz('2020-10-25 01:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[7].localTime.tz()).toBe('Europe/London');
  expect(transformed[7].timezone).toBe('Europe/London');
  expect(transformed[7].utcTime.isSame(moment.tz('2020-10-25 00:00:00', 'UTC'))).toBe(true);

  expect(transformed[8].localTime.isSame(moment.tz('2020-10-25 02:00:00', 'Europe/London'))).toBe(true);
  expect(transformed[8].localTime.tz()).toBe('Europe/London');
  expect(transformed[8].timezone).toBe('Europe/London');
  expect(transformed[8].utcTime.isSame(moment.tz('2020-10-25 02:00:00', 'UTC'))).toBe(true);
});
