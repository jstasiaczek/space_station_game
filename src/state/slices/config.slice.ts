import { Draft, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GameConfig } from './types';

const initialState: GameConfig = {
    seed: '',
    currentScreen: '',
    selectedLocation: '',
    selectedObject: '',
}

export const configSlice= createSlice({
    name: 'config',
    initialState,
    reducers: {
        updateSeed: (store, action: PayloadAction<string>) => ({
            ...store,
            seed: action.payload,
        }),
        updateScreen: (store, action: PayloadAction<string>) => ({
            ...store,
            seed: action.payload,
        }),
        updateSelectedScreen: (store, action: PayloadAction<string>) => ({
            ...store,
            seed: action.payload,
        }),
        updateSelectedObject: (store, action: PayloadAction<string>) => ({
            ...store,
            seed: action.payload,
        }),
        update: (store, action: PayloadAction<GameConfig>) => ({
            ...action.payload,
        }),
    }
});
