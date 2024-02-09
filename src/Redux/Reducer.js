import { MAKE_REQ, REQ_ADD_SUCCESS, REQ_GETALL_FAIL, REQ_GETALL_SUCCESS } from "./ActionType";
import { v4 as uuidv4 } from 'uuid';

export const initialState = {
    isLoading: false,
    taskList: [],
    taskObj: {},
    errorMessage: ''
}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_REQ:
            return {
                ...state,
                isLoading: true
            }

        case REQ_GETALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                taskList: action.payload
            }

        case REQ_GETALL_FAIL:
            return {
                ...state,
                isLoading: false,
                taskList: [],
                errorMessage: action.payload
            }

        case REQ_ADD_SUCCESS:
            // const _inputData = { ...action.payload };
            // const _maxId = Math.max(...state.taskList.map(obj => obj.id));
            // _inputData.id = _maxId + 1;

            const _inputData = { ...action.payload };
            const newId = uuidv4(); // Generate a unique ID
            console.log('Generated ID:', newId);
            _inputData.id = newId;
            console.log('Input Data:', _inputData);
            return {
                ...state,
                taskList: [...state.taskList, _inputData]
            }

        default:
            return state;
    }
}