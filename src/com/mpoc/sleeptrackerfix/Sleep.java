package com.mpoc.sleeptrackerfix;

import java.time.Duration;
import java.time.LocalDate;

public class Sleep implements Comparable<Sleep> {
    private SleepMarker start;
    private SleepMarker stop;
    private Duration duration;
    private LocalDate assignedDate;

    public Sleep(SleepMarker start, SleepMarker stop, LocalDate assignedDate) {
        super();
        this.start = start;
        this.stop = stop;
        this.assignedDate = assignedDate;
        duration = Duration.between(start.getAdjustedDate(), stop.getAdjustedDate());
    }

    public Sleep(LocalDate assignedDate) {
        super();
        // TODO fix start and stop dates for this case
        this.assignedDate = assignedDate;
        duration = Duration.ZERO;
    }

    public SleepMarker getStart() {
        return start;
    }

    public SleepMarker getStop() {
        return stop;
    }

    public Duration getDuration() {
        return duration;
    }

    public LocalDate getAssignedDate() {
        return assignedDate;
    }

    @Override
    public String toString() {
        if (start == null && stop == null) {
            return "For " + assignedDate + ": " + duration.toMinutes() / 60.0 + " hours";
        }
        else {
            return "For " + assignedDate + ": " + start.getAdjustedDate() + " to " + stop.getAdjustedDate() + ": " + duration.toMinutes() / 60.0 + " hours";
        }
    }

    @Override
    public int compareTo(Sleep compareSleep) {

        int compareDuration = (int) compareSleep.getDuration().toMinutes();

        // Ascending order
        return (int) this.duration.toMinutes() - compareDuration;
    }
}
