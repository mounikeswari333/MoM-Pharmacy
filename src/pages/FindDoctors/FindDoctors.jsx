import { useEffect, useState } from "react";
import doctors from "../../data/doctors.json";
import "./FindDoctors.css";

const DOCTOR_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

function FindDoctors() {
  const doctorList = Array.isArray(doctors) ? doctors : doctors.doctors || [];
  const specializationList = Array.isArray(doctors)
    ? [
        { id: "general", name: "General Physician" },
        { id: "dermatology", name: "Dermatology" },
        { id: "cardiology", name: "Cardiology" },
        { id: "pediatrics", name: "Pediatrics" },
      ]
    : doctors.specializations || [];

  const [searchText, setSearchText] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState(
    specializationList[0]?.id || "general"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, [searchText, selectedSpeciality]);

  const filteredDoctors = doctorList.filter((doctor) => {
    const matchSpeciality =
      doctor.specialization === selectedSpeciality ||
      doctor.speciality === selectedSpeciality;
    const text = searchText.toLowerCase();
    const matchText =
      doctor.name.toLowerCase().includes(text) ||
      doctor.hospital.toLowerCase().includes(text) ||
      (doctor.location || "").toLowerCase().includes(text);
    return matchSpeciality && matchText;
  });

  return (
    <div className="doctors-page">
      <section className="doctor-top-banner">
        <h3>Talk to a Doctor for an Instant advice</h3>
        <p>Get 5% Off | Use Code CC50</p>
      </section>

      <h2>Find Doctors</h2>
      <input
        type="text"
        className="doctor-search"
        placeholder="Search doctors, hospitals, or location"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="speciality-row">
        {specializationList.map((item) => (
          <button
            key={item.id}
            className={
              selectedSpeciality === item.id ? "active-speciality" : ""
            }
            onClick={() => setSelectedSpeciality(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {loading && <p className="loading">Loading doctors...</p>}
      {!loading && filteredDoctors.length === 0 && (
        <p className="no-results">No results found</p>
      )}

      <div className="doctor-list">
        {!loading &&
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-left">
                <img src={DOCTOR_IMAGE} alt={doctor.name} />
              </div>
              <div className="doctor-middle">
                <h3>{doctor.name}</h3>
                <p className="doctor-main">
                  {specializationList.find(
                    (spec) =>
                      spec.id === (doctor.specialization || doctor.speciality)
                  )?.name || doctor.specialization || doctor.speciality}
                </p>
                <p className="doctor-exp">
                  {doctor.experience} • {doctor.degree || "MBBS, MD"}
                </p>
                <p>{doctor.hospital}</p>
                <p>{doctor.location}</p>
                <p className="doctor-meta">
                  <span>{doctor.distance || "-"}</span>
                  <span>{doctor.rating ? `${doctor.rating}% Rating` : "-"}</span>
                  <span>{doctor.patients || "-"} Patients</span>
                </p>
              </div>
              <div className="doctor-right">
                <h3>Rs {doctor.fees || doctor.fee}</h3>
                <button>Visit Doctor</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FindDoctors;
