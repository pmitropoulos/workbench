package eu.slipo.workbench.common.model.process;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import eu.slipo.workbench.common.model.user.Account;

public class ProcessExecutionRecord {

    private long id;

    private String name;

    private Account submittedBy;

    private ZonedDateTime submittedOn;

    private ProcessIdentifier process;

    private ZonedDateTime startedOn;

    private ZonedDateTime completedOn;

    private EnumProcessExecutionStatus status;

    private EnumProcessTaskType task;

    private String errorMessage;

    private List<ProcessExecutionStepRecord> steps = new ArrayList<ProcessExecutionStepRecord>();

    public ProcessExecutionRecord(long executionId, long processId, long processVersion) {
        this.id = executionId;
        this.process = new ProcessIdentifier(processId, processVersion);
    }

    public ProcessExecutionRecord(long id, ProcessIdentifier process) {
        this.id = id;
        this.process = process.clone();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Account getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(int id, String name) {
        this.submittedBy = new Account(id, name, null);
    }

    public void setSubmittedBy(Account submittedBy) {
        this.submittedBy = submittedBy;
    }

    public ZonedDateTime getSubmittedOn() {
        return submittedOn;
    }

    public void setSubmittedOn(ZonedDateTime submittedOn) {
        this.submittedOn = submittedOn;
    }

    public ZonedDateTime getStartedOn() {
        return startedOn;
    }

    public void setStartedOn(ZonedDateTime startedOn) {
        this.startedOn = startedOn;
    }

    public ZonedDateTime getCompletedOn() {
        return completedOn;
    }

    public void setCompletedOn(ZonedDateTime completedOn) {
        this.completedOn = completedOn;
    }

    public EnumProcessExecutionStatus getStatus() {
        return status;
    }

    public void setStatus(EnumProcessExecutionStatus status) {
        this.status = status;
    }

    public EnumProcessTaskType getTask() {
        return task;
    }

    public void setTaskType(EnumProcessTaskType t) {
        this.task = t;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public long getId() {
        return id;
    }

    public ProcessIdentifier getProcess() {
        return process;
    }

    public List<ProcessExecutionStepRecord> getSteps() {
        return Collections.unmodifiableList(steps);
    }

    public void addStep(ProcessExecutionStepRecord s) {
        this.steps.add(s);
    }

}