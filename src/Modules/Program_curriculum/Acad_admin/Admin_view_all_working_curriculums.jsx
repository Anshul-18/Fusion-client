import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button, TextInput, ScrollArea, Select } from "@mantine/core";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

function Admin_view_all_working_curriculums() {
  const [searchName, setSearchName] = useState("");
  const [searchVersion, setSearchVersion] = useState("");
  const [curriculums, setCurriculums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Curriculum");
  const [filter, setFilter] = useState({
    name: "",
    year: "",
    curriculum: "",
    runningBatch: "",
    discipline: "",
  });
  const [filteredBatches, setFilteredBatches] = useState([]);
  console.log(filteredBatches);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const filtered = curriculums.filter((batch) => {
      return (
        (filter.name === "" || batch.name.includes(filter.name)) &&
        (filter.year === "" || String(batch.year).includes(filter.year)) &&
        (filter.curriculum === "" || batch.curriculum === filter.curriculum) &&
        (filter.runningBatch === "" || batch.status === filter.runningBatch) &&
        (filter.discipline === "" || batch.discipline === filter.discipline)
      );
    });
    setFilteredBatches(filtered);
    setSearchName(filter.name);
    setSearchVersion(1);
  };

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/programme_curriculum/api/admin_working_curriculums/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        setCurriculums(response.data.curriculums);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching curriculums: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtered data based on search inputs
  const filteredData = curriculums.filter(
    (item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase()) &&
      item.version.toString().includes(searchVersion),
  );

  // Define alternating row colors
  const rows = filteredData.map((element, index) => (
    <tr
      key={element.name + element.version}
      style={{ backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#E6F7FF" }}
    >
      <td
        style={{
          padding: "15px 20px",
          textAlign: "center",
          color: "#3498db",
          textDecoration: "underline",
          cursor: "pointer",
          borderRight: "1px solid #d3d3d3",
        }}
      >
        {/* Curriculum name as a link */}
        <Link
          to={`/programme_curriculum/view_curriculum?curriculum=${element.id}`}
          style={{ color: "#3498db", textDecoration: "underline" }}
        >
          {element.name}
        </Link>
      </td>
      <td
        style={{
          padding: "15px 20px",
          textAlign: "center",
          borderRight: "1px solid #d3d3d3",
        }}
      >
        {element.version}
      </td>
      <td
        style={{
          padding: "15px 20px",
          borderRight: "1px solid #d3d3d3",
          textAlign: "center",
        }}
      >
        {element.batch && element.batch.length > 0 ? (
          element.batch.map((b, i) => <div key={i}>{b}</div>)
        ) : (
          <div>No Curriculum available</div>
        )}
      </td>
      <td
        style={{
          padding: "15px 20px",
          textAlign: "center",
          borderRight: "1px solid #d3d3d3",
        }}
      >
        {element.semesters}
      </td>
      <td
        style={{
          padding: "15px 20px",
          textAlign: "center",
        }}
      >
        {/* Edit button as a link */}
        <Link to="/programme_curriculum/admin_edit_curriculum_form">
          <Button variant="filled" color="green" radius="md">
            EDIT
          </Button>
        </Link>
      </td>
    </tr>
  ));

  return (
    <div>
      <div className="courses-container">
        <div
          className={`courses-table-section ${isSearchVisible ? "" : "full-width"}`}
        >
          <div className="tabs">
            <Button
              variant={activeTab === "Curriculum" ? "filled" : "outline"}
              onClick={() => setActiveTab("Curriculum")}
            >
              Curriculum
            </Button>
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
            {!isSearchVisible ? (
              <MagnifyingGlass
                size={24}
                onClick={() => setIsSearchVisible(true)}
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
            {activeTab === "Curriculum" && (
              <div className="batches-table">
                <Table
                  highlightOnHover
                  verticalSpacing="sm"
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    flexGrow: 1,
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: "12px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          padding: "12px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        Version
                      </th>
                      <th
                        style={{
                          padding: "12px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        Batch
                      </th>
                      <th
                        style={{
                          padding: "12px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRight: "1px solid #d3d3d3",
                        }}
                      >
                        No. of Semesters
                      </th>
                      <th
                        style={{
                          padding: "12px 20px",
                          backgroundColor: "#C5E2F6",
                          color: "#3498db",
                          fontSize: "16px",
                          textAlign: "center",
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          Loading...
                        </td>
                      </tr>
                    ) : rows.length > 0 ? (
                      rows
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          No curriculums found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </ScrollArea>
        </div>

        {isSearchVisible && (
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
                  onClick={() => setIsSearchVisible(false)}
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

export default Admin_view_all_working_curriculums;

// <MantineProvider
//       theme={{ colorScheme: "light" }}
//       withGlobalStyles
//       withNormalizeCSS
//     >
//       <Container
//         style={{ padding: "20px", minHeight: "100vh", maxWidth: "100%" }}
//       >
//         <Flex justify="space-between" align="center" mb={20}>
//   <Button variant="filled" style={{ marginRight: "10px" }}>
//     Curriculums
//   </Button>

//   {/* New Flex container for "ADD CURRICULUM" button and the search icon */}
//   <Flex align="center">
//     <Link
//       to="/programme_curriculum/acad_admin_add_curriculum_form"
//       style={{ textDecoration: "none" }}
//     >
//       <Button variant="filled" fullWidth style={{ marginBottom: "0px" }}>
//         ADD CURRICULUM
//       </Button>
//     </Link>

//     {/* Search Icon (magnifying glass) on the right */}
//     <ActionIcon
//       variant="outline"
//       color="blue"
//       onClick={() => setSearchVisible(!searchVisible)}
//       style={{ marginLeft: "10px" }} // Add space between the button and the icon
//     >
//       {searchVisible ? <X size={18} /> : <MagnifyingGlass size={18} />}
//     </ActionIcon>
//   </Flex>
// </Flex>

//         <Grid>
//           <Grid.Col span={9}>
//             {/* Table Section */}

//             <ScrollArea
//               type="hover"
//               style={{
//                 boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.2)",
//                 overflow: "auto",
//               }}
//               className="no-scrollbar"
//             >
//               <div
//                 style={{
//                   height: "500px",
//                   overflowY: "auto",
//                   border: "2px solid rgb(30, 144, 255)",
//                   // borderRadius: "10px",
//                 }}
//               >
//                 <Table
//                   highlightOnHover
//                   verticalSpacing="sm"
//                   style={{
//                     backgroundColor: "white",
//                     padding: "20px",
//                     flexGrow: 1,
//                   }}
//                 >
//                   <thead>
//                     <tr>
//                       <th
//                         style={{
//                           padding: "12px 20px",
//                           backgroundColor: "#C5E2F6",
//                           color: "#3498db",
//                           fontSize: "16px",
//                           textAlign: "center",
//                           borderRight: "1px solid #d3d3d3",
//                         }}
//                       >
//                         Name
//                       </th>
//                       <th
//                         style={{
//                           padding: "12px 20px",
//                           backgroundColor: "#C5E2F6",
//                           color: "#3498db",
//                           fontSize: "16px",
//                           textAlign: "center",
//                           borderRight: "1px solid #d3d3d3",
//                         }}
//                       >
//                         Version
//                       </th>
//                       <th
//                         style={{
//                           padding: "12px 20px",
//                           backgroundColor: "#C5E2F6",
//                           color: "#3498db",
//                           fontSize: "16px",
//                           textAlign: "center",
//                           borderRight: "1px solid #d3d3d3",
//                         }}
//                       >
//                         Batch
//                       </th>
//                       <th
//                         style={{
//                           padding: "12px 20px",
//                           backgroundColor: "#C5E2F6",
//                           color: "#3498db",
//                           fontSize: "16px",
//                           textAlign: "center",
//                           borderRight: "1px solid #d3d3d3",
//                         }}
//                       >
//                         No. of Semesters
//                       </th>
//                       <th
//                         style={{
//                           padding: "12px 20px",
//                           backgroundColor: "#C5E2F6",
//                           color: "#3498db",
//                           fontSize: "16px",
//                           textAlign: "center",
//                         }}
//                       >
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {loading ? (
//                       <tr>
//                         <td colSpan="5" style={{ textAlign: "center" }}>
//                           Loading...
//                         </td>
//                       </tr>
//                     ) : rows.length > 0 ? (
//                       rows
//                     ) : (
//                       <tr>
//                         <td colSpan="5" style={{ textAlign: "center" }}>
//                           No curriculums found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </Table>
//               </div>
//             </ScrollArea>
//           </Grid.Col>

//           <Grid.Col span={3}>
//             <Paper shadow="xs" p="md">
//               {/* ADD CURRICULUM button as a link */}

//               {/* Filters */}
//               <TextInput
//                 label="Name"
//                 value={searchName}
//                 onChange={(event) => setSearchName(event.currentTarget.value)}
//                 mb="sm"
//               />
//               <TextInput
//                 label="Version"
//                 value={searchVersion}
//                 onChange={(event) =>
//                   setSearchVersion(event.currentTarget.value)
//                 }
//               />
//             </Paper>
//           </Grid.Col>
//         </Grid>
//       </Container>

//       <style>{`
//         .no-scrollbar {
//   scrollbar-width: none; /* Firefox */
//   -ms-overflow-style: none; /* Internet Explorer 10+ */
// }

// .no-scrollbar::-webkit-scrollbar {
//   display: none; /* Chrome, Safari, and Edge */
// }

//       `}</style>
//     </MantineProvider>
