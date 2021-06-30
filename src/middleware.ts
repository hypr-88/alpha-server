import {Request, Response, NextFunction} from "express";

const TOKEN = "q0hcdABLUhGAzW3j";

export default function withAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.query.token || req.headers.token;

    if (!token || token != TOKEN) {
        res.status(401).json({"err": "Permission denied", "status": false});
    } else {
        next();
    }
}