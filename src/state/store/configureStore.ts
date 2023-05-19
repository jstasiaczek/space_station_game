import { configureStore } from '@reduxjs/toolkit'
import { installationSlice } from '../slices/installation.slice';
import { GameConfig, Installations } from '../slices/types';
import { configSlice } from '../slices/config.slice';

export interface StoreData {
	installations: Installations;
	config: GameConfig;
}

export const setupStore = () => {
	return configureStore<StoreData>({
		reducer: {
			installations: installationSlice.reducer,
			config: configSlice.reducer,
		}
	}
	)
}
