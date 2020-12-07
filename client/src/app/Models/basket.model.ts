export interface IBasket {
  id: string;
  items: IBasketItem[];
}

export interface IBasketItem {
  id: number;
  produtName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
}

export class Basket implements IBasket {
  id = Math.floor(Math.random() * 100 + 1).toString();
  items!: IBasketItem[];
}
