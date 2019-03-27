package com.mpoc.sleeptrackerfix;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.time.LocalDate;
import java.util.*;

public class Main {

    public static void main(String[] args) throws Exception {
        String sheetsUrl = args[0];
        String csvFilename = "src/com/mpoc/sleeptrackerfix/log.csv";

        // Parse the raw csv file.
        getLog(sheetsUrl, csvFilename);

        // Get all the rows from the csv file.
        ArrayList<String[]> rowsList = new ArrayList<>();
        populateRowsList(rowsList, csvFilename);

        // Turn each row into an individual SleepMarker object and store it in a list.
        ArrayList<SleepMarker> sleepMarkerList = new ArrayList<>();
        populateSleepMarkersList(sleepMarkerList, rowsList);

        // Turn the SleepMarker objects into Sleeps (SleepPeriods or AllNighters)
        ArrayList<Sleep> sleepList = new ArrayList<>();
        Iterator<SleepMarker> sleepMarkersIterator = sleepMarkerList.iterator();

        /*
         Every sleep is assigned a date, for which it "was slept". In general, for a person
         with a normal sleep schedule it should be the date that the sleep starts in.
         For example, going to sleep at 2019-03-26 22:00 and waking up at 2019-03-27 06:00
         means that the sleep is assigned for the date of 2019-03-26.
         However, I do not have such a sleep schedule, which means that often a sleep for a
         day will only start after midnight.
        */
        double amountOfHoursForAnAllNighter = 30;

        // The date I started tracking my sleep
        LocalDate currentAssignDate = LocalDate.of(2018,1,23);

        // Add the first SleepPeriod without any checks
        sleepList.add(new SleepPeriod(sleepMarkersIterator.next(), sleepMarkersIterator.next(), currentAssignDate));

        // Add one day to the date to assign to Sleep objects
        currentAssignDate = currentAssignDate.plusDays(1);

        while (sleepMarkersIterator.hasNext()) {
            // The last element of sleepList is always going to be a SleepPeriod, because that's the last
            // think done at the end of this loop. Therefore, it is safe to cast the last element of sleepList.
            SleepMarker lastWakeUp = ((SleepPeriod) sleepList.get(sleepList.size()-1)).getStop();
            SleepMarker currentSleepStart = sleepMarkersIterator.next();
            SleepMarker currentSleepStop = sleepMarkersIterator.next();

            // If the duration between last wake up and this sleep start is more than amountOfHoursForAnAllNighter,
            // classify it as an all-nighter
            if (Duration.between(lastWakeUp.getAdjustedDate(), currentSleepStart.getAdjustedDate()).toHours() > amountOfHoursForAnAllNighter) {
                sleepList.add(new AllNighter(currentAssignDate));
                currentAssignDate = currentAssignDate.plusDays(1);
            }

            // This assumes that I never pull two all-nighters in a row
            // A way to fix this is to check for a multiple of amountOfHoursForAnAllNighter and
            // add that number of days to currentAssignDate (essentially skipping several dates to assign).
            sleepList.add(new SleepPeriod(currentSleepStart, currentSleepStop, currentAssignDate));

            currentAssignDate = currentAssignDate.plusDays(1);
        }
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
