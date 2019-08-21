package com.todoapp.backend.modal;

public class SubTask {
    private String subTaskID;
    private String subTaskName;
    private boolean isCompleted;

    public SubTask(String subTaskName) {
        this.subTaskName = subTaskName;
        this.isCompleted = false;
    }
}
