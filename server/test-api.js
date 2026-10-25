
"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const app = require("./server.js");

// Basic shift swap information
const request = {
    requestingEmployeeId: "EMP-001",
    receivingEmployeeId: "EMP-002",
    requesterStart: "2026-10-20T09:00",
    requesterEnd: "2026-10-20T17:00",
    receivingStart: "2026-10-20T09:00",
    receivingEnd: "2026-10-20T17:00",
    receivingWeeklyHours: 40
};

// Send a request to the API
async function checkAPI(data, expectedStatus, expectedReview) {
    const server = app.listen(0);
    const port = server.address().port;

    try {
        const response = await fetch(`http://localhost:${port}/api/shift-swaps`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        assert.equal(response.status, expectedStatus);
        assert.equal(result.success, expectedStatus === 200);

        if (expectedStatus === 200) {
            assert.equal(result.managerReviewRequired, expectedReview);
        }
    } finally {
        server.close();
    }
}

// Test 1: Valid shift swap
test("Valid shift swap", async () => {
    await checkAPI(request, 200, false);
});

// Test 2: Overtime requires manager review
test("Overtime approval", async () => {
    const data = { ...request, receivingWeeklyHours: 41 };
    await checkAPI(data, 200, true);
});

// Test 3: Invalid shift time
test("Invalid shift time", async () => {
    const data = { ...request, requesterEnd: "2026-10-20T08:00" };
    await checkAPI(data, 400);
});

// Test 4: Missing employee ID
test("Missing employee ID", async () => {
    const data = { ...request, requestingEmployeeId: "" };
    await checkAPI(data, 400);
});

// Test 5: Same employee ID
test("Same employee ID", async () => {
    const data = { ...request, receivingEmployeeId: "EMP-001" };
    await checkAPI(data, 400);
});

// Test 6: Missing receiving employee ID
test("Missing receiving employee ID", async () => {
    const data = { ...request, receivingEmployeeId: "" };
    await checkAPI(data, 400);
});

