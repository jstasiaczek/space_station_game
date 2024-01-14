import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { GameConfig } from './types'

const initialState: GameConfig = {
    seed: '',
    currentScreen: '',
    selectedLocation: '',
    selectedObject: '',
    selectedInstallation: ''
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        updateSeed: (store, action: PayloadAction<string>) => ({
            ...store,
            seed: action.payload
        }),
        updateScreen: (store, action: PayloadAction<string>) => ({
            ...store,
            currentScreen: action.payload
        }),
        updateSelectedLocation: (store, action: PayloadAction<string>) => ({
            ...store,
            selectedLocation: action.payload
        }),
        updateSelectedObject: (store, action: PayloadAction<string>) => ({
            ...store,
            selectedObject: action.payload
        }),
        updateSelectedInstallation: (store, action: PayloadAction<string | undefined>) => ({
            ...store,
            selectedInstallation: action.payload
        }),
        update: (store, action: PayloadAction<GameConfig>) => ({
            ...store,
            ...action.payload
        })
    }
})
