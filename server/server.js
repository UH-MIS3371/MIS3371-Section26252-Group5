// Week 9 Express server will be added in Task 1
"use strict";

const path = require ("node:path");

const express = require("express");

const {processShiftSwap} = require("../backend/backend.js");

const app = express();

app.use(express.json({ limit: "20kb"}));

app.use(express.static(path.join(__dirname, "..")));

app.post("/api/shift-swaps", (req, res) => {
    const swapRequest = req.body;
    const result = processShiftSwap(swapRequest);
    return res.status(result.success ? 200: 400).json(result);
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Shift-swap server is running on port ${PORT}`);
        console.log(`Open http://localhost:${PORT} in your browser`);
    });
}

module.exports = app;