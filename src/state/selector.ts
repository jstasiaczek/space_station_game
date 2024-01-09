import { type ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { type StoreData } from './store/configureStore'

export const getInstallations = (store: ToolkitStore<StoreData>) => store.getState().installations

export const getConfig = (store: ToolkitStore<StoreData>) => store.getState().config

export const getGalaxy = (store: ToolkitStore<StoreData>) => store.getState().galaxy
