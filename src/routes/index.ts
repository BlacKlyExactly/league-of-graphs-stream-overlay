import { Router } from "express";
import champions from "./champions";

const router = Router();

router.use("/champions", champions);

export default router;