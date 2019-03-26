package com.mpoc.sleeptrackerfix;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SleepMarker extends com.skedgo.converter.TimezoneMapper {
    private static final TimeZone IFTTT_TIMEZONE = TimeZone.getTimeZone("Europe/Vilnius");

    private Calendar date;
    private Calendar adjustedDate;
    private double latitude;
    private double longitude;
    private boolean start;
    private TimeZone localTimezone;

    public SleepMarker(Calendar date, double latitude, double longitude, boolean start) {
        this.date = date;
//        this.date.setTimeZone(IFTTT_TIMEZONE);
        this.latitude = latitude;
        this.longitude = longitude;
        this.start = start;
        localTimezone = getTimeZoneFromLatLong(latitude, longitude);
        adjustDate();
    }

    public SleepMarker(String date, String latitude, String longitude, String start) {
        this.date = parseDate(date);
//        this.date.setTimeZone(IFTTT_TIMEZONE);
        this.latitude = parseLatitude(latitude);
        this.longitude = parseLongitude(longitude);
        this.start = parseStart(start);
        localTimezone = getTimeZoneFromLatLong(this.latitude, this.longitude);
        adjustDate();
    }

    private void adjustDate() {
        adjustedDate = (GregorianCalendar)date.clone();
        if (!isSameTimezone(localTimezone, IFTTT_TIMEZONE)) {
            adjustedDate.setTimeZone(localTimezone);
        }
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

    private Calendar parseDate(String date) {
        final String regex = "\\\"(\\w+) (\\d{2}). (\\d{4}) at (\\d{2}):(\\d{2})(\\w{2})\"";
        final Pattern pattern = Pattern.compile(regex);
        final Matcher matcher = pattern.matcher(date);
        matcher.find();

        String year = matcher.group(3);
        String month = matcher.group(1);
        int monthInt = -1;
        String day = matcher.group(2);
        String hour = matcher.group(4);
//        int hourInt = -1;
        String minute = matcher.group(5);

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
            if (month.equals(months[i])) {
//                if ((i+1) < 10) {
//                    month = "0" + (i+1);
//                }
//                else {
//                    month = "" + (i+1);
//                }
                monthInt = i;
            }
        }


        if (matcher.group(6).equals("PM") && !hour.equals("12")) {
            int hourInt = Integer.parseInt(hour);
            hourInt += 12;
            hour = "" + hourInt;
        }
        else if (matcher.group(6).equals("AM") && hour.equals("12")) {
            hour = "00";
//            hourInt = 0;
        }

        int yearInt = Integer.parseInt(year);
//        int monthInt = Integer.parseInt(month);
        int dayInt = Integer.parseInt(day);
        int hourInt = Integer.parseInt(hour);
        int minuteInt = Integer.parseInt(minute);

        Calendar calendar = new GregorianCalendar();
        calendar.set(yearInt, monthInt, dayInt, hourInt, minuteInt);
        return calendar;
    }

    private TimeZone getTimeZoneFromLatLong(double latitude, double longitude) {
        String timezoneString = latLngToTimezoneString(latitude, longitude);
        return TimeZone.getTimeZone(timezoneString);
    }

    public Calendar getCalendar() {
        return adjustedDate;
    }

    public Date getDate() {
        return adjustedDate.getTime();
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

    public TimeZone getLocalTimezone() {
        return localTimezone;
    }

    public String getFormattedString() {
        return adjustedDate.get(Calendar.YEAR) + "-" +
                adjustedDate.get(Calendar.MONTH) + "-" +
                adjustedDate.get(Calendar.DAY_OF_MONTH) + " " +
                adjustedDate.get(Calendar.HOUR_OF_DAY) + ":" +
                adjustedDate.get(Calendar.MINUTE);
    }

    @Override
    public String toString() {
        String startString = isStart() ? "Started" : "Stopped";
        return startString + " at " + getFormattedString() + " in " + localTimezone.getID();
    }

    private static boolean isSameTimezone(TimeZone first, TimeZone second) {
        return first.getID().equals(second.getID());
    }
}
