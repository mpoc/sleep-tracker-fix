package com.mpoc.sleeptrackerfix;

import java.time.Duration;
import java.time.LocalDate;

public class SleepPeriod extends Sleep {
    private SleepMarker start;
    private SleepMarker stop;

    public SleepPeriod(SleepMarker start, SleepMarker stop, LocalDate assignedDate) {
        super(assignedDate);
        this.start = start;
        this.stop = stop;
        setDuration(Duration.between(start.getAdjustedDate(), stop.getAdjustedDate()));
    }

    public SleepMarker getStart() {
        return start;
    }

    public SleepMarker getStop() {
        return stop;
    }

    @Override
    public String toString() {
        return "For " + getAssignedDate() + ": " + start.getAdjustedDate() + " to " + stop.getAdjustedDate() + ": " + getDuration().toMinutes() / 60.0 + " hours";
    }
}
