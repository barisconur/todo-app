package com.todoapp.backend.modal;

public class ToDoStatus {
    private boolean isCompleted;
    private boolean isDueTimeSet;
    private boolean isStarred;

    public ToDoStatus() {
        this.isCompleted = false;
        this.isDueTimeSet = false;
        this.isStarred = false;
    }
}
