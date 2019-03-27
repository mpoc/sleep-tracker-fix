package com.mpoc.sleeptrackerfix;

import java.time.Duration;

public class Sleep {
    private SleepMarker start;
    private SleepMarker stop;
    private Duration duration;

    public Sleep(SleepMarker start, SleepMarker stop) {
        this.start = start;
        this.stop = stop;
        duration = Duration.between(start.getAdjustedDate(), stop.getAdjustedDate());
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

    @Override
    public String toString() {
        return start.getAdjustedDate() + " to " + stop.getAdjustedDate() + ": " + duration.toMinutes()/60.0 + " hours";
    }
}
