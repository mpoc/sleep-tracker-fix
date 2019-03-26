package com.mpoc.sleeptrackerfix;

public enum ColumnEnum {

    TIME(0),
    START_STOP(1),
    LENGTH(2),
    LAT(3),
    LONG(4);

    private int colNo;

    private ColumnEnum(int colNo) {
        this.colNo = colNo;
    }

    public int getColNo() {
        return colNo;
    }
}
