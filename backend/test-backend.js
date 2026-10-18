"use strict";

// Import the backend function Luis created so we can test it.
const { processShiftSwap } = require("./backend.js");

// Use Node's built-in testing tools.
const { describe, test } = require("node:test");
const assert = require("node:assert/strict");

// Week 8 backend tests
// These tests check employee IDs, shift times, and overtime approval rules.

describe("Employee Shift Swap Approval Routing", () => {

    // Test 1: A valid request with 40 hours should use standard approval.
    test("SHIFT_SWAP_001: 40 weekly hours uses standard approval", () => {
        const request = {
            requestingEmployeeId: "EMP-001",
            receivingEmployeeId: "EMP-002",
            requesterStart: "2026-10-20T09:00",
            requesterEnd: "2026-10-20T17:00",
            receivingStart: "2026-10-20T09:00",
            receivingEnd: "2026-10-20T17:00",
            receivingWeeklyHours: 40
        };

        const result = processShiftSwap(request);

        assert.equal(result.success, true);
        assert.equal(result.message, "Standard approval route.");
        assert.equal(result.managerReviewRequired, false);
    });

    // Test 2: Going over 40 hours should require manager review.
    test("SHIFT_SWAP_002: 41 weekly hours requires manager review", () => {
        const request = {
            requestingEmployeeId: "EMP-001",
            receivingEmployeeId: "EMP-002",
            requesterStart: "2026-10-20T09:00",
            requesterEnd: "2026-10-20T17:00",
            receivingStart: "2026-10-20T09:00",
            receivingEnd: "2026-10-20T17:00",
            receivingWeeklyHours: 41
        };

        const result = processShiftSwap(request);

        assert.equal(result.success, true);
        assert.equal(result.message, "Overtime flagged — manager review is required.");
        assert.equal(result.managerReviewRequired, true);
    });

    // Test 3: The request should fail if the requester's shift ends before it starts.
    test("SHIFT_SWAP_003: Invalid requester shift times", () => {
        const request = {
            requestingEmployeeId: "EMP-001",
            receivingEmployeeId: "EMP-002",
            requesterStart: "2026-10-20T17:00",
            requesterEnd: "2026-10-20T09:00",
            receivingStart: "2026-10-20T09:00",
            receivingEnd: "2026-10-20T17:00",
            receivingWeeklyHours: 35
        };

        const result = processShiftSwap(request);

        assert.equal(result.success, false);
        assert.equal(result.message, "Requester shift end time must be after its start time.");
    });

    // Test 4: The receiving employee's shift must also have valid start and end times.
    test("SHIFT_SWAP_004: Invalid receiving shift times", () => {
        const request = {
            requestingEmployeeId: "EMP-001",
            receivingEmployeeId: "EMP-002",
            requesterStart: "2026-10-20T09:00",
            requesterEnd: "2026-10-20T17:00",
            receivingStart: "2026-10-20T17:00",
            receivingEnd: "2026-10-20T09:00",
            receivingWeeklyHours: 35
        };

        const result = processShiftSwap(request);

        assert.equal(result.success, false);
        assert.equal(result.message, "Receiving employee shift end time must be after its start time.");
    });

    // Test 5: A request cannot go through without the requesting employee's ID.
    test("SHIFT_SWAP_005: Missing requesting employee ID", () => {
        const request = {
            requestingEmployeeId: "",
            receivingEmployeeId: "EMP-002",
            requesterStart: "2026-10-20T09:00",
            requesterEnd: "2026-10-20T17:00",
            receivingStart: "2026-10-20T09:00",
            receivingEnd: "2026-10-20T17:00",
            receivingWeeklyHours: 35
        };

        const result = processShiftSwap(request);

        assert.equal(result.success, false);
        assert.equal(result.message, "Requesting employee ID is required.");
    });

    // Test 6: The receiving employee's ID is required too.
    test("SHIFT_SWAP_006: Missing receiving employee ID", () => {
        const request = {
            requestingEmployeeId: "EMP-001",
            receivingEmployeeId: "",
            requesterStart: "2026-10-20T09:00",
            requesterEnd: "2026-10-20T17:00",
            receivingStart: "2026-10-20T09:00",
            receivingEnd: "2026-10-20T17:00",
            receivingWeeklyHours: 35
        };

        const result = processShiftSwap(request);

        assert.equal(result.success, false);
        assert.equal(result.message, "Receiving employee ID is required.");
    });

    // Test 7: An employee should not be able to swap a shift with themselves.
    test("SHIFT_SWAP_007: Same employee ID for both employees", () => {
        const request = {
            requestingEmployeeId: "EMP-001",
            receivingEmployeeId: "EMP-001",
            requesterStart: "2026-10-20T09:00",
            requesterEnd: "2026-10-20T17:00",
            receivingStart: "2026-10-20T09:00",
            receivingEnd: "2026-10-20T17:00",
            receivingWeeklyHours: 35
        };

        const result = processShiftSwap(request);

        assert.equal(result.success, false);
        assert.equal(
            result.message,
            "Requesting employee ID must be different from receiving employee ID."
        );
    });

    // Test 8: A shift cannot start and end at the exact same time.
    test("SHIFT_SWAP_008: Shift starts and ends at the same time", () => {
        const request = {
            requestingEmployeeId: "EMP-001",
            receivingEmployeeId: "EMP-002",
            requesterStart: "2026-10-20T09:00",
            requesterEnd: "2026-10-20T09:00",
            receivingStart: "2026-10-20T09:00",
            receivingEnd: "2026-10-20T17:00",
            receivingWeeklyHours: 35
        };

        const result = processShiftSwap(request);

        assert.equal(result.success, false);
        assert.equal(result.message, "Requester shift end time must be after its start time.");
    });

});