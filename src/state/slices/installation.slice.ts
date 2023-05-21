import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Installation, Installations, ResourceAction } from './types';
import NP from 'number-precision';

const initialState: Installations = {};
 
export const installationSlice = createSlice({
    name: 'installation',
    initialState,
    reducers: {
        updateResource: (state, action: PayloadAction<ResourceAction>) => {
            const { installationId, resource, value } = action.payload;
            state[installationId].resources[resource] = NP.plus(state[installationId].resources[resource], value);
            return state;
        },
        installationAdd: (state, action: PayloadAction<Installation>) => {
            const {payload} = action;
            state[payload.id] = payload;
            return state;
        }
    },
});
