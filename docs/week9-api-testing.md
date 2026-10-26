# Week 9 API Testing Evidence

## Test Execution

Run from the main project folder:

node --test server/test-api.js

The tests start their own temporary servers.

## API Test Results

| Test | Category | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| Valid shift swap | Valid | 200, standard approval | 200, standard approval | PASS |
| Overtime approval: 41 hours | Valid | 200, manager review | 200, manager review | PASS |
| Invalid shift time: end before start | Invalid | 400, rejected | 400, rejected | PASS |
| Missing requesting employee ID | Invalid | 400, rejected | 400, rejected | PASS |
| Identical shift start and end | Boundary | 400, rejected | 400, rejected | PASS |
| Exactly 40 weekly hours | Boundary | 200, standard approval | 200, standard approval | PASS |

## Summary

All 6 API tests passed with 0 failures.

The API accepted valid requests, rejected invalid shift times and missing employee IDs, and correctly handled the shift-time and 40-hour boundaries.
## JSON Demo Requests

I tested both JSON files by sending them to POST /api/shift-swaps using curl.

- accepted-shift-swap.json returned 200 OK, success: true, and the standard approval route.
- rejected-shift-swap.json returned 400 Bad Request, success: false, and a message explaining that the employee IDs must be different.