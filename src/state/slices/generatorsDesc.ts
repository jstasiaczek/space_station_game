import { GENERATOR_TYPE, Generator, RESOURCES } from './types';

export interface GeneratorDescLevel {
    income: number;
    lvl: number;
    cost: { [key : string]: number };
}

export interface GeneratorDesc {
    type: GENERATOR_TYPE;
    name: string;
    maxLvl: number;
    lvls : GeneratorDescLevel[];
}

export const SOLAR_PANEL_DESC: GeneratorDesc = {
    type: GENERATOR_TYPE.SOLAR_PANELS,
    name: 'Solar Panels',
    maxLvl: 2,
    lvls: [
        {
            income: 1,
            cost: {},
            lvl: 1
        },
        {
            income: 5,
            cost: {
                'METALLOIDS': 100,
            },
            lvl: 2
        }
    ]
};

export const HYDROGEN_COLLECTOR_DESC: GeneratorDesc = {
    type: GENERATOR_TYPE.HYDROGEN_COLLECTOR,
    name: 'Hydroge collector',
    maxLvl: 2,
    lvls: [
        {
            income: 0.1,
            cost: {},
            lvl: 1
        },
        {
            income: 1,
            cost: {
                'METALLOIDS': 100,
            },
            lvl: 2
        }
    ]
};

export const getSolarGeneratorByLvl = (lvlId: number): Generator => {
    const lvl = SOLAR_PANEL_DESC.lvls.find(lvl => lvl.lvl === lvlId) || SOLAR_PANEL_DESC.lvls[0];
    return {
        income : lvl.income,
        incomeType: RESOURCES.POWER,
        level: lvl.lvl,
        name: SOLAR_PANEL_DESC.name,
        type: SOLAR_PANEL_DESC.type,
    }
}

export const getHydrogenGeneratorByLvl = (lvlId: number): Generator => {
    const lvl = HYDROGEN_COLLECTOR_DESC.lvls.find(lvl => lvl.lvl === lvlId) || HYDROGEN_COLLECTOR_DESC.lvls[0];
    return {
        income : lvl.income,
        incomeType: RESOURCES.HYDROGEN,
        level: lvl.lvl,
        name: HYDROGEN_COLLECTOR_DESC.name,
        type: HYDROGEN_COLLECTOR_DESC.type,
    }
}
