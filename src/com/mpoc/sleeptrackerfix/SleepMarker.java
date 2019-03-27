package com.mpoc.sleeptrackerfix;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SleepMarker extends com.skedgo.converter.TimezoneMapper {
    private static final String IFTTT_TIMEZONE = "Europe/Vilnius";

    private static final int DATE = 0;
    private static final int START_STOP = 1;
    private static final int LENGTH = 2;
    private static final int LAT = 3;
    private static final int LONG = 4;

    private ZonedDateTime date;
    private ZonedDateTime adjustedDate;
    private double latitude;
    private double longitude;
    private boolean start;
    private ZoneId localTimezone;

    public SleepMarker(String[] csvCells) {
        date = parseDate(csvCells[DATE]);
        start = parseStart(csvCells[START_STOP]);
        latitude = parseLatitude(csvCells[LAT]);
        longitude = parseLongitude(csvCells[LONG]);
        localTimezone = ZoneId.of(latLngToTimezoneString(latitude, longitude));
        adjustDate();
    }

    private void adjustDate() {
        adjustedDate = date.withZoneSameInstant(localTimezone);
    }

    private boolean parseStart(String start) {
        return start.equals("Started");
    }

    private double parseLongitude(String longitude) {
        return Double.parseDouble(longitude);
    }

    private double parseLatitude(String latitude) {
        return Double.parseDouble(latitude);
    }

    private ZonedDateTime parseDate(String dateTimeString) {
        final String regex = "\\\"(\\w+) (\\d{2}). (\\d{4}) at (\\d{2}):(\\d{2})(\\w{2})\"";
        final Pattern pattern = Pattern.compile(regex);
        final Matcher matcher = pattern.matcher(dateTimeString);
        matcher.find();

        String yearString = matcher.group(3);
        String monthString = matcher.group(1);
        String dayString = matcher.group(2);
        String ampmHourString = matcher.group(4);
        String minuteString = matcher.group(5);
        String ampmString = matcher.group(6);

        int yearInt = Integer.parseInt(yearString);
        int monthInt = -1;
        int dayInt = Integer.parseInt(dayString);
        int ampmHourInt = Integer.parseInt(ampmHourString);
        int minuteInt = Integer.parseInt(minuteString);
        int ampmInt = (ampmString.equals("AM")) ? 0 : 1;
        int hourOfDayInt = convertAmPmToHourOfDay(ampmHourInt, ampmInt);

        String[] months = {
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
        };

        for (int i = 0; i < months.length; i++) {
            if (monthString.equals(months[i])) {
                monthInt = i+1;
            }
        }

        return ZonedDateTime.of(yearInt, monthInt, dayInt, hourOfDayInt, minuteInt, 0, 0, ZoneId.of(IFTTT_TIMEZONE));
    }

    /**
     *
     * @param ampmHour 1-12
     * @param ampm 0 for AM, 1 for PM
     * @return
     */
    private int convertAmPmToHourOfDay(int ampmHour, int ampm) {
        ampmHour = (ampmHour == 12) ? 0 : ampmHour;
        return (ampm == 1) ? ampmHour+12 : ampmHour;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public ZonedDateTime getAdjustedDate() {
        return adjustedDate;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public boolean isStart() {
        return start;
    }

    public ZoneId getLocalTimezone() {
        return localTimezone;
    }

    private String isStartString() {
        return start ? "Started" : "Stopped";
    }

    @Override
    public String toString() {
        return isStartString() + " at " + adjustedDate.toString();
    }
}
