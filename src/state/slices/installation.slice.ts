import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { Installation, Installations, ResourceAction } from './types'
import NP from 'number-precision'

const initialState: Installations = {}

export const installationSlice = createSlice({
    name: 'installation',
    initialState,
    reducers: {
        updateResource: (state, action: PayloadAction<ResourceAction>) => {
            const { installationId, resource, value } = action.payload
            const { current, max } = state[installationId].resources[resource]
            const updatedCurrent = NP.plus(current, value)
            state[installationId].resources[resource].current = updatedCurrent > max ? max : updatedCurrent
            return state
        },
        installationAdd: (state, action: PayloadAction<Installation>) => {
            const { payload } = action
            state[payload.id] = payload
            return state
        }
    }
})
