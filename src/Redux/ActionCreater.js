import axios from "axios";
import { AddRequest, getAllRequestFail, getAllRequestSuccess, makeRequest } from "./Action";
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
