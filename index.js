"use strict";

const { processShiftSwap } = require("./backend/backend.js");

function respond(statusCode, result) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(result)
    };
}

exports.handler = async (event) => {
    const method = event.requestContext?.http?.method || event.httpMethod;

    if (method !== "POST") {
        return respond(405, {
            success: false,
            message: "Only POST requests are supported."
        });
    }

    let data;

    try {
        const body = event.isBase64Encoded
            ? Buffer.from(event.body || "", "base64").toString("utf8")
            : event.body;

        data = JSON.parse(body);
    } catch {
        return respond(400, {
            success: false,
            message: "Request body must contain valid JSON."
        });
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return respond(400, {
            success: false,
            message: "Request body must be a JSON object."
        });
    }

    try {
        const result = processShiftSwap(data);
        return respond(result.success ? 200 : 400, result);
    } catch (error) {
        console.error("Shift-swap processing error:", error);

        return respond(500, {
            success: false,
            message: "Unable to process the request. Please try again."
        });
    }
};