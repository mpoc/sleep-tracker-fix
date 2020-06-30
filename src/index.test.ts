import { transformSleepMarker, SleepMarkerRow } from './';

test('Correctly converts sleep marker date from Lithuania', () => {
  const sleepMarkerRow: SleepMarkerRow = {
    time: "June 30, 2020 at 01:09AM",
    markerType: "Started",
    length: "",
    latitude: "55.9518155",
    longitude: "23.2930583",
  };

  const transformed = transformSleepMarker(sleepMarkerRow);

  expect(transformed.localTime.isSame('2020-06-30 01:09:00')).toBe(true);
  expect(transformed.timezone).toBe('Europe/Vilnius');
});
