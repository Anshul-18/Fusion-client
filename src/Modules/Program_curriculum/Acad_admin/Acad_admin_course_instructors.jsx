import React, { useState } from "react";
import { ScrollArea, Button, Select, TextInput, Table } from "@mantine/core";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

const courseData = [
  {
    courseCode: "NS205c",
    courseName: "Discrete Mathematics",
    version: "1.0",
    credits: 4,
  },
  {
    courseCode: "NS205i",
    courseName: "Culture and Science-a comparison",
    version: "1.0",
    credits: 4,
  },
  {
    courseCode: "CS418b",
    courseName: "Data Mining and Data Warehousing",
    version: "1.0",
    credits: 4,
  },
  {
    courseCode: "CS205",
    courseName: "Data Communication",
    version: "1.0",
    credits: 4,
  },
  {
    courseCode: "ME206L",
    courseName: "Thermodynamics + Solid Mechanics",
    version: "1.0",
    credits: 2,
  },
  {
    courseCode: "NS102",
    courseName: "Engineering Mechanics",
    version: "1.0",
    credits: 4,
  },
];

function CourseInstructorPage() {
  const [showSearch, setShowSearch] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    year: "",
    curriculum: "",
    runningBatch: "",
    discipline: "",
  });
  // const [error, setError] = useState(null); // Handle errors

  // if (error) {
  //   return <div>Error: {error}</div>; // Show error message if there's an issue
  // }
  // const [courseInstructor, setCourseInstructor] = useState([]);
  const [courseInstructor, setCourseInstructor] = useState(courseData);

  // NOTE: WRITTEN TEMPORARILY
  // setCourseInstructor([]);
  const handleSearch = () => {
    const filtered = courseInstructor.filter((batch) => {
      return (
        (filter.name === "" || batch.name.includes(filter.name)) &&
        (filter.year === "" || String(batch.year).includes(filter.year)) &&
        (filter.curriculum === "" || batch.curriculum === filter.curriculum) &&
        (filter.runningBatch === "" || batch.status === filter.runningBatch) &&
        (filter.discipline === "" || batch.discipline === filter.discipline)
      );
    });
    setFilter(filtered);
    setCourseInstructor(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="courses-container">
        <div
          className={`courses-table-section ${showSearch ? "" : "full-width"}`}
        >
          <div className="tabs">
            <Button

            // onClick={() => setActiveTab("courseinstructor")}
            >
              Course Instructors
            </Button>
            {/* <Button
              variant={activeTab === "Finished Batches" ? "filled" : "outline"}
              onClick={() => setActiveTab("Finished Batches")}
            >
              Finished Batches
            </Button> */}
          </div>
          <div className="top-actions">
            <a
              href="/programme_curriculum/acad_admin_add_batch_form"
              style={{ textDecoration: "none" }}
            >
              <Button variant="filled" color="blue">
                Add Batch
              </Button>
            </a>
            {!showSearch ? (
              <MagnifyingGlass
                size={24}
                onClick={() => setShowSearch(true)}
                style={{ cursor: "pointer", color: "#007bff" }}
              />
            ) : null}
          </div>
          <ScrollArea
            className="courses-scroll-area"
            type="hover"
            style={{
              // height: "100vh",
              backgroundColor: "white",
              // padding: "0px 20px",
              boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.2)",
              // borderRadius: "5px",
              margin: "20px 20px 0 0",
            }}
          >
            {
              <div className="batches-table">
                <Table
                  style={{
                    width: "100%",
                    border: "1px solid #007bff",
                    borderCollapse: "collapse",
                    textAlign: "left",
                    backgroundColor: "#fff",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "#b3d9ff", // Light blue header
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #007bff",
                          textAlign: "left",
                        }}
                      >
                        Course Code
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #007bff",
                          textAlign: "left",
                        }}
                      >
                        Course Name
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #007bff",
                          textAlign: "left",
                        }}
                      >
                        Version
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #007bff",
                          textAlign: "left",
                        }}
                      >
                        Credits
                      </th>
                      <th
                        style={{
                          padding: "10px",
                          border: "1px solid #007bff",
                          textAlign: "center",
                        }}
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.map((course, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#ffffff" : "#f0f8ff", // Alternating row colors
                        }}
                      >
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #007bff",
                            color: "#007bff",
                          }}
                        >
                          {course.courseCode}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #007bff",
                          }}
                        >
                          {course.courseName}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #007bff",
                          }}
                        >
                          {course.version}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #007bff",
                          }}
                        >
                          {course.credits}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #007bff",
                            textAlign: "center",
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "#28a745",
                              color: "#fff",
                              borderRadius: "5px",
                              fontWeight: "bold",
                              padding: "5px 10px",
                              fontSize: "12px",
                            }}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            }
          </ScrollArea>
        </div>

        {showSearch && (
          <ScrollArea
            className="courses-search-section"
            type="hover"
            style={{ height: "500px" }}
          >
            <div className="courses-search-card">
              <div className="filter-form">
                {/* Close icon in the search section */}
                <X
                  size={24}
                  onClick={() => setShowSearch(false)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    cursor: "pointer",
                    color: "#ff0000",
                  }}
                />

                <h3>Filter Search</h3>
                <TextInput
                  label="Name contains:"
                  value={filter.name}
                  name="name"
                  onChange={handleInputChange}
                />
                <TextInput
                  label="Year contains:"
                  value={filter.year}
                  name="year"
                  onChange={handleInputChange}
                />
                <Select
                  label="Curriculum"
                  placeholder="Select curriculum"
                  value={filter.curriculum}
                  onChange={(value) =>
                    setFilter({ ...filter, curriculum: value })
                  }
                  data={[
                    {
                      value: "CSE PhD Curriculum v1.0",
                      label: "CSE PhD Curriculum v1.0",
                    },
                    {
                      value: "ME PhD Curriculum v1.0",
                      label: "ME PhD Curriculum v1.0",
                    },
                  ]}
                />
                <Select
                  label="Running batch"
                  placeholder="Select batch status"
                  value={filter.runningBatch}
                  onChange={(value) =>
                    setFilter({ ...filter, runningBatch: value })
                  }
                  data={[
                    { value: "Unknown", label: "Unknown" },
                    { value: "Running", label: "Running" },
                  ]}
                />
                <Select
                  label="Discipline"
                  placeholder="Select discipline"
                  value={filter.discipline}
                  onChange={(value) =>
                    setFilter({ ...filter, discipline: value })
                  }
                  data={[
                    {
                      value: "Mechanical Engineering ME",
                      label: "Mechanical Engineering ME",
                    },
                    {
                      value: "Computer Science and Engineering CSE",
                      label: "Computer Science and Engineering CSE",
                    },
                  ]}
                />
                <Button variant="filled" color="blue" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </div>
          </ScrollArea>
        )}
      </div>

      <style>{`
        .courses-container {
          display: flex;
          gap: 20px;
          width: 100%;
          transition: all 0.3s ease-in-out;
          margin:20px 0 0 20px;
        }

        .courses-table-section {
          flex: 3;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease-in-out;
        }

        .full-width {
          flex: 1;
        }

        .top-actions {
          display: flex;
          gap: 10px;
          margin-left: auto;
          align-items: center;
          margin-top: -7vh;
          margin-right: 25px;
        }

        .tabs {
          display: flex;
          gap: 20px;
        }

        .courses-scroll-area {
          // height:150vh;
        }

        .batches-table {
          // margin-top: 20px;
        }

        .courses-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #007bff;
        }

        .courses-table th, .courses-table td {
          padding: 10px;
          text-align: left;
          border: 1px solid #007bff;

        }

        .courses-search-section {
          flex: 1;
          min-width: 300px;
          transition: all 0.3s ease-in-out;
          height: 400px;
          position: relative;
        }

        .filter-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .breadcrumbs {
          font-size: 14px;
          margin-bottom: 10px;
          color: #333;
          font-size: 20px;
        }

        .breadcrumbs > span {
          margin-right: 5px;
          font-size: 1.4vw;
          font-weight: bold;
        }

        .breadcrumbs > span::after {
          content: ">";
          margin-left: 5px;
        }

        .breadcrumbs > span:last-child::after {
          content: ""; /* Remove the '>' from the last breadcrumb */
        }
      `}</style>
    </div>
  );
}

export default CourseInstructorPage;
