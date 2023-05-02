import { types } from "../types/types";

export const updateIsDarkTheme = ( isDark ) => ({
    type: types.layout.updateIsDarkTheme,
    payload: isDark
});

export const updateTheme = ( theme ) => ({
    type: types.layout.updateTheme,
    payload: theme
});

export const showGlobalLoader = () => ({
    type: types.layout.showGlobalLoading
});

export const hideGlobalLoader = () => ({
    type: types.layout.hideGlobalLoading
});

export const incPendingRequest = () => ({
    type: types.layout.incPendingRequest
});

export const decPendingRequest = () => ({
    type: types.layout.decPendingRequest
});

export const resetPendingRequests = () => ({
    type: types.layout.resetPendingRequests
});