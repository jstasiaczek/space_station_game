// system -> object -> installation

export enum RESOURCES {
    POWER = 'POWER',
    METALS = 'METALS',
    METALLOIDS = 'METALLOIDS',
    HYDROGEN = 'HYDROGEN',
};

export interface InstallationResurces {
    [key : string]: number;
}

export enum INSTALLATION_TYPE {
    STATION = 'STATION',
    OUTPOST = 'OUTPOST',
}

export enum GENERATOR_INCOME_TYPE {
    POWER = 'POWER',
    METAL = 'METAL',
    METALLOID = 'METALLOID',
    HYDROGEN = 'HYDROGEN',
}

export interface Installations {
    [key: string]: Installation;
}

export interface Generator {

}

export interface Installation {
    id: string;
    resources: InstallationResurces;
    type: INSTALLATION_TYPE;
    generators: Generator[];
}

export interface Object {
    id: string;
    installations: string[];
}

export interface SolarSystems {
    [key: string]: Object[];
}

export interface GameConfig {
    seed: string;
}

export enum GENERATOR_TYPE {
    SOLAR_PANELS = 'SOLAR_PANELS'
}

export interface Generator {
    incomeType: RESOURCES,
    type: GENERATOR_TYPE,
    income: number,
    level: number,
}

// ******************************************************
// ACTIONS
// ******************************************************

export interface ResourceAction {
    installationId: string;
    resource: RESOURCES,
    value: number,
}