import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Galaxy } from '../../utils/starSystem.types';

const initialState: Galaxy = {
    stars: [],
}

export const galaxySlice= createSlice({
    name: 'galaxy',
    initialState,
    reducers: {
        replace: (store, action: PayloadAction<Galaxy>) => {
            return action.payload;
        }
    }
});
