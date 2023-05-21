import { GENERATOR_TYPE, RESOURCES } from './types';

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
            income: 10,
            cost: {},
            lvl: 1
        },
        {
            income: 20,
            cost: {
                'METALLOIDS': 100,
            },
            lvl: 2
        }
    ]
};
