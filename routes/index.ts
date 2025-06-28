import { Router } from "express";
import MoviesRoutes from "./movieRoute";
import CastRoutes from "./castRoute";

const router = Router();


router.use("/movies", MoviesRoutes);
router.use("/casts", CastRoutes);

export default router;
