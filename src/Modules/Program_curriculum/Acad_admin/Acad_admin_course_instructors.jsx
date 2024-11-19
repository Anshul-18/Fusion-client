import React from "react";
import {
  Table,
  Container,
  Flex,
  Button,
  ScrollArea,
  TextInput,
} from "@mantine/core";

const courseData = [
  {
    courseCode: "CS101",
    courseName: "DBMS",
    courseVersion: "1.0",
    instructor: "pkhurana",
    batch: "B.Tech CSE",
    year: 2022,
  },
];

function CourseInstructorPage() {
  return (
    <Container
      style={{
        padding: "20px",
        maxWidth: "100%",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Page Layout */}
      <Flex justify="space-between" align="flex-start" style={{ gap: "20px" }}>
        {/* Table Section */}
        <ScrollArea
          style={{
            width: "70%",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Course Instructors</h2>
          <Table
            highlightOnHover
            verticalSpacing="sm"
            style={{
              width: "100%",
              border: "1px solid #1e90ff",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#15ABFF54" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Course Code
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Course Name
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Course Version
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Instructor
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>Batch</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Year</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseData.map((course, index) => (
                <tr
                  key={course.courseCode}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#15ABFF1C",
                  }}
                >
                  <td style={{ padding: "10px" }}>{course.courseCode}</td>
                  <td style={{ padding: "10px" }}>{course.courseName}</td>
                  <td style={{ padding: "10px" }}>{course.courseVersion}</td>
                  <td style={{ padding: "10px" }}>{course.instructor}</td>
                  <td style={{ padding: "10px" }}>{course.batch}</td>
                  <td style={{ padding: "10px" }}>{course.year}</td>
                  <td style={{ padding: "10px" }}>
                    <Button
                      variant="outline"
                      color="blue"
                      size="xs"
                      style={{ fontWeight: "bold" }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>

        {/* Filter/Search Section */}
        <ScrollArea
          style={{
            width: "25%",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <Button
            variant="filled"
            style={{
              backgroundColor: "#1e90ff",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            ADD COURSE INSTRUCTOR
          </Button>
          <TextInput
            label="Course Code"
            placeholder="Enter course code"
            mb={15}
          />
          <TextInput
            label="Instructor Name"
            placeholder="Enter instructor name"
            mb={15}
          />
          <TextInput label="Programme" placeholder="Enter programme" mb={15} />
          <TextInput label="Year" placeholder="Enter year" mb={15} />
          <TextInput label="Branch" placeholder="Enter branch" mb={15} />
          <Button
            variant="outline"
            color="blue"
            style={{ width: "100%", fontWeight: "bold" }}
          >
            Search
          </Button>
        </ScrollArea>
      </Flex>
    </Container>
  );
}

export default CourseInstructorPage;
