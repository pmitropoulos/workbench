package eu.slipo.workbench.common.model.process;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import eu.slipo.workbench.common.model.user.AccountInfo;

public class ProcessExecutionRecord {

    private long id = -1L;

    private String name;

    private AccountInfo submittedBy;

    private ZonedDateTime submittedOn;

    private ProcessIdentifier process;

    private ZonedDateTime startedOn;

    private ZonedDateTime completedOn;

    private EnumProcessExecutionStatus status;

    private String errorMessage;

    private List<ProcessExecutionStepRecord> steps;

    public ProcessExecutionRecord() {}

    public ProcessExecutionRecord(long executionId, long processId, long processVersion)
    {
        this.id = executionId;
        this.process = new ProcessIdentifier(processId, processVersion);
    }

    public ProcessExecutionRecord(long executionId, ProcessIdentifier processIdentifier)
    {
        this.id = executionId;
        this.process = new ProcessIdentifier(processIdentifier);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AccountInfo getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(int id, String name) {
        this.submittedBy = new AccountInfo(id, name);
    }

    public void setSubmittedBy(AccountInfo submittedBy) {
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

    public List<ProcessExecutionStepRecord> getSteps()
    {
        return steps == null?
            Collections.emptyList() : Collections.unmodifiableList(steps);
    }

    public void addStep(ProcessExecutionStepRecord s)
    {
        if (this.steps == null) {
            this.steps = new ArrayList<>();
        }
        this.steps.add(s);
    }

}
