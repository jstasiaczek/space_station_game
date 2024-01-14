import { STORAGE_TO_DESC } from './strageDesc'
import { InstallationResurces, RESOURCES } from './types'

export const initInstallationResources = () => {
    const initialState: InstallationResurces = {}
    Object.values(RESOURCES).forEach(resource => {
        const desc = STORAGE_TO_DESC[resource]
        const lvl = desc.lvls[0]
        initialState[resource] = {
            current: 0,
            lvl: lvl.lvl,
            max: lvl.max,
            type: desc.type,
            unit: desc.unit
        }
    })
    return initialState
}
