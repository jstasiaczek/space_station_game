import { InstallationResurces, RESOURCES } from "./types";

export const initInstallationResources = () => {
    const initialState: InstallationResurces = {};
    Object.values(RESOURCES).forEach(resource => initialState[resource] = 0);
    return initialState;
}