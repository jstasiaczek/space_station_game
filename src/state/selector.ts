import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { StoreData } from './store/configureStore';

export const getInstallations = (store: ToolkitStore<StoreData>) => store.getState().installations;

export const getConfig = (store: ToolkitStore<StoreData>) => store.getState().config;
