const GRAPE = "http://127.0.0.1:30001";

const PORT = 2024;

const SERVICES = {
  orderBook: "order_book",
};

const ACTIONS = {
  createOrderBook: "createOrderBook",
  submitOrder: "submitOrder",
};

const TYPE_ORDER = {
  buy: "buy",
  sell: "sell",
  update: "update",
};

const CLIENTS_ID = {
  user_1: "c3ab01b3-71ce-40c6-b0a4-5925ae479920",
  user_2: "62516be5-9c09-4296-9aee-7baee5f2b7d5",
};

module.exports = {
  ACTIONS,
  CLIENTS_ID,
  GRAPE,
  PORT,
  SERVICES,
  TYPE_ORDER,
};
