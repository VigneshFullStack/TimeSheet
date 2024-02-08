import React, { useState, useEffect } from "react";
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
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';


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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

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

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("task") || "[]");
    setTasks(storedTasks);
  }, [])

  const closePopup = () => {
    setOpen(false);
    setOpenDeleteDialog(false);
  };

  const openPopup = () => {
    setOpen(true);
  };

  const addNewTaskDialog = () => {
    openPopup();
  };

  const addNewTask = () => {

    // Generate a unique ID using timestamp and a random number
    const uniqueId = Date.now() + Math.random().toString(36).substr(2, 9);

    // Create an object containing all the details entered in the form fields
    const newTask = {
      id: uniqueId,
      employeeId: employeeId,
      employeeEmail: employeeEmail,
      department: department,
      date: date,
      task: task,
      toolOrProject: toolOrProject,
      ticketId: ticketId,
      hoursSpent: hoursSpent
    };

    // Store the task in LocalStorage
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem("task", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);

    console.log('Tasks : ', updatedTasks);

    toast.success("Daily Status Created Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    closePopup();
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "Invalid Date";
      }
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  const handleEdit = () => {
    // Implement edit functionality
  };

  const handleDelete = (taskId) => {
    // Set the taskId to delete and open the confirmation dialog
    setDeleteTaskId(taskId);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    // Filter out the task with the specified taskId
    const updatedTasks = tasks.filter((task) => task.id !== deleteTaskId);
    
    // Update localStorage
    localStorage.setItem("task", JSON.stringify(updatedTasks));
    
    // Update state with the filtered tasks array
    setTasks(updatedTasks);

    // Close the confirmation dialog
    setOpenDeleteDialog(false);

    // Clear the deleteTaskId state
    setDeleteTaskId(null);

    toast.success("Daily Status Deleted Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    closePopup();
  };

  return (
    <div>
      <Paper sx={{ margin: "1%" }}>
        <div style={{ margin: "1%" }}>
          <Button onClick={addNewTaskDialog} variant="contained" color="primary">
            Add New (+)
          </Button>
        </div>
        <div style={{ margin: "1%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "midnightblue" }}>
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
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    {columns.map((column) => {
                      if (column.id !== "id") {
                        return (
                          <TableCell key={column.id}>
                            {column.id === "date" ? (
                              formatDate(task[column.id])
                            ) : column.id === "action" ? (
                              <div>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  <IconButton aria-label="edit" style={{ color: '#4d94ff' }} size="small" onClick={() => handleEdit(task)}>
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton aria-label="delete" style={{ color: '#ff3333' }} size="small" onClick={() => handleDelete(task.id)}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Stack>
                              </div>
                            ) : (
                              task[column.id]
                            )}
                          </TableCell>
                        );
                      }
                      return null;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
      {/* Create Dialog */}
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
                autoComplete="off"
                autoFocus
              ></TextField>

              <TextField
                value={employeeEmail}
                onChange={(e) => {
                  setEmployeeEmail(e.target.value);
                }}
                variant="outlined"
                label="Email"
                autoComplete="off"
              ></TextField>

              <TextField
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
                variant="outlined"
                label="Department"
                autoComplete="off"
              ></TextField>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Date" />
                </DemoContainer>
              </LocalizationProvider>

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
                autoComplete="off"
              ></TextField>

              <TextField
                value={toolOrProject}
                onChange={(e) => {
                  setToolOrProject(e.target.value);
                }}
                variant="outlined"
                label="Tool/Project"
                autoComplete="off"
              ></TextField>

              <TextField
                value={ticketId}
                onChange={(e) => {
                  setTicketId(e.target.value);
                }}
                variant="outlined"
                label="TicketId"
                autoComplete="off"
              ></TextField>

              <TextField
                value={hoursSpent}
                onChange={(e) => {
                  setHoursSpent(e.target.value);
                }}
                variant="outlined"
                label="Hours Spent"
                autoComplete="off"
              ></TextField>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={addNewTask} variant="contained" color="primary" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={closePopup}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeTasksTable;
