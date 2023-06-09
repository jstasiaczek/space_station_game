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

export interface Installation {
    id: string;
    resources: InstallationResurces;
    type: INSTALLATION_TYPE;
    generators: Generator[];
    location: string;
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
    currentScreen: string;
    selectedLocation?: string;
    selectedObject?: string;
    selectedInstallation?: string;

}

export enum GENERATOR_TYPE {
    SOLAR_PANELS = 'SOLAR_PANELS',
}

export interface Generator {
    incomeType: RESOURCES;
    type: GENERATOR_TYPE;
    income: number;
    level: number;
    name: string;
}

// ******************************************************
// ACTIONS
// ******************************************************

export interface ResourceAction {
    installationId: string;
    resource: RESOURCES,
    value: number,
}