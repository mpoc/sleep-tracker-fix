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
        String csvFilename = "src/com/mpoc/sleeptrackerfix/log.csv";

        getLog(sheetsUrl, csvFilename);

        ArrayList<String[]> rowsList = new ArrayList<>();
        populateRowsList(rowsList, csvFilename);

        ArrayList<SleepMarker> sleepMarkerList = new ArrayList<>();
        populateSleepMarkersList(sleepMarkerList, rowsList);

//        sleepMarkerList.forEach(System.out::println);

        ArrayList<Sleep> sleepList = new ArrayList<>();
        Iterator<SleepMarker> sleepMarkersIterator = sleepMarkerList.iterator();
        while (sleepMarkersIterator.hasNext()) {
            sleepList.add(new Sleep(sleepMarkersIterator.next(), sleepMarkersIterator.next()));
        }

        sleepList.forEach(System.out::println);
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

    public static void populateSleepMarkersList(ArrayList<SleepMarker> sleepMarkerList, ArrayList<String[]> rowsList) {
        rowsList.forEach(row -> {
            sleepMarkerList.add(new SleepMarker(row));
        });
    }
}
