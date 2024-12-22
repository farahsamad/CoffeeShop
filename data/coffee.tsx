export interface ProductsType {
  name: string;
  id: number;
  image: string;
}

interface CoffeeType {
  name: string;
  products: ProductsType[];
}

interface CoffeeProducts {
  hot_coffees: CoffeeType;
  cold_coffees: CoffeeType;
  iced_tea: CoffeeType;
  hot_tea: CoffeeType;
  hot_chocolate: CoffeeType;
  juice: CoffeeType;
  smoothie: CoffeeType;
  milk: CoffeeType;
  water_and_sparkling: CoffeeType;
}

export class Coffee {
  public coffeeProducts: CoffeeProducts = {
    hot_coffees: {
      name: "Hot coffees",
      products: [
        { name: "Cappuccino", id: 1, image: "cappuccino.png" },
        { name: "Caramel Frappe", id: 2, image: "caramel-frappe.png" },
        { name: "Espresso", id: 4, image: "espresso.jpg" },
        { name: "Flat White", id: 5, image: "flat-white.jpeg" },
        { name: "Hot Coffee", id: 6, image: "hot-coffee.jpg" },
        { name: "Latte Coffee", id: 7, image: "latte-coffee.png" },
        { name: "Machiato", id: 8, image: "Machiato.jpg" },
        { name: "Mocha", id: 9, image: "mocha-coffee.jpeg" },
        { name: "Turkish Coffee", id: 10, image: "turkish-coffee.jpg" },
        {
          name: "White Chocolate Mocha",
          id: 11,
          image: "white-chocolate-mochas.png",
        },
      ],
    },
    cold_coffees: {
      name: "Cold Coffees",
      products: [
        { name: "Iced Americano", id: 12, image: "iced-americano.jpg" },
        {
          name: "Iced Chocolate Frappe",
          id: 13,
          image: "iced-chocolate-frappe.png",
        },
        { name: "Iced coffee", id: 14, image: "iced-coffee.jpeg" },
        { name: "Iced Flat White", id: 15, image: "iced-flat-white.png" },
        { name: "Iced Latte", id: 16, image: "iced-latte.jpg" },
        { name: "Iced Machiato", id: 17, image: "iced-machiato.png" },
        { name: "Iced Mochas", id: 18, image: "iced-mochas.jpeg" },
        {
          name: "Iced Shaken Espresso",
          id: 19,
          image: "iced-shaken-espresso.jpeg",
        },
      ],
    },
    iced_tea: {
      name: "Iced Tea",
      products: [
        { name: "Iced Chai Tea", id: 20, image: "iced-chai-tea.jpg" },
        { name: "Iced Lemon Tea", id: 21, image: "iced-lemon-tea.png" },
        { name: "Iced Matcha", id: 22, image: "iced-matcha.jpg" },
        { name: "Iced Peach Tea", id: 23, image: "iced-peach-tea.png" },
      ],
    },
    hot_tea: {
      name: "Hot Tea",
      products: [
        { name: "Chai Tea", id: 24, image: "chai-tea.jpg" },
        { name: "Green Tea", id: 25, image: "green-tea.png" },
        { name: "milk Tea", id: 26, image: "tea-milk.jpg" },
      ],
    },
    hot_chocolate: {
      name: "Hot Chocolate",
      products: [
        { name: "Hot Chocolate", id: 27, image: "hot-chocolate.jpg" },
        {
          name: "White Hot Chocolate",
          id: 28,
          image: "white-hot-chocolate.png",
        },
      ],
    },
    juice: {
      name: "Juice",
      products: [
        { name: "Apple Juice", id: 29, image: "apple-juice.png" },
        { name: "Carrot Juice", id: 30, image: "carrot-juice.jpeg" },
        { name: "Mango Juice", id: 31, image: "mango-juice.png" },
        { name: "Orange Juice", id: 32, image: "orange-juice.png" },
        { name: "Pomegranate Juice", id: 33, image: "pomegranate-juice.jpg" },
        { name: "Raspberry Juice", id: 34, image: "raspberry-juice.png" },
        { name: "Strawberry Juice", id: 35, image: "strawberry-juice.png" },
      ],
    },
    smoothie: {
      name: "Smoothie",
      products: [
        { name: "Apple Smoothie", id: 42, image: "apple-smoothie.png" },
        { name: "Mango Smoothie", id: 43, image: "mango-smoothie.png" },
        { name: "Orange Smoothie", id: 44, image: "orange-smoothie.png" },
        {
          name: "Pomegranate Smoothie",
          id: 45,
          image: "pomegranate-smoothie.jpg",
        },
        { name: "Raspberry Smoothie", id: 46, image: "raspberry-smoothie.png" },
        {
          name: "Strawberry Smoothie",
          id: 47,
          image: "cup-strawberry-smoothie.png",
        },
        {
          name: "Cranberry Smoothie",
          id: 48,
          image: "cranberry-smoothie.png",
        },
      ],
    },
    milk: {
      name: "Milk",
      products: [
        { name: "Cold Milk", id: 36, image: "cold-milk.png" },
        { name: "Steamed Milk", id: 37, image: "steamed-milk.jpg" },
        { name: "Vanilla Cream Milk", id: 38, image: "vanilla-cream-milk.png" },
      ],
    },
    water_and_sparkling: {
      name: "Water and Sparkling",
      products: [
        { name: "Cup Of Water", id: 39, image: "water.png" },
        { name: "Sparkling Water", id: 40, image: "sparkling-water.png" },
        { name: "Water bottle", id: 41, image: "water-bottle.jpg" },
      ],
    },
  };

  //   Cappuccino = 1;
  //   Caramel_Frappe = 2;
  //   Chocolate_Frappe = 3;
  //   Espresso = 4;
  //   Flat_White = 5;
  //   Hot_Coffee = 6;
  //   Latte_Coffee = 7;
  //   Machiato = 8;
  //   Mocha = 9;
  //   Turkish_Coffee = 10;
  //   White_Chocolate_Mocha = 11;
  //   Iced_Americano = 12;
  //   Iced_Chocolate_Frappe_Coffee = 13;
  //   Iced_coffee = 14;
  //   Iced_Flat_White = 15;
  //   Iced_Latte = 16;
  //   Iced_Machiato = 17;
  //   Iced_Mochas = 18;
  //   Iced_Shaken_Espresso = 19;
  //   Iced_Chai_Tea = 20;
  //   Iced_Lemon_Tea = 21;
  //   Iced_Matcha = 22;
  //   Iced_Peach_Tea = 23;
  //   Chai_Tea = 24;
  //   Green_Tea = 25;
  //   milk_Tea = 26;
  //   Hot_Chocolate = 27;
  //   White_Hot_Chocolate = 28;
  //   Apple_Juice = 29;
  //   Carrot_Juice = 30;
  //   Mango_Juice = 31;
  //   Orange_Juice = 32;
  //   Pomegranate_Juice = 33;
  //   Raspberry_Juice = 34;
  //   Strawberry_Juice = 35;
  //   Cold_Milk = 36;
  //   Steamed_Milk = 37;
  //   Vanilla_Cream_Milk = 38;
  //   Cup_Of_Water = 39;
  //   Sparkling_Water = 40;
  //   Water_bottle = 41;
}
