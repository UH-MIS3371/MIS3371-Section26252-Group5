# Week 8 Backend Testing Evidence

Run tests using:
node backend/test-backend.js

## Business Rules Tested

### 1. Employee ID Validation
Both employees must provide an ID, and the IDs must be different. 

### 2. Shift-Time Validation
Each employee's shift must end after its start time

### 3. Overtime Approval Routing 
If the receiving employee's weekly hours exceed 40, manager review is required. If the hours are 40 or fewer, the request follows standard approval route. 

## Backend Test Results

| Test # | Test Name | Category | Condition Tested | Expected Result | Actual Result | Status | 
|---|---|---|---|---|---|---|
| 1 | Standard Approval | Valid | 40 weekly hours | Standard Approval | Standard approval route returned | PASS | 
| 2 | Manager Review | Valid | 41 weekly hours | Manager review required | Manager review required | PASS | 
| 3| Invalid Requester Shift | Invalid | Requester shift end is not after start | Rejected | Request rejected due to invalid requester shift times | PASS | 
| 4 | Invalid Receiving Shift | Invalid | Receiving shift end is not after start | Rejected | Request rejected due to invalid receiving shift times | PASS | 
| 5 | Missing Requester ID | Invalid | Requesting employee ID missing | Rejected | Request rejected because requesting employee ID is missing | PASS | 
| 6 | Missing receiving ID | Invalid | Receiving employee ID missing | Rejected | Request rejected because receiving employee ID is missing | PASS | 
| 7 | Same Employee IDs | Invalid | Both employee IDs are the same | Rejected | Request rejected because both employee IDs are the same | PASS | 
| 8 | Identical Shift Times | Boundary | Shift starts and ends at the same time | Rejected | Request rejected because shift start and end times are identical | PASS | 

## Test Execution Summary 

Command: 'node backend/test-backend.js' 

- Total test: 8 
- Passed: 8
- Failed: 0 

All eight tests passed during local execution using Node.js. 