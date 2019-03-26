package com.mpoc.sleeptrackerfix;

import java.time.Duration;
import java.util.Calendar;

public class Sleep {
    SleepMarker start;
    SleepMarker stop;
    Duration duration;

    public Sleep(SleepMarker start, SleepMarker stop) {
        this.start = start;
        this.stop = stop;
        duration = Duration.between(start.getDate().toInstant(), stop.getDate().toInstant());
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
        return start.getFormattedString() + " to " + stop.getFormattedString() + ": " + duration.toMinutes()/60.0 + " hours";
    }
}
