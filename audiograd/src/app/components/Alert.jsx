export default function Alert({message, alertType}) {
  return (
    <div className={`alert alert-${alertType || 'danger'} border-0`} role="alert">
      <strong>Error:</strong> {message || "The projects backend could not be reached at this time. We are actively working to figure this bug out. Please check back again later!"}
    </div>
  );
}
