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

  const transformed = sleepMarkerRows.map(sleepMarkerRow =>
    transformSleepMarker(sleepMarkerRow)
  );

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

  const transformed = sleepMarkerRows.map(sleepMarkerRow =>
    transformSleepMarker(sleepMarkerRow)
  );

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
  ];

  const transformed = sleepMarkerRows.map(sleepMarkerRow =>
    transformSleepMarker(sleepMarkerRow)
  );

  expect(transformed[0].localTime.isSame(moment.tz('2020-01-08 06:58:00', 'Europe/London'))).toBe(true);
  expect(transformed[0].localTime.tz()).toBe('Europe/London');
  expect(transformed[0].timezone).toBe('Europe/London');
  expect(transformed[0].utcTime.isSame(moment.tz('2020-01-08 06:58:00', 'UTC'))).toBe(true);
});
