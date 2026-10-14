const weeklyHourLimit = 40;
const weeklyHoursInput = document.querySelector("#target_weekly_hours");
const overtimeMessage = document.querySelector("#overtime_message");
const shiftSwapForm = document.querySelector("form");
const requesterStartInput = document.querySelector("#requester_shift_start");
const requesterEndInput = document.querySelector("#requester_shift_end");
const targetStartInput = document.querySelector("#target_shift_start");
const targetEndInput = document.querySelector("#target_shift_end");
const shiftTimeMessage = document.querySelector("#shift_time_message");
const formMessage = document.querySelector("#form_message");
 
function checkOvertime(totalHours) {
  if (totalHours > weeklyHourLimit) {
    return "Overtime flagged — manager review is required.";
  } else {
    return "No overtime flag is needed.";
  }
}
// Check that a scheduled shift ends after it starts
function isShiftTimeValid(startValue, endValue) {
  const startTime = new Date(startValue);
  const endTime = new Date(endValue);
 
  return endTime > startTime;
}
// Show the overtime result when the hours change
function updateOvertimeMessage() {
  if (weeklyHoursInput.value === "") {
    overtimeMessage.textContent = "";
    return;
  }
 
  const totalHours = Number(weeklyHoursInput.value);
  overtimeMessage.textContent = checkOvertime(totalHours);
}
 
// Show whether both scheduled shift times are valid
function updateShiftTimeMessage() {
  if (
    requesterStartInput.value === "" ||
    requesterEndInput.value === "" ||
    targetStartInput.value === "" ||
    targetEndInput.value === ""
  ) {
    shiftTimeMessage.textContent = "";
    return;
  }
 
  if (
    !isShiftTimeValid(
      requesterStartInput.value,
      requesterEndInput.value
    )
  ) {
    shiftTimeMessage.textContent =
      "Requester shift end must be after the start.";
    return;
  }
 
  if (
    !isShiftTimeValid(
      targetStartInput.value,
      targetEndInput.value
    )
  ) {
    shiftTimeMessage.textContent =
      "Receiving employee shift end must be after the start.";
    return;
  }
 
  shiftTimeMessage.textContent =
    "Both scheduled shift times are valid.";
}
// Validate the complete form when submitted
function handleFormSubmit(event) {
  event.preventDefault();
 
  updateOvertimeMessage();
  updateShiftTimeMessage();
 
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
 
  formMessage.textContent =
    "Client-side checks passed. The request is ready to continue.";
}
 
weeklyHoursInput.addEventListener("input", updateOvertimeMessage);
 
 
requesterStartInput.addEventListener("change", updateShiftTimeMessage);
requesterEndInput.addEventListener("change", updateShiftTimeMessage);
targetStartInput.addEventListener("change", updateShiftTimeMessage);
targetEndInput.addEventListener("change", updateShiftTimeMessage);
shiftSwapForm.addEventListener("submit", handleFormSubmit);
 
// Test below, at, and above the 40-hour limit
console.log("39 hours:", checkOvertime(39));
console.log("40 hours:", checkOvertime(40));
console.log("41 hours:", checkOvertime(41));
// Test valid, boundary, and invalid shift-time cases
console.log(
  "Valid shift:",
  isShiftTimeValid("2026-10-20T09:00", "2026-10-20T17:00")
);
console.log(
  "Boundary - same time:",
  isShiftTimeValid("2026-10-20T09:00", "2026-10-20T09:00")
);
console.log(
  "Invalid - end before start:",
  isShiftTimeValid("2026-10-20T17:00", "2026-10-20T09:00")
);
console.log(
  "Valid receiving shift:",
  isShiftTimeValid("2026-10-21T08:00", "2026-10-21T16:00")
);