import { Router } from "express";
import { destroy, index, store, update } from "../controllers/MovieController";
import { Request, Response, NextFunction } from "express";

const router = Router();


router.post("/", (req: Request, res: Response, next: NextFunction) => {
    store(req, res).catch(next);
});
router.get("/", (req: Request, res: Response, next: NextFunction) => {
    index(req, res).catch(next);
});
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
    update(req, res).catch(next);
});
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
    destroy(req, res).catch(next);
});

export default router;
