import SyrupType from "./SyrupType";

interface ICoffeeType {
    id: string,
    name: string,
    shotsOfCoffee: number,
    shotsOfMilk: number,
    packsOfSugar: number,
    image?: string | null,
    hasFoamMilk?: boolean,
    syrupType?: SyrupType,

    clone: () => ICoffeeType
}

export default ICoffeeType;