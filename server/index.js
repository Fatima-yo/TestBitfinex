"use strict";
const Link = require("grenache-nodejs-link");
const { PeerRPCServer } = require("grenache-nodejs-http");
const _ = require("lodash");

const OrderBookIntance = require("./orderBook/index");
const { ACTIONS, SERVICES, GRAPE, PORT } = require("../constants");

class Server {
  constructor() {
    const port = PORT || _.random(1000) + 1024;
    this.link_instance = new Link({
      grape: GRAPE,
    });
    this.link_instance.start();

    this.peer_instance = new PeerRPCServer(this.link_instance, {
      timeout: 300000,
    });
    this.peer_instance.init();

    this.service = this.peer_instance.transport("server");
    this.service.listen(port);

    console.log("Init server... :>> ", port);
  }

  async addService(name, handler) {
    console.log("name, handler :>> ", name, handler);
    setInterval(() => {
      this.link_instance.announce(name, this.service.port, {});
    }, 1000);

    await this.service.on("request", handler);

    return this.service;
  }

  startServices() {
    this.addService(SERVICES.orderBook, (rid, key, payload, handler) => {
      console.log("key, payload :>> ", key, payload);
      
      const { action, data } = payload;
      console.log('action :>> ', action);

      if (action === ACTIONS.createOrderBook) {
        const { symbol, cid } = data;
        if (!symbol || !cid)
          handler.reply(new Error("symbol and cid must be sending"));
        const response = OrderBookIntance.createOrderBook(data);
        console.log("response :>> ", response);
        handler.reply("Response", response);
        return response
      }

      if (action === ACTIONS.submitOrder) {
        const { id, cid, amount, typeOrder, price } = data;
        if (!id || !cid || !amount || !typeOrder || !price)
          handler.reply(new Error("id, cid, amount, typeOrder, price must be sending"));
        const response = OrderBookIntance.submitOrder(data);
        handler.reply("Response", response);
      }
    });
  }
}

const server = new Server();
server.startServices();
