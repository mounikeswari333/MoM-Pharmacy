import { FaRegClipboard } from "react-icons/fa";
import "./HealthRecords.css";

function HealthRecords() {
  return (
    <section className="empty-state-page">
      <FaRegClipboard className="empty-state-icon" aria-hidden="true" />
      <h2>Health Records</h2>
      <p>No data available</p>
    </section>
  );
}

export default HealthRecords;
