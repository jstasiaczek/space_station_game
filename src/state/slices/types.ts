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

// ******************************************************
// ACTIONS
// ******************************************************

export interface ResourceAction {
    installationId: string;
    resource: RESOURCES,
    value: number,
}