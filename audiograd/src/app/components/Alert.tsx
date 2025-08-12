import React from "react";

interface AlertProps {
  message?: string; // Optional message
  alertType?: string; // Optional alert type
}

export default function Alert({ message, alertType }: AlertProps) {
  return (
    <div className={`alert alert-${alertType || 'danger'} border-0`} role="alert">
      <strong>Error:</strong> {message || "The projects backend could not be reached at this time. We are actively working to figure this bug out. Please check back again later!"}
    </div>
  );
}
