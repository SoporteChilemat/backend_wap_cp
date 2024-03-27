import express from "express";
import WebscrapperController from './winappdriver.controller';


const routerApi = (app: any) => {
  const router = express.Router();
  const webscrapperController = new WebscrapperController();

  app.use("/api/v1", router);

  router.use("/webscrapper", webscrapperController.getController());
};

export default routerApi;
