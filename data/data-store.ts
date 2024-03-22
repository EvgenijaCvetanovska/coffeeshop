import CoffeeType from "../models/CoffeeType"
import SyrupType from "../models/SyrupType";

type DataStore = {
    coffeeTypes: Array<CoffeeType>
}

const store: DataStore = {
    coffeeTypes: [
        new CoffeeType("espresso", "Espresso", 1, 0, 1, false, SyrupType.None, "../assets/espresso.png"),
        new CoffeeType("americano", "Americano", 1, 0, 0, false, SyrupType.None, "../assets/americano.png"),
        new CoffeeType("macchiato", "Macchiato", 1, 1, 0, false, SyrupType.None, "../assets/macchiato.png"),
        new CoffeeType("latte", "Latte", 1, 2, 1, true, SyrupType.None, "../assets/latte.png"),
        new CoffeeType("cappuccino", "Cappuccino", 1, 2, 1, true, SyrupType.None, "../assets/cappuccino.png"),
        new CoffeeType("irishCoffee", "Irish Coffee", 1, 2, 1, false, SyrupType.Caramel, "../assets/irish.png"),
    ]
}

export default store;