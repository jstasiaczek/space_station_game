
export enum STAR_TYPE {
    O = 'O',
    B = 'B',
    A = 'A',
    F = 'F',
    G = 'G',
    K = 'K',
    M = 'M'
}

export enum PLANET_TYPE {
    BARREN = 'BARREN',
    WET = 'WET',
    GAS_GIANT = 'GAS_GIANT',
    ASTEROIDS = 'ASTEROIDS',
}

export enum PLANET_TEMPERATURE {
    HOT = 'HOT',
    OPTIMAL = 'OPTIMAL',
    COLD = 'COLD',
}

export interface Planet {
    type: PLANET_TYPE,
    temperature: PLANET_TEMPERATURE,
    name: string;
    mass: number;
}

export interface StarDefinition {
    type: STAR_TYPE;
    maxMass: number;
    color: string;
    maxObjects: number;
    minObjects: number;
}

export interface SpaceObject {
    type: PLANET_TYPE,
    temperature: PLANET_TEMPERATURE,
    name: string;
    mass: number;
    startAngle: number;
    ratationAngle: number;
    sattelites: Satellite[];
    sprite: string;
}

export interface Satellite {
    name: string;
}

export interface Star {
    mass: number;
    type: STAR_TYPE;
    angle?: number;
    name: string;
}

export interface SolarSystem {
    star: Star;
    objectsCount: number;
    objects: SpaceObject[]
}

export const starsTypes: StarDefinition[] = [
    {
        type: STAR_TYPE.M,
        maxMass: 0.45,
        color: 'red',
        maxObjects: 3,
        minObjects: 1,
    },
    {
        type: STAR_TYPE.K,
        maxMass: 0.8,
        color: 'orange',
        minObjects: 1,
        maxObjects: 4,
    },
    {
        type: STAR_TYPE.G,
        maxMass: 1.04,
        color: 'yellow',
        minObjects: 2,
        maxObjects: 6,
    },
    {
        type: STAR_TYPE.F,
        maxMass: 1.4,
        color: 'lighyellow',
        minObjects: 2,
        maxObjects: 4,
    },
    {
        type: STAR_TYPE.A,
        maxMass: 2.1,
        color: 'white',
        minObjects: 1,
        maxObjects: 5,
    },
    {
        type: STAR_TYPE.B,
        maxMass: 16,
        color: 'lightblue',
        minObjects: 2,
        maxObjects: 5,
    },
    {
        type: STAR_TYPE.O,
        maxMass: 32,
        color: 'blue',
        maxObjects: 3,
        minObjects: 2,
    }
];