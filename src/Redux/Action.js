import { MAKE_REQ, OPEN_POPUP, REQ_ADD_SUCCESS, REQ_GETALL_FAIL, REQ_GETALL_SUCCESS } from "./ActionType"

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
