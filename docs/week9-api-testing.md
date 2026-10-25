# Week 9 API Testing Evidence


## API Test Results

I ran the API tests using:
node server/test-api.js

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| Valid shift swap |200, standard approval | 200, standard approval | Pass |
| Overtime approval | 200, manager review | 200, manager review | Pass |
| Invalid shift time | 400, rejected | 400, rejected| Pass |
| Missing employee ID | 400, rejected | 400, rejected | Pass |
| Same employee ID | 400, rejected | 400, rejected | Pass |
| Missing receiving ID | 400, rejected | 400, rejected| Pass |

## Summary

All 6 API tests passed with 0 failures.

The API accepted valid requests and rejected invalid requests.
