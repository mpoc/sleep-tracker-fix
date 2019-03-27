package com.mpoc.sleeptrackerfix;

import java.time.Duration;
import java.time.LocalDate;

public class AllNighter extends Sleep {

    public AllNighter(LocalDate assignedDate) {
        super(assignedDate);
        setDuration(Duration.ZERO);
    }

    @Override
    public String toString() {
        return "For " + getAssignedDate() + ": " + getDuration().toMinutes() / 60.0 + " hours";
    }
}
