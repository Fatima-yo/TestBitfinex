const sortOrders = (orders, type = "asc") => {
  console.log('type :>> ', type);
  if (type === "asc") {
    return orders.sort((a, b) => a.price - b.price);
  }
  if (type === "desc") {
    return orders.sort((a, b) => b.price - a.price);
  }
};

module.exports = { sortOrders };
