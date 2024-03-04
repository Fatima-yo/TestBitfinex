"use strict";

const { v4: uuidv4 } = require("uuid");
const { sortOrders } = require("./helpers/index");
const { TYPE_ORDER } = require("../../constants");

class OrderBook {
  orderBooks;

  constructor() {
    this.orderBooks = [];
  }

  createOrderBook = ({ symbol, cid }) => {
    const orderBookId = this.orderBooks.length + 1;

    const newOrderBook = {
      id: orderBookId,
      symbol,
      cid,
      orders: {
        sell: [],
        buy: [],
      },
    };

    console.log("newOrderBook :>> ", newOrderBook);

    this.orderBooks = [...this.orderBooks, newOrderBook];

    return newOrderBook;
  };

  submitOrder = ({ id, cid, amount, typeOrder, price }) => {

    const orderBookIndex = this.orderBooks.findIndex(
      (orderBook) => orderBook.id === id
    );

    console.log("orderBookIndex :>> ", orderBookIndex);

    if (orderBookIndex === -1) {
      throw new Error(`Order book with id ${id} not found.`);
    }

    const updatedOrders = [
      ...this.orderBooks[orderBookIndex].orders[typeOrder],
      { id: uuidv4(), cid, amount, price },
    ];

    this.orderBooks[orderBookIndex].orders[typeOrder] =
      TYPE_ORDER.sell == typeOrder
        ? sortOrders(updatedOrders, "asc")
        : sortOrders(updatedOrders, "desc");

    console.log(
      "this.orderBooks :>> ",
      JSON.stringify(this.orderBooks[orderBookIndex], null, 2)
    );

    return this.orderBooks;
  };
}

module.exports = new OrderBook();
