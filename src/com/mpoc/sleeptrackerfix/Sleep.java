package com.mpoc.sleeptrackerfix;

import java.time.Duration;
import java.time.LocalDate;

public abstract class Sleep implements Comparable<Sleep> {
    private Duration duration;
    private LocalDate assignedDate;

    public Sleep(LocalDate assignedDate) {
        super();
        this.assignedDate = assignedDate;
    }

    public Duration getDuration() {
        return duration;
    }

    public LocalDate getAssignedDate() {
        return assignedDate;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    @Override
    public int compareTo(Sleep compareSleep) {
        int compareDuration = (int) compareSleep.duration.toMinutes();

        // Ascending order
        return (int) this.duration.toMinutes() - compareDuration;
    }
}
