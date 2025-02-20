import { Router } from "express";
import getWidgetDetails from "../controllers/user/getWidgetDetails.js"
import saveWidget from "../controllers/user/saveWidget.js";
const router = Router();
router.route("/user/savewidget").post(saveWidget)
router.route("/user/widgets/:id").get(getWidgetDetails)
export default router;
