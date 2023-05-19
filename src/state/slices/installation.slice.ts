import { Draft, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INSTALLATION_TYPE, Installation, Installations, ResourceAction } from './types';
import { initInstallationResources } from './typesUtils';

const initialState: Installations = {
    i1 : {
        id: 'i1',
        resources: initInstallationResources(),
        type: INSTALLATION_TYPE.STATION,
        generators: [],
    }
}
 
export const installationSlice = createSlice({
    name: 'installation',
    initialState,
    reducers: {
        updateResource: (state, action: PayloadAction<ResourceAction>) => {
            const { installationId, resource, value } = action.payload;
            state[installationId].resources[resource] = + value;
            return state;
        },
        installationAdd: (state, action: PayloadAction<Installation>) => {
            const {payload} = action;
            state[payload.id] = payload;
            return state;
        }
    },
});
