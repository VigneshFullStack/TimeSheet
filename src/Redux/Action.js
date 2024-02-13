import { MAKE_REQ, OPEN_POPUP, REQ_ADD_SUCCESS, REQ_DELETE_SUCCESS, REQ_GETALL_FAIL, REQ_GETALL_SUCCESS, REQ_GETTASKBYID_SUCCESS, REQ_UPDATE_SUCCESS } from "./ActionType"

export const makeRequest = () => {
    return {
        type: MAKE_REQ
    }
}

export const getAllRequestSuccess = (data) => {
    return {
        type: REQ_GETALL_SUCCESS,
        payload: data
    }
}

export const getAllRequestFail = (err) => {
    return {
        type: REQ_GETALL_FAIL,
        payload: err
    }
}

export const OpenPopup = () => {
    return {
        type: OPEN_POPUP
    }
}

export const AddRequest = (data) => {
    return {
        type: REQ_ADD_SUCCESS,
        payload: data
    }
}

export const getTaskByIdSuccess = (data) => {
    return {
        type: REQ_GETTASKBYID_SUCCESS,
        payload: data
    }
}

export const UpdateRequest = (data) => {
    return {
        type: REQ_UPDATE_SUCCESS,
        payload: data
    }
}

export const DeleteRequest = (taskId) => {
    return {
        type: REQ_DELETE_SUCCESS,
        payload: taskId
    }
}
