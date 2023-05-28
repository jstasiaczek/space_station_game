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
