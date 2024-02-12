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
import { Stack, TablePagination, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CreateTask, GetAllTasks, GetTaskById } from "../Redux/ActionCreater";
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenPopup } from "../Redux/Action";

const EmployeeTasksTable = (props) => {

  const dispatch = useDispatch();

  // State variables for each property
  const [id, setId] = useState(0);
  const [employeeId, setEmployeeId] = useState(0);
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState("");
  const [toolOrProject, setToolOrProject] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [hoursSpent, setHoursSpent] = useState("");

  const [rowperpage, rowperpageChange] = useState(10);
  const [page, pageChange] = useState(0);

  const [title, titleChange] = useState('Create Task');
  const [btnTitle, btnTitleChange] = useState('Create');
  const [isEdit, isEditChange] = useState(false);

  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const editTaskObj = useSelector((state) => state.task.taskObj);

  useEffect(() => {
    console.log('editTaskObj : ', editTaskObj)
    if (Object.keys(editTaskObj).length > 0) {
      setEmployeeId(editTaskObj[0].employeeId);
      setEmployeeEmail(editTaskObj[0].employeeEmail);
      setDepartment(editTaskObj[0].department);
      setDate(editTaskObj[0].date);
      setTask(editTaskObj[0].task);
      setToolOrProject(editTaskObj[0].toolOrProject);
      setTicketId(editTaskObj[0].ticketId);
      setHoursSpent(editTaskObj[0].hoursSpent);
    } else {
      clearState();
    }
  }, [editTaskObj])

  useEffect(() => {
    props.loadTask();
  }, [])

  const handlePageChange = (event, newpage) => {
    pageChange(newpage);
  }

  const handleRowPerPageChange = (event) => {
    rowperpageChange(+event.target.value);
    pageChange(0);
  }

  const clearState = () => {
    setEmployeeId(0);
    setEmployeeEmail("");
    setDepartment("");
    setDate(new Date());
    setTask("");
    setToolOrProject("");
    setTicketId("");
    setHoursSpent("");
  };

  const handleValidation = () => {
    if (!employeeId) {
      toast.error('Please fill Employee ID', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    if (!employeeEmail) {
      toast.error('Please fill Employee Email', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    if (!department) {
      toast.error('Please fill Department', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    if (!date) {
      toast.error('Please select a Date', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    if (!task) {
      toast.error('Please fill Task', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    if (!toolOrProject) {
      toast.error('Please fill Tool/Project', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    if (!hoursSpent) {
      toast.error('Please fill Hours Spent', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    return true; // If all validations pass
  };

  const closePopup = () => {
    setOpen(false);
    setOpenDeleteDialog(false);
  };

  const openpopup = () => {
    setOpen(true);
    clearState();
    dispatch(OpenPopup())
  };

  const addNewTaskDialog = () => {
    isEditChange(false);
    titleChange('Create Daily Status');
    openpopup();
  };

  const addNewTask = () => {
    toast.dismiss();

    if (handleValidation()) {

      // Create an object containing all the details entered in the form fields
      const newTask = {
        id: id,
        employeeId: employeeId,
        employeeEmail: employeeEmail,
        department: department,
        date: date,
        task: task,
        toolOrProject: toolOrProject,
        ticketId: ticketId,
        hoursSpent: hoursSpent
      };

      console.log('newTask : ', newTask);

      dispatch(CreateTask(newTask));
      closePopup();
    }
  };

  // Function to format the date string
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

  const handleEdit = (taskId) => {
    isEditChange(true);
    titleChange("Update Daily Status");
    btnTitleChange("Update");
    setOpen(true);
    dispatch(GetTaskById(taskId));
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
    closePopup();
  };

  return (
    <div>
      <Paper sx={{ margin: "1%", padding: "1%" }}>
        <div style={{ margin: "1%" }}>
          <Button onClick={addNewTaskDialog} variant="contained" color="primary">
            Add New
          </Button>
        </div>
        <div style={{ margin: "1%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "midnightblue", color: "white" }}>
                  <TableCell style={{ color: "white", textAlign: "center" }}>Id</TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>EmployeeId</TableCell>
                  <TableCell style={{ color: "white" }}>Email</TableCell>
                  <TableCell style={{ color: "white" }}>Department</TableCell>
                  <TableCell style={{ color: "white" }}>Date</TableCell>
                  <TableCell style={{ color: "white" }}>Task</TableCell>
                  <TableCell style={{ color: "white" }}>Tool/Project</TableCell>
                  <TableCell style={{ color: "white" }}>TicketId</TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>HoursSpent</TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.taskState.taskList &&
                  props.taskState.taskList
                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((row, i) => {
                      return (
                        <TableRow key={row.id}>
                          <TableCell style={{ textAlign: "center" }}>{row.id}</TableCell>
                          <TableCell style={{ textAlign: "center" }}>{row.employeeId}</TableCell>
                          <TableCell>{row.employeeEmail}</TableCell>
                          <TableCell>{row.department}</TableCell>
                          <TableCell>{formatDate(row.date)}</TableCell>
                          <TableCell>{row.task}</TableCell>
                          <TableCell>{row.toolOrProject}</TableCell>
                          <TableCell>{row.ticketId}</TableCell>
                          <TableCell style={{ textAlign: "center" }}>{row.hoursSpent}</TableCell>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <IconButton aria-label="edit" style={{ color: '#4d94ff' }} size="small" onClick={() => handleEdit(row.id)}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton aria-label="delete" style={{ color: '#ff3333' }} size="small" onClick={() => handleDelete(row.id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      )
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            rowsPerPage={rowperpage}
            page={page}
            count={props.taskState.taskList.length}
            component={'div'}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowPerPageChange}>
          </TablePagination>
        </div>
      </Paper>
      {/* Create Dialog */}
      <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          <span>{title}</span>
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
            {btnTitle}
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

const mapStateToProps = (state) => {
  return {
    taskState: state.task
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTask: () => dispatch(GetAllTasks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTasksTable);
