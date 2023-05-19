import  RandSeed from 'rand-seed';
import { randomInteger, randomFloat } from './random';
import {
    PLANET_TEMPERATURE,
    PLANET_TYPE,
    SpaceObject,
    STAR_TYPE,
    Star,
    StarDefinition,
    starsTypes,
    SolarSystem,
    Satellite,
} from './starSystem.types';


export const getStarDefByType = (type: STAR_TYPE): StarDefinition => starsTypes.find(def => def.type === type) || starsTypes[0];

/**
 * Create star by mass
 * @param {number} mass Solar mass multiplication
 * @returns {any}
 */
export const createStarByMass = (mass: number, angle: number = 90) => {
    const starType = starsTypes.find(starDef => starDef.maxMass >= mass) || starsTypes[starsTypes.length - 1];
    const star: Star = {
        type: starType.type,
        mass,
        angle,
        name: `S-${starType.type}${(mass*100)+angle}`,
    };
    return star;
}

export const createObjectByIdx = (rand: RandSeed, idx: number, maxIdx: number, starName: string) => {
    const distance = idx + 1;
    const isGasGiant =  rand.next() <= distance * 0.1;
    const mass =  isGasGiant ? randomFloat(rand, 10, 32) : Math.abs(randomFloat(rand, 0.2, 4) - (1 - (distance * 0.2)));
    const object: SpaceObject = {
        type: PLANET_TYPE.GAS_GIANT,
        temperature: PLANET_TEMPERATURE.HOT,
        name: `${starName}-0${(distance)}`,
        sattelites: [],
        startAngle: randomInteger(rand,0,359),
        ratationAngle: randomInteger(rand, 0, 359),
        mass,
        sprite: '',
    }
    object.temperature = idx < Math.ceil(maxIdx / 2) || isGasGiant ? PLANET_TEMPERATURE.HOT : PLANET_TEMPERATURE.COLD;
    object.temperature = !isGasGiant && idx === Math.ceil(maxIdx / 2) ? PLANET_TEMPERATURE.OPTIMAL : object.temperature;
    if (!isGasGiant && mass < 1) {
        object.type = PLANET_TYPE.BARREN;
    } else if (!isGasGiant && mass >= 1) {
        object.type = PLANET_TYPE.WET;
    }
    object.sattelites = createSattelites(rand, mass, object.name);
    object.sprite = `planet/${object.type}_${randomInteger(rand, 1, 4)}.png`;
    return object;
}

export const createSattelites = (rand: RandSeed, mass: number, planetName: string): Satellite[] => {
    const count = randomInteger(rand, mass > 4 ? 1 : 0, mass > 4 ? 4 : 2);
    if (count === 0) {
        return []
    }
    const sattelites: Satellite[] = [];
    for (let i = 0; i < count; i++) {
        sattelites.push({
            name: `${planetName}-0${i+1}`
        })
    }
    return sattelites;
}

export const generateSolarSystem = (rand: RandSeed): SolarSystem => {
    const starMass = randomInteger(rand, 46, 1700) / 100;
    const angle = randomInteger(rand, 1, 360);
    const system: SolarSystem = {
        star: createStarByMass(starMass, angle),
        objectsCount: 0,
        objects: []
    };

    const starDef = getStarDefByType(system.star.type);
    system.objectsCount = randomInteger(rand, starDef.minObjects, starDef.maxObjects);
    for (let i = 0; i < system.objectsCount; i++) {
        system.objects[i] = createObjectByIdx(rand, i, system.objectsCount, system.star.name);
    }

    return system;
}