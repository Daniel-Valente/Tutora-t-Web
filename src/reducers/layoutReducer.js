import { types } from "../types/types";

const initialState = {
    version: process.env.REACT_APP_VERSION,
    theme: 'white',
    loading: false,
    pendingGlobalRequests: 0
}

export const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.layout.updateTheme:
            return {
                ...state,
                theme: action.payload
            };
        case types.layout.showGlobalLoading:
            return {
                ...state,
                loading: true
            };
        case types.layout.hideGlobalLoading:
            return state.pendingGlobalRequests === 0 ? {
                ...state,
                loading: false
            } : state;
        case types.layout.incPendingRequest:
            return {
                ...state,
                pendingGlobalRequests: 1
            };
        case types.layout.decPendingRequest:
            return {
                ...state,
                pendingGlobalRequests: Math.max(0, state.pendingGlobalRequests - 1)
            };
        case types.layout.resetPendingRequests:
            return {
                ...state,
                loading: false,
                pendingGlobalRequests: 0
            };
        default:
            return state;
    }
}