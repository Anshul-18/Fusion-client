import React, { useState, useEffect } from "react";
import { Table, Anchor, Container, Button, Flex } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // For making API requests

function DisciplineAcad() {
  const [disciplines, setDisciplines] = useState([]); // State to hold discipline data
  const [loading, setLoading] = useState(true); // Loading state for the API call
  const navigate = useNavigate(); // Hook to navigate between routes

  // Fetch data from the API
  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Replace with actual method to get token
        const response = await axios.get(
          "http://127.0.0.1:8000/programme_curriculum/api/admin_disciplines/",
          {
            headers: {
              Authorization: `Token ${token}`, // Add the Authorization header
            },
          },
        );
        setDisciplines(response.data.disciplines); // Set the data into state
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching disciplines: ", error);
        setLoading(false); // Set loading to false if there is an error
      }
    };

    fetchDisciplines(); // Trigger data fetch
  }, []);

  // const headerStyle = {
  //   padding: "10px",
  //   textAlign: "left",
  //   fontWeight: "bold",
  // };

  // const cellStyle = {
  //   padding: "10px",
  //   borderRight: "1px solid black",
  // };

  // const linkStyle = {
  //   marginRight: "10px",
  //   color: "#1e90ff",
  //   textDecoration: "underline",
  // };

  // const dividerStyle = {
  //   margin: "0 10px",
  // };

  // const editButtonStyle = {
  //   backgroundColor: "#28a745",
  //   color: "white",
  //   padding: "5px 10px",
  // };

  // const centerTextStyle = {
  //   textAlign: "center",
  // };

  return (
    <Container
      style={{
        borderRadius: "8px",
        marginLeft: "0",
        width: "100vw",
      }}
    >
      {/* Header and Button */}
      <Flex
        justify="space-between"
        align="center"
        style={{ marginTop: "20px" }}
        mb={20}
      >
        <Button variant="filled" style={{ marginRight: "10px" }}>
          Disciplines
        </Button>

        <Button
          style={{
            backgroundColor: "#007bff",
            color: "white",
            width: "15vw",
            marginLeft: "1.5vw",
            marginRight: "-22vw",
          }}
          onClick={() =>
            navigate("/programme_curriculum/acad_admin_add_discipline_form")
          }
        >
          ADD DISCIPLINE
        </Button>
      </Flex>

      {/* Scrollable and Larger Table */}
      <Flex style={{ width: "90vw", display: "flex" }}>
        <Table
          highlightOnHover
          verticalSpacing="sm"
          style={{
            width: "100vw", // Make the table larger by using full width
            border: "2px solid #1e90ff", // Added blue border
            borderRadius: "8px", // Optional: rounded corners for the table
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#15ABFF54" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Discipline</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Programmes</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : disciplines.length > 0 ? (
              disciplines.map((item, index) => (
                <tr
                  key={item.name}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#15ABFF1C",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#15ABFF1C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "#fff" : "#15ABFF1C";
                  }}
                >
                  <td
                    style={{ padding: "10px", borderRight: "1px solid black" }}
                  >
                    {item.name} ({item.acronym})
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      display: "flex",
                      alignItems: "center",
                      borderRight: "1px solid black",
                    }}
                  >
                    {item.programmes.map((program, i, array) => (
                      <React.Fragment key={i}>
                        <Anchor
                          component={Link}
                          to={`/programme_curriculum/acad_view?programme=${program.id}`}
                          style={{
                            marginRight: "10px",
                            color: "#1e90ff",
                            textDecoration: "underline",
                          }}
                        >
                          {program.name}
                        </Anchor>
                        {i < array.length - 1 && (
                          <span style={{ margin: "0 10px" }}>|</span>
                        )}
                      </React.Fragment>
                    ))}
                  </td>

                  {/* Edit Button */}
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <a
                      href={`/programme_curriculum/acad_admin_edit_discipline_form?discipline=${item.name}`}
                    >
                      <Button
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          padding: "5px 10px",
                        }}
                      >
                        EDIT
                      </Button>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No disciplines found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Flex>

      {/* Scrollable and Larger Table */}

      {/* <Card 
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adds elevation
          margin: "20px auto",
          // width: "100vw", // Centers the card and adjusts width
        }}
      > */}

      {/* <ScrollArea
        className="courses-scroll-area"
        type="hover"
        style={{
          height: "100vh",
          width: "90vw",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          margin: "20px 0 0 0",
        }}
        mr={25}
      >
        <Flex style={{ width: "100%", display: "flex" }}>
          <Table
            highlightOnHover
            verticalSpacing="sm"
            style={{
              width: "87vw", // Full width table
              border: "2px solid #1e90ff", // Blue border
              borderRadius: "8px", // Rounded corners
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#15ABFF54" }}>
                <th style={headerStyle}>Discipline</th>
                <th style={headerStyle}>Programmes</th>
                <th style={{ ...headerStyle, textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" style={centerTextStyle}>
                    Loading...
                  </td>
                </tr>
              ) : disciplines.length > 0 ? (
                disciplines.map((item, index) => (
                  <tr
                    key={item.name}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#15ABFF1C",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#15ABFF1C";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        index % 2 === 0 ? "#fff" : "#15ABFF1C";
                    }}
                  >
                    <td style={cellStyle}>
                      {item.name} ({item.acronym})
                    </td>
                    <td style={{ ...cellStyle, padding: "20px" }}>
                      {item.programmes.map((program, i, array) => (
                        <React.Fragment key={program.id}>
                          <Anchor
                            component={Link}
                            to={`/programme_curriculum/acad_view?programme=${program.id}`}
                            style={linkStyle}
                          >
                            {program.name}
                          </Anchor>
                          {i < array.length - 1 && (
                            <span style={dividerStyle}>|</span>
                          )}
                        </React.Fragment>
                      ))}
                    </td>
                    <td style={{ ...cellStyle, textAlign: "center" }}>
                      <a
                        href={`/programme_curriculum/acad_admin_edit_discipline_form?discipline=${item.name}`}
                      >
                        <Button style={editButtonStyle}>EDIT</Button>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={centerTextStyle}>
                    No disciplines found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Flex>
      </ScrollArea> */}

      {/* </Card>       */}
    </Container>
  );
}

export default DisciplineAcad;
