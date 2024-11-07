import { ActionIcon, Table } from "@mantine/core";
import { Bell } from "@phosphor-icons/react";
import React, { useState , useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import "./Admin_view_semesters_of_a_curriculum.css";
import axios from "axios";
function Admin_view_semesters_of_a_curriculum() {
  // Demo data (matches the example layout)
  const curriculum = {
    name: "CSE UG Curriculum",
    no_of_semester: 8,
    batches: ["2020", "2021"],
  };


  const [curriculumData, setCurriculumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddCourseSlotHovered, setIsAddCourseSlotHovered] = useState(false);
  const [isInstigateSemesterHovered, setIsInstigateSemesterHovered] = useState(false);

  const [searchParams] = useSearchParams();
  const curriculumId = searchParams.get('curriculum');

  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Replace with actual method to get token
  
        const response = await axios.get(
          `http://127.0.0.1:8000/programme_curriculum/api/admin_curriculum_semesters/${curriculumId}`,  // Use backticks for template literal
          {
            headers: {
              Authorization: `Token ${token}`,  // Add the Authorization header
            },
          }
        );
        // console.log(response)
        setCurriculumData(response.data);
      } catch (error) {
        console.error("Error fetching curriculum data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculumData();
  }, []);
  // console.log(curriculumData)

  if (loading) return <div>Loading...</div>;
  const { curriculum_name, version, batches} = curriculumData;
  // console.log(batches)
  const semesters = curriculumData.semesters;
  const semesterWiseSlots = curriculumData.semesters.reduce((acc, semester) => {
    acc[`Semester ${semester.semester_no}`] = semester.slots;
    return acc;
  }, {});
  // console.log(semesterWiseSlots)
  const semester_credits = semesters.map((semester) => semester.credits);
  // console.log(semester_credits)
  const semesterscnt = semesters.map(
    (semester) => `Semester ${semester.semester_no}`
  );
  const maxSlots = Math.max(...Object.values(semesterWiseSlots).map(slots => slots.length));

  return (
    <div style={{ position: "relative" }}>
      <h2>{curriculum_name} Table</h2>

      <button
        className="options-button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Options
      </button>

      {/* Options visible on hover */}
      {isHovered && (
        <div
          className={`options-dropdown ${isHovered ? "open" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="dropdown-section">
            <h4 className="section-title">CURRICULUM</h4>
            <a
              href={`/programme_curriculum/admin_edit_curriculum_form?curriculum=${
                curriculum.id
              }`}
              style={{ textDecoration: "none" }}
            >
              <button className="dropdown-btn green-btn">
                EDIT CURRICULUM
              </button>
            </a>
            <div
              className="instigate-semester"
              onMouseEnter={() => setIsInstigateSemesterHovered(true)}
              onMouseLeave={() => setIsInstigateSemesterHovered(false)}
            >
              <button className="add-instigate-semester-button">
                INSTIGATE SEMESTER
              </button>

              {/* Semester options visible on hover */}
              {isInstigateSemesterHovered && (
                <div className="instigate-semester-dropdown">
                  {semesterscnt.map((semester, index) => (
                    <a
                      href={`/programme_curriculum/acad_admin_instigate_form?semester=${
                        semester
                      }`}
                      style={{ textDecoration: "none" }}
                    >
                      <div key={index} className="instigate-semester-option">
                        <text>{semester}</text>
                        <ActionIcon variant="light">
                          <Bell size={20} />
                        </ActionIcon>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div
              className="add-course-slot"
              onMouseEnter={() => setIsAddCourseSlotHovered(true)}
              onMouseLeave={() => setIsAddCourseSlotHovered(false)}
            >
              <button className="add-course-slot-button">
                ADD COURSE SLOT
              </button>

              {/* Semester options visible on hover */}
              {isAddCourseSlotHovered && (
                <div className="semester-dropdown">
                  {semesterscnt.map((semester, index) => (
                    <a
                      href={`/programme_curriculum/acad_admin_add_courseslot_form?semester=${
                        semester
                      }`}
                      style={{ textDecoration: "none" }}
                    >
                      <div key={index} className="semester-option">
                        <text>{semester}</text>
                        <text>+</text>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="dropdown-section">
            <h4 className="section-title">BATCHES</h4>
            <a
              href="/programme_curriculum/acad_admin_add_batch_form"
              style={{ textDecoration: "none" }}
            >
              <button className="dropdown-btn blue-btn">NEW BATCH</button>
            </a>
            <a
              href="/programme_curriculum/admin_edit_batch_form"
              style={{ textDecoration: "none" }}
            >
              <button className="dropdown-btn blue-btn">EDIT BATCH</button>
            </a>

            {/* <button className="dropdown-btn black-btn">LINK BATCH</button> */}
          </div>
        </div>
      )}

      <Table
        striped
        highlightOnHover
        style={{
          borderCollapse: "collapse",
          textAlign: "center",
          width: isHovered ? "calc(100% - 15vw)" : "100%", // Shrink table width when hovered
          transition: "width 0.3s ease", // Smooth transition
        }}
      >
        <thead>
          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }} />
            <td colSpan={semesterscnt.length} style={{ border: "1px solid black" }}>
              <h2>{curriculum_name} &nbsp; v{version}</h2>
            </td>
          </tr>
          {batches.length > 0 && (
            <tr style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }} />
              <td
                colSpan={curriculum.no_of_semester}
                style={{ border: "1px solid black" }}
              >
                <h4>
                  Batches:&nbsp;&nbsp;&nbsp;
                  {batches.map((batch, index) => (
                    <span key={index}>{batch.name} {batch.discipline} {batch.year},&nbsp;&nbsp;&nbsp;</span>
                  ))}
                </h4>
              </td>
            </tr>
          )}
          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }} />
            {semesters.map((semester, index) => (
              <td key={index} style={{ border: "1px solid black" }}>
                <a
                  href={`/programme_curriculum/semester_info?semester_id=${semester.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <strong style={{ color: "blue", fontSize: "0.85vw" }}>
                    Semester {semester.semester_no}
                  </strong>
                </a>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
        {Array.from({ length: maxSlots }).map((_, slotIndex) => (
          <tr key={slotIndex} style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }}>Slot {slotIndex + 1}</td>
            {Object.values(semesterWiseSlots).map((slotRow, semesterIndex) => {
              const slot = slotRow[slotIndex];
              return (
                <td key={semesterIndex} style={{ border: "1px solid black" }}>
                  {slot && slot.name ? (
                    slot.courses.length === 1 ? (
                      <div>
                        <a
                          href={`/programme_curriculum/course_slot_details?course_slot=${slot.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <p>
                            <strong style={{ fontSize: "0.65vw" }}>{slot.courses[0].name}</strong>
                            <br />
                            (L: {slot.courses[0].lecture_hours}, T: {slot.courses[0].tutorial_hours}, C: {slot.courses[0].credit})
                          </p>
                        </a>
                      </div>
                    ) : (
                      <div>
                        <a
                          href={`/programme_curriculum/course_slot_details?course_slot=${slot.id}`}
                          style={{ textDecoration: "none" }}
                        >
                        <strong style={{ fontSize: "0.65vw" }}>{slot.name}</strong>

                        </a>
                      </div>
                    )
                  ) : (
                    <div />
                  )}
                </td>
              );
            })}
          </tr>
        ))}


          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }}>
              <strong style={{ color: "blue", fontSize: "0.75vw" }}>
                Start Date
              </strong>
            </td>
            {semesters.map((semester, index) => (
              <td key={index} style={{ border: "1px solid black" }}>
                {semester.start_semester || "N/A"}
              </td>
            ))}
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }}>
              <strong style={{ color: "blue", fontSize: "0.75vw" }}>
                End Date
              </strong>
            </td>
            {semesters.map((semester, index) => (
              <td key={index} style={{ border: "1px solid black" }}>
                {semester.end_semester || "N/A"}
              </td>
            ))}
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <td style={{ border: "1px solid black" }}>
              <strong style={{ color: "blue", fontSize: "0.75vw" }}>
                Total Credits
              </strong>
            </td>
            {semester_credits.map((credit, index) => (
              <td key={index} style={{ border: "1px solid black" }}>
                {credit}
              </td>
            ))}
          </tr>
          <tr style={{ border: "1px solid black", padding: "0.75vw 45%" }}>
            <td style={{ border: "1px solid black" }}>
              <strong style={{ color: "blue", fontSize: "0.75vw" }}>
                Instigated
              </strong>
            </td>
            {semesters.map((semester, index) => (
              <td key={index} style={{ border: "1px solid black" }}>
                {semester.is_instigated ? (
                  <div style={{ color: "green" }}>
                    <i className="icon checkmark" /> Yes
                  </div>
                ) : (
                  <div style={{ color: "red" }}>
                    <i className="attention icon" /> Not Yet
                  </div>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Admin_view_semesters_of_a_curriculum;
