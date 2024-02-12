import axios from "axios";
import { AddRequest, getAllRequestFail, getAllRequestSuccess, getTaskByIdSuccess, makeRequest } from "./Action";
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
                const taskData = res.data;
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
            .then(res => {
                dispatch(AddRequest(data));
                toast.success("Task Created Successfully!")
            }).catch(err => {
                toast.error("Failed to Create Task due to : " + err.message)
            })
    }
}


