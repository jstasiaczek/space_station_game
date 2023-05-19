import { Draft, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameConfig } from './types';

const initialState: GameConfig = {
    seed: '',
}

export const configSlice= createSlice({
    name: 'config',
    initialState,
    reducers: {
        updateSeed: (store, action: PayloadAction<string>) => {
            return {
                ...store,
                seed: action.payload,
            }
        }
    }
})