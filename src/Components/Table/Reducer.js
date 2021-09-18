export const Actions = {
    SET_DATA: "SET_DATA",
    SET_LOADING: "SET_LOADING",
    SET_CURRENCY: "SET_CURRENCY",
    SET_PAGE: "SET_PAGE",
    SET_PER_PAGE: "SET_PER_PAGE",
    SET_ERROR: "SET_ERROR"
}
const Reducer = function (state, action) {
state = state;
switch (action.type) {
    case Actions.SET_DATA: {
        return { 
            ...state,
            data: action.payload
        };
    }
    case Actions.SET_LOADING: {
        return {
            ...state,
            loading: action.payload,
        };
    }
    case Actions.SET_CURRENCY: {
        return {
            ...state,
            currency: action.payload,
        };
    }
    case Actions.SET_PAGE: {
        return {
            ...state,
            page: action.payload,
        };
    }
    case Actions.SET_PER_PAGE: {
        return {
            ...state,
            perPage: action.payload,
        };
    }
    case Actions.SET_ERROR: {
        return {
            ...state,
            error: action.payload,
        };
    }
    default: {
    return state;
    }
}
};
export default Reducer;
  