// Week 8 - Backend Tests
// Task 2: Add six backend test cases here.

describe("Employee Shift Swap Approval Routing", () => {
    test("SHIFT_SWAP_001: 40 weekly hours uses standard approval", async () => { 
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
        expect(result.success).toBe(true);
        expect(result.message).toBe("Standard approval routing.");  
    });

    test("SHIFT_SWAP_002: 41 weekly hours requires manager review", async () => {
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
        expect(result.success).toBe(true);
        expect(result.message).toBe("Overtime flagged — manager review is required.");
    });

    test("SHIFT_SWAP_003: Invalid requester shift times", async () => {
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
        expect(result.success).toBe(false);
        expect(result.message).toBe("Requester shift end time must be after its start time.");
    });

    test("SHIFT_SWAP_004: Invalid receiving shift times", async () => {
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
        expect(result.success).toBe(false);
        expect(result.message).toBe("Receiving employee shift end time must be after its start time.");
    });

    test("SHIFT_SWAP_005: Missing requesting employee ID", async () => {
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
        expect(result.success).toBe(false);
        expect(result.message).toBe("Requesting employee ID is required.");
    });

    test("SHIFT_SWAP_006: Missing receiving employee ID", async () => {
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
        expect(result.success).toBe(false);
        expect(result.message).toBe("Receiving employee ID is required.");
    });
});