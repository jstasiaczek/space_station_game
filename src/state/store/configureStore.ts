import { configureStore } from '@reduxjs/toolkit'
import { installationSlice } from '../slices/installation.slice'
import { type GameConfig, type Installations } from '../slices/types'
import { configSlice } from '../slices/config.slice'
import { galaxySlice } from '../slices/galaxy.slice'
import { type Galaxy } from '@rApp/utils/starSystem.types'

export interface StoreData {
    installations: Installations
    config: GameConfig
    galaxy: Galaxy
}

export const setupStore = () => {
    return configureStore<StoreData>({
        reducer: {
            installations: installationSlice.reducer,
            config: configSlice.reducer,
            galaxy: galaxySlice.reducer
        }
    })
}
