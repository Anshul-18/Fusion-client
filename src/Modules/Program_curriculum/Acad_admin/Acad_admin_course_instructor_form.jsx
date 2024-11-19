import React from "react";
import { Select, Group, Button, Container, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

function Acad_admin_add_course_intructor_form() {
  const form = useForm({
    initialValues: {
      course: "",
      instructor: "",
      batch: "",
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "0 0 0 -3.2vw",
        }}
      >
        <div
          style={{
            maxWidth: "90vw",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "2rem",
          }}
        >
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <Stack spacing="lg">
              <Text
                size="xl"
                weight={700}
                align="center"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  fontSize: "26px",
                }}
                c="blue"
              >
                Course Instructor Assignment
              </Text>

              {/* Select Course Dropdown */}
              <Select
                label="Select Course"
                placeholder="Choose a course"
                data={["Course 1", "Course 2", "Course 3"]} // Sample course list, replace with actual data
                value={form.values.course}
                onChange={(value) => form.setFieldValue("course", value)}
                required
              />

              {/* Select Instructor Dropdown */}
              <Select
                label="Select Instructor"
                placeholder="Choose an instructor"
                data={["Instructor 1", "Instructor 2", "Instructor 3"]} // Sample instructor list, replace with actual data
                value={form.values.instructor}
                onChange={(value) => form.setFieldValue("instructor", value)}
                required
              />

              {/* Select Batch Dropdown */}
              <Select
                label="Select Batch"
                placeholder="Choose a batch"
                data={["Batch 1", "Batch 2", "Batch 3"]} // Sample batch list, replace with actual data
                value={form.values.batch}
                onChange={(value) => form.setFieldValue("batch", value)}
                required
              />

              {/* Submit Button */}
              <Group position="center" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </Stack>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Acad_admin_add_course_intructor_form;
