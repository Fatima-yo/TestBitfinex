"use strict";

const Link = require("grenache-nodejs-link");
const { PeerRPCClient } = require("grenache-nodejs-http");
const { v4: uuidv4 } = require("uuid");
const {
  ACTIONS,
  CLIENTS_ID,
  SERVICES,
  GRAPE,
  TYPE_ORDER,
} = require("../constants");
const _ = require("lodash");

class Client {
  link_instance;
  peer_instance;
  clientId = CLIENTS_ID.user_1 || uuidv4();
  service = SERVICES.orderBook;

  constructor() {
    this.link_instance = new Link({
      grape: GRAPE,
    });
    this.link_instance.start();

    this.peer_instance = new PeerRPCClient(this.link_instance, {});
    this.peer_instance.init();
    console.log("clientId :>> ", this.clientId);
  }

  stop = () => {
    this.peer_instance.stop();
    this.link_instance.stop();
  };

  request = async (payload, options = { timeout: 10000, compress: true }) => {
    try {
      return await new Promise((resolve, reject) => {
        this.peer_instance.request(
          this.service,
          payload,
          options,
          (err, data) => {
            if (err) {
              console.log("err :>> ", err);
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  createOrderBook = async (symbol) => {
    try {
      const payload = {
        action: ACTIONS.createOrderBook,
        data: {
          symbol: symbol,
          cid: this.clientId,
        },
      };
      const response = await this.request(payload);
      console.log("response check :>> ", response);
      return response.id;
    } catch (error) {
      throw error;
    }
  };

  submitOrder = async ({ id, typeOrder, amount, price }) => {
    try {
      const payload = {
        action: ACTIONS.submitOrder,
        data: {
          id,
          cid: this.clientId,
          amount,
          typeOrder,
          price,
        },
      };

      const response = await this.request(payload);

      console.log("submit order :>> ", response);

      return response;
    } catch (error) {
      throw error;
    }
  };

}

const main = async () => {
  const client = new Client();
  const orderBookId = await client.createOrderBook("ETH/BTC");
  console.log("orderBookId :>> ", orderBookId);

  for (let index = 0; index < 10; index++) {
    await client.submitOrder({
      id: orderBookId,
      amount: _.random(0, 50, true).toFixed(1),
      typeOrder: TYPE_ORDER.sell,
      price: _.random(11, 15, true).toFixed(3),
    });
    
    await client.submitOrder({
      id: orderBookId,
      amount: _.random(0, 50, true).toFixed(1),
      typeOrder: TYPE_ORDER.buy,
      price: _.random(9, 11, true).toFixed(3),
    });
  }

  process.exit(-1);
};

main();
