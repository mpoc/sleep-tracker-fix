package com.mpoc.sleeptrackerfix;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

public class Main {

    public static void main(String[] args) throws Exception {
//        SleepMarker sleepmarker = new SleepMarker("\"February 27, 2019 at 11:00AM\"", "51.5541025", "-0.0888811", "Stopped");
//        System.out.println(sleepmarker.getFormattedString());

        String sheetsUrl = args[0];
        String filename = "src/com/mpoc/sleeptrackerfix/log.csv";

        getLog(sheetsUrl, filename);

        ArrayList<String[]> rows = new ArrayList<>();
        populateRowsList(rows, filename);

        ArrayList<SleepMarker> sleepMarkers = new ArrayList<>();
        populateSleepMarkersList(sleepMarkers, rows);

//        sleepMarkers.forEach(System.out::println);

        ArrayList<Sleep> sleepList = new ArrayList<>();

        Iterator<SleepMarker> sleepMarkersIterator = sleepMarkers.iterator();
        while (sleepMarkersIterator.hasNext()) {
            sleepList.add(new Sleep(sleepMarkersIterator.next(), sleepMarkersIterator.next()));
        }

        sleepList.forEach(System.out::println);

        Calendar cal = new GregorianCalendar();
        cal.setTimeZone(TimeZone.getTimeZone("Europe/Vilnius"));
        cal.set(2019,02,27, 11,2);
        System.out.println(cal.getTime());
        System.out.println(cal.get(Calendar.HOUR));

        Calendar cal2 = (GregorianCalendar)cal.clone();
        cal2.setTimeZone(TimeZone.getTimeZone("Europe/London"));
        System.out.println(cal2.getTime());
        System.out.println(cal2.get(Calendar.HOUR));


    }

    public static void getLog(String url, String filename) throws Exception {
        InputStream in = new URL(url).openStream();
        Files.copy(in, Paths.get(filename), StandardCopyOption.REPLACE_EXISTING);
    }

    public static void populateRowsList(ArrayList<String[]> list, String filename) throws FileNotFoundException {
        Scanner sc = new Scanner(new File(filename));
        while (sc.hasNextLine()) {
            String row = sc.nextLine();
            //https://stackabuse.com/regex-splitting-by-character-unless-in-quotes/
            String[] cells = row.split(",(?=([^\\\"]*\\\"[^\\\"]*\\\")*[^\\\"]*$)");
            list.add(cells);
        }
    }

    public static void populateSleepMarkersList(ArrayList<SleepMarker> sleepMarkers, ArrayList<String[]> rows) {
        rows.forEach(row -> {
            sleepMarkers.add(new SleepMarker(row[0], row[3], row[4], row[1]));
        });
    }
}
