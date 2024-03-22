import ICoffeeType from "./ICoffeeType";
import SyrupType from "./SyrupType";

class CoffeeType implements ICoffeeType {
    id: string;
    name: string;
    shotsOfCoffee: number;
    shotsOfMilk: number;
    packsOfSugar: number;
    hasFoamMilk?: boolean;
    syrupType?: SyrupType;
    image?: string | null;

    constructor(
        id?: string,
        name?: string,
        shotsOfCoffee?: number,
        shotsOfMilk?: number,
        packsOfSugar?: number,
        hasFoamMilk?: boolean,
        syrupType?: SyrupType,
        image?: string | null) {
        this.id = id ?? "";
        this.name = name ?? "";
        this.shotsOfCoffee = shotsOfCoffee ?? 0;
        this.shotsOfMilk = shotsOfMilk ?? 0;
        this.packsOfSugar = packsOfSugar ?? 0;
        this.hasFoamMilk = hasFoamMilk ?? false;
        this.syrupType = syrupType ?? SyrupType.None;
        this.image = image ?? null;
    }

    clone = () => {
        return new CoffeeType(
            this.id,
            this.name,
            this.shotsOfCoffee,
            this.shotsOfMilk,
            this.packsOfSugar,
            this.hasFoamMilk,
            this.syrupType,
            this.image);
    }
}

export default CoffeeType;