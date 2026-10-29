"use strict";

const apiForm = shiftSwapForm;

apiForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  updateOvertimeMessage();
  updateShiftTimeMessage();

  // Block invalid shift times before contacting the server.
  if (
    !isShiftTimeValid(
      requesterStartInput.value,
      requesterEndInput.value
    )
  ) {
    formMessage.textContent =
      "Correct the requester shift times before submitting.";
    requesterEndInput.focus();
    return;
  }

  if (
    !isShiftTimeValid(
      targetStartInput.value,
      targetEndInput.value
    )
  ) {
    formMessage.textContent =
      "Correct the receiving employee shift times before submitting.";
    targetEndInput.focus();
    return;
  }

  const fields = new FormData(apiForm);

  // Map the HTML field names to the backend's expected names.
  const data = {
    requestingEmployeeId: fields.get("requester_employee_id"),
    receivingEmployeeId: fields.get("target_employee_id"),
    requesterStart: requesterStartInput.value,
    requesterEnd: requesterEndInput.value,
    receivingStart: targetStartInput.value,
    receivingEnd: targetEndInput.value,
    receivingWeeklyHours: Number(weeklyHoursInput.value)
  };

  formMessage.textContent = "Submitting shift-swap request...";

  try {
    const response = await fetch("https://abygqwgavh.execute-api.us-east-1.amazonaws.com/api/shift-swaps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      formMessage.textContent =
        result.message || "The server rejected the request.";
      return;
    }

    formMessage.textContent =
      `Request ${result.requestId} submitted. ${result.approvalPath}`;
  } catch (error) {
    console.error("API connection error:", error);

    formMessage.textContent =
      "Unable to connect to the server. Please make sure it is running and try again.";
  }
});