import RandSeed from 'rand-seed';

export const randomInteger = (rand: RandSeed, min: number, max: number): number => {
    return Math.floor(rand.next() * (max - min + 1)) + min;
};

export const randomFloat = (rand: RandSeed, min:number, max: number, decimals = 2) => {
    const str = (rand.next() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }