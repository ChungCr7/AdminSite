import express from "express";
import TripController from "../controllers/trips_controller.js";
const tripRouter = express.Router();

tripRouter.get("/", TripController.index);
tripRouter.get("/new",TripController.new);
tripRouter.post("/create",TripController.create);
tripRouter.delete("/delete/:id", TripController.delete);
tripRouter.get("/edit/:id", TripController.edit);
tripRouter.post("/edit/:id", TripController.update);


export default tripRouter;