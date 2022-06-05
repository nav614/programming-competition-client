import { useCallback, useContext, useEffect, useReducer } from "react";
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { message } from "antd";

const TASKS_LOADED = 'TASKS_LOADED';
const TASKS_SELECTED = 'TASKS_SELECTED';
const TASK_DETAILS_LOADED = 'TASK_DETAILS_LOADED';
const TASK_DETAILS_SELECTED = 'TASK_DETAILS_SELECTED';
const TASK_IS_COMPILED = 'TASK_IS_COMPILED';

export const useSolve = (form) => {
    const { request, loading } = useHttp();
    const { userId } = useContext(AuthContext);
    const initialState = {
        tasks: [],
        taskDetails: [],
        taskItemId: '',
        description: '',
        optionsTasks: [],
        optionsLanguage: [],
        taskDetailsId: '',
        expected: '',
        isCompleted: false,
        input: '',
        output: '',
        statusCode: 0
    };

    function reducer(state, action) {
        switch (action.type) {
            case TASKS_LOADED:
                return {
                    ...state,
                    tasks: action.payload,
                    optionsTasks: action.payload.map(({ taskItemId, name }) => { return { value: taskItemId, label: name } })
                };
            case TASKS_SELECTED:
                return {
                    ...state,
                    taskDetailsId: '',
                    statusCode: 0,
                    taskItemId: action.payload,
                    description: state.tasks.find(({ taskItemId }) => taskItemId === action.payload)?.description
                };
            case TASK_DETAILS_LOADED:
                return {
                    ...state,
                    taskDetails: action.payload,
                    optionsLanguage: action.payload.map(({ language }) => { return { value: language, label: language } })
                }
            case TASK_DETAILS_SELECTED:
                return {
                    ...state,
                    taskDetailsId: action.payload.taskDetailsId,
                    expected: action.payload.expected,
                    input: action.payload.input,
                    statusCode: 0

                }
            case TASK_IS_COMPILED:
                return {
                    ...state,
                    isCompleted: action.payload.isCompleted,
                    output: action.payload.output,
                    statusCode: action.payload.statusCode
                }
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await request('/api/Tasks', 'GET');
            dispatch({ type: TASKS_LOADED, payload: response });
        } catch (e) { }
    }, [request]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTaskDetails = useCallback(async () => {
        try {
            const response = await request(`/api/TaskDetails/${state.taskItemId}`, 'GET');
            dispatch({ type: TASK_DETAILS_LOADED, payload: response });
        } catch (e) { }
    }, [request, state.taskItemId]);

    useEffect(() => {
        if (state.taskItemId) {
            fetchTaskDetails();
        }
    }, [fetchTaskDetails, state.taskItemId]);

    const hadleOnSelectTask = (taskItemId) => {
        dispatch({ type: TASKS_SELECTED, payload: taskItemId });
    }

    const handleOnSelectLanguage = (lang) => {
        const taskDetails = state.taskDetails.find(({ language }) => language === lang);
        dispatch({ type: TASK_DETAILS_SELECTED, payload: { taskDetailsId: taskDetails.taskDetailsId, expected: taskDetails.output, input: taskDetails.input } });
        form.setFieldsValue({ script: taskDetails.userScript });
    }

    const handleRunOrSubmitScript = async (isSumbit = false) => {
        try {
            await form.validateFields();
            const taskToCompile = {
                userId,
                taskDetailsId: state.taskDetailsId,
                script: form.getFieldValue('script'),
                language: form.getFieldValue('language'),
                versionIndex: '0',
                isSumbit
            }
            const { isCompleted, output, statusCode } = await request('/api/Compile/run', 'POST', taskToCompile);
            dispatch({ type: TASK_IS_COMPILED, payload: { isCompleted, output, statusCode } });
            form.setFieldsValue({ output });
            if (isSumbit) {
                message.success('Solution submitted.')
            }
        } catch (error) { }
    }

    const handleRunScript = () => handleRunOrSubmitScript(false);
    const handleSubmitScript = () => handleRunOrSubmitScript(true);

    return { loading, handleRunScript, hadleOnSelectTask, state, handleOnSelectLanguage, initialState, handleSubmitScript }
}