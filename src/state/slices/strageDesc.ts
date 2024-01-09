import { GENERATOR_INCOME_TYPE } from './types'

// POWER = 'POWER',
// METAL = 'METAL',
// METALLOID = 'METALLOID',
// HYDROGEN = 'HYDROGEN',

export interface StorageLvlDesc {
    max: number
    lvl: number
    cost: Record<string, number>
}

export interface StorageDesc {
    type: GENERATOR_INCOME_TYPE
    name: string
    maxLvl: number
    unit: string
    lvls: StorageLvlDesc[]
}

export const POWER_STORAGE_DESC: StorageDesc = {
    name: 'Power',
    maxLvl: 2,
    type: GENERATOR_INCOME_TYPE.POWER,
    unit: 'kW',
    lvls: [
        {
            cost: {},
            lvl: 1,
            max: 10
        },
        {
            cost: {
                METALLOIDS: 100
            },
            lvl: 2,
            max: 50
        }
    ]
}

export const METAL_STORAGE_DESC: StorageDesc = {
    name: 'Metal',
    maxLvl: 2,
    type: GENERATOR_INCOME_TYPE.METAL,
    unit: 'kg',
    lvls: [
        {
            cost: {},
            lvl: 1,
            max: 100
        },
        {
            cost: {
                METALLOIDS: 100
            },
            lvl: 2,
            max: 500
        }
    ]
}

export const HYDROGEN_STORAGE_DESC: StorageDesc = {
    name: 'Hydrogen',
    maxLvl: 2,
    type: GENERATOR_INCOME_TYPE.HYDROGEN,
    unit: 'l',
    lvls: [
        {
            cost: {},
            lvl: 1,
            max: 10
        },
        {
            cost: {
                METALLOIDS: 100
            },
            lvl: 2,
            max: 20
        }
    ]
}

export const METALLOID_STORAGE_DESC: StorageDesc = {
    name: 'Metalloid',
    maxLvl: 2,
    type: GENERATOR_INCOME_TYPE.METALLOID,
    unit: 'kg',
    lvls: [
        {
            cost: {},
            lvl: 1,
            max: 100
        },
        {
            cost: {
                METALLOIDS: 100
            },
            lvl: 2,
            max: 500
        }
    ]
}

const STORAGE_TO_DESC: Record<string, StorageDesc> = {}
STORAGE_TO_DESC[GENERATOR_INCOME_TYPE.HYDROGEN] = HYDROGEN_STORAGE_DESC
STORAGE_TO_DESC[GENERATOR_INCOME_TYPE.METAL] = METAL_STORAGE_DESC
STORAGE_TO_DESC[GENERATOR_INCOME_TYPE.METALLOID] = METALLOID_STORAGE_DESC
STORAGE_TO_DESC[GENERATOR_INCOME_TYPE.POWER] = POWER_STORAGE_DESC

export {
    STORAGE_TO_DESC
}
