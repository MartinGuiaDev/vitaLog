import { Router } from "express";

import {deleteWorkOrder, createOrOpenWorkOrder ,closeWorkOrder, getWorkOrders, getWorkOrderById } from "../controllers/workOrder.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/open", authRequired, createOrOpenWorkOrder);
router.post("/close", authRequired, closeWorkOrder);
router.get("/workorders", authRequired,getWorkOrders);
router.get("/workorder/:id", authRequired,getWorkOrderById);
router.delete("/deleteWorkorder/:id", authRequired,deleteWorkOrder);

export default router;