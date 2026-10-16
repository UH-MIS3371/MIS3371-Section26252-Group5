// Week 8 - Backend Transaction Processing
// Task 1: Implement processShiftSwap() here.
"use strict";

function getTodayString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

let requestSequence = 0;

function generateRequestID() {
    requestSequence += 1;
    return `REQ-${Date.now()}-${requestSequence}`;
}

function fail(message) {
    return {
        success: false,
        message
    };
}

function parseShiftTime(value) {
    const text = /^\d{2}:\d{2}$/.test(value) ? `${getTodayString()}T${value}` : value;
    return new Date(text).getTime();
}

function processShiftSwap(request) {

    const weeklyHourLimit = 40;
    const requestingEmployeeId = String(request.requestingEmployeeId || "").trim();
    const receivingEmployeeId = String(request.receivingEmployeeId || "").trim();
    const requesterStartTime = parseShiftTime(request.requesterStart);
    const requesterEndTime = parseShiftTime(request.requesterEnd);
    const receivingStartTime = parseShiftTime(request.receivingStart);
    const receivingEndTime = parseShiftTime(request.receivingEnd);
    const receivingWeeklyHours = Number(request.receivingWeeklyHours);

    if (!requestingEmployeeId) {
        return fail("Requesting employee ID is required.");
    }

    if (!receivingEmployeeId) {
        return fail("Receiving employee ID is required.");
    }
    if (requestingEmployeeId === receivingEmployeeId) {
        return fail("Requesting employee ID must be different from receiving employee ID.");
    }
    
        if (Number.isNaN(requesterStartTime) || Number.isNaN(requesterEndTime)) {
    return fail("Requester shift start and end times are required.");
    }

    if (Number.isNaN(receivingStartTime) || Number.isNaN(receivingEndTime)) {
        return fail("Receiving employee shift start and end times are required.");
    }

    if (requesterEndTime <= requesterStartTime) {
        return fail("Requester shift end time must be after its start time.");
    }

    if (receivingEndTime <= receivingStartTime) {
        return fail("Receiving employee shift end time must be after its start time.");
    }

    
    const managerReviewRequired = receivingWeeklyHours > weeklyHourLimit;
    const approvalPath = managerReviewRequired ? "Manager review required." : "Standard approval route.";

    return {
        success: true,
        requestId: generateRequestID(),
        status: "Submitted",
        submittedAt: new Date().toISOString(),
        managerReviewRequired,
        approvalPath,
        message: managerReviewRequired
            ? "Overtime flagged — manager review is required."
            : "Standard approval route."
    };
}

module.exports = { 
    processShiftSwap,
    getTodayString
};