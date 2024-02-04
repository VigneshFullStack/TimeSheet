import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField } from "@mui/material";

const EmployeeTasksTable = () => {
  const columns = [
    { id: "id", name: "Id" },
    { id: "employeeId", name: "employeeId" },
    { id: "employeeEmail", name: "Email" },
    { id: "department", name: "Department" },
    { id: "date", name: "Date" },
    { id: "task", name: "Task" },
    { id: "toolOrProject", name: "Tool/Project" },
    { id: "ticketId", name: "TicketId" },
    { id: "hoursSpent", name: "HoursSpent" },
    { id: "action", name: "Action" },
  ];

  const [open, setOpen] = useState(false);

  // State variables for each property
  const [id, setId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState("");
  const [toolOrProject, setToolOrProject] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [hoursSpent, setHoursSpent] = useState("");

  const closePopup = () => {
    setOpen(false);
  };

  const openPopup = () => {
    setOpen(true);
  };

  const addNewTask = () => {
    openPopup();
  };

  return (
    <div>
      <Paper sx={{ margin: "1%" }}>
        <div style={{ margin: "1%" }}>
          <Button onClick={addNewTask} variant="contained" color="primary">
            Add New (+)
          </Button>
        </div>
        <div style={{ margin: "1%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "midnightblue" }}>
                  {/* {columns.map((column) => (
                    <TableCell key={column.id} style={{ color: "white" }}>
                      {column.name}
                    </TableCell>
                  ))} */}

                  {columns.map(
                    (column) =>
                      // Check if the column id is not 'id' before rendering
                      column.id !== "id" && (
                        <TableCell key={column.id} style={{ color: "white" }}>
                          {column.name}
                        </TableCell>
                      )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {employeeTasks.map((task) => (
              <TableRow key={task.employeeId}>
                {columns.map((column) => (
                  <TableCell key={column.id}>{task[column.id]}</TableCell>
                ))}
                <TableCell>
                </TableCell>
              </TableRow>
            ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
      <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          <span>Create Daily Status</span>
        </DialogTitle>
        <DialogContent>
          <form>
            <Stack spacing={2} margin={2}>
              <TextField
                value={employeeId}
                onChange={(e) => {
                  setEmployeeId(e.target.value);
                }}
                variant="outlined"
                label="EmployeeId"
              ></TextField>

              <TextField
                value={employeeEmail}
                onChange={(e) => {
                  setEmployeeEmail(e.target.value);
                }}
                variant="outlined"
                label="Email"
              ></TextField>

              <TextField
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
                variant="outlined"
                label="Department"
              ></TextField>

              {/* <TextField
                type="date"
                value={date.toISOString().split("T")[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="Date"
              /> */}

              <TextField
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                }}
                multiline
                minRows={4}
                // maxRows={3}
                variant="outlined"
                label="Task"
              ></TextField>

              <TextField
                value={toolOrProject}
                onChange={(e) => {
                  setToolOrProject(e.target.value);
                }}
                variant="outlined"
                label="Tool/Project"
              ></TextField>

              <TextField
                value={ticketId}
                onChange={(e) => {
                  setTicketId(e.target.value);
                }}
                variant="outlined"
                label="TicketId"
              ></TextField>

              <TextField
                value={hoursSpent}
                onChange={(e) => {
                  setHoursSpent(e.target.value);
                }}
                variant="outlined"
                label="Hours Spent"
              ></TextField>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup} variant="contained" color="error">
            Cancel
          </Button>
          <Button variant="contained" color="primary" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeTasksTable;
