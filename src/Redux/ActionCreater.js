import axios from "axios";
import { AddRequest, getAllRequestFail, getAllRequestSuccess, getTaskByIdSuccess, makeRequest, UpdateRequest, DeleteRequest } from "./Action";
import { toast } from "react-toastify";

export const GetAllTasks = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get('http://localhost:8000/tasks')
            .then(res => {
                const _list = res.data; // Accessing the data array
                dispatch(getAllRequestSuccess(_list));
            })
            .catch(err => {
                dispatch(getAllRequestFail(err.message));
            });
    }
}

export const GetTaskById = (taskId) => {
    return (dispatch) => {
        axios.get(`http://localhost:8000/tasks?id=${taskId}`)
            .then(res => {
                const taskData = res.data[0];
                dispatch(getTaskByIdSuccess(taskData));
            })
            .catch(err => {
                toast.error("Failed to fetch the data : " + err.message);
            });
    };
};

export const CreateTask = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:8000/tasks', data)
            .then((res) => {
                dispatch(AddRequest(data));
                toast.dismiss();
                toast.success("Task Created Successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(err => {
                toast.error("Failed to Create Task due to : " + err.message);
            })
    }
}

export const UpdateTask = (data) => {
    return (dispatch) => {
        axios.post(`http://localhost:8000/tasks?id=${data.id}`, data)
            .then((res) => {
                dispatch(UpdateRequest(data));
                toast.dismiss();
                toast.success("Task Updated Successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(err => {
                toast.error("Failed to Update Task due to : " + err.message);
            })
    }
}

export const DeleteTask = (taskId) => {
    return (dispatch) => {
        axios.delete(`http://localhost:8000/tasks/${taskId}`)
            .then((res) => {
                dispatch(DeleteRequest(taskId));
                toast.dismiss();
                toast.success("Task Deleted Successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(err => {
                toast.error("Failed to Delete Task due to : " + err.message);
            })
    }
}
