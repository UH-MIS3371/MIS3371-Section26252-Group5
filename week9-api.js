"use strict";

const apiForm = shiftSwapForm;

apiForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  updateOvertimeMessage();
  updateShiftTimeMessage();

  const fields = new FormData(apiForm);

  const data = {
    requestingEmployeeId: fields.get("requesting_Employee_Id"),
    receivingEmployeeId: fields.get("receiving_Employee_Id"),
    requesterStart: requesterStartInput.value,
    requesterEnd: requesterEndInput.value,
    receivingStart: targetStartInput.value,
    receivingEnd: targetEndInput.value,
    receivingWeeklyHours: fields.get("receiving_Weekly_Hours"),
    Number(weeklyHoursInput.value),
  };

  formMessage.textContent = "Submitting shift swap request...";

  try {
    const response = await fetch("/api/shift-swaps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok || !result.success) 
      {
      
        formMessage.textContent = result.message || "The server rejected the request.";

        return;
    }
  
    formMessage.textContent = `Request ${result.requestId} submitted. ${result.approvalPath}.`;

  } catch (error) {

    console.error("API connection error:", error);
    formMessage.textContent = "Unable to connecyct to the server. Please try again.";

  }

});
  