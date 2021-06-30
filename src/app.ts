import express, {Request, Response} from 'express';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import Alpha from "./models/Alpha";
import withAuth from "./middleware";

//connect app to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/db').then(
    () => {
        console.log('Database is connected')
    },
    err => {
        console.log('Can not connect to the database' + err)
    }
);

const app = express();
const port = 3000;

app.use(json({limit: "50mb"}))

app.post('/api/alpha', withAuth, async (req: Request, res: Response) => {
    const {symbolList, window, nodes, setupOPs, predictOPs, updateOPs, operandsValues, name} = req.body;

    if (!symbolList || !nodes || !setupOPs || !predictOPs || !updateOPs || !operandsValues) {
        res.status(400).json({"err": "Missing information", "status": false});
        return;
    }

    const alpha = Alpha.build({
        symbolList,
        window: window ? window : 30,
        nodes,
        setupOPs,
        predictOPs,
        updateOPs,
        operandsValues,
        name
    });

    try {
        const doc = await alpha.save();
        res.status(200).json({data: doc, "status": true});
    }catch (e) {
        console.log(e);
        res.status(400).json({"err": "Unexpected error", "status": false});
    }
});

app.get('/api/alpha', withAuth, async (req: Request, res: Response) => {
    const { id, name } = req.query;

    if (id && typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
            const alpha = await Alpha.findById(id);
            res.status(200).json({data: alpha, "status": true});
        } catch (e) {
            console.log(e);
            res.status(400).json({"err": "Invalid id", "status": false});
        }
        return
    }

    if (name && typeof name === 'string') {
        try {
            const alpha = await Alpha.findOne({name});
            res.status(200).json({data: alpha, "status": true});
        } catch (e) {
            console.log(e);
            res.status(400).json({"err": "Invalid id", "status": false});
        }
        return
    }

    try {
        const alphas = await Alpha.find({});
        res.status(200).json({data: alphas, status: true});
    }catch (e) {
        console.log(e);
        res.status(400).json({"err": "Unexpected error", "status": false});
    }
});

app.delete('/api/alpha', withAuth, async (req: Request, res: Response) => {
    const { id, name } = req.query;

    if (id && typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
            await Alpha.findByIdAndDelete(id);
            res.status(200).json({"status": true});
        } catch (e) {
            console.log(e);
            res.status(400).json({"err": "Invalid id", "status": false});
        }
        return
    }

    if (name && typeof name === 'string') {
        try {
            await Alpha.findOneAndDelete({name});
            res.status(200).json({"status": true});
        } catch (e) {
            console.log(e);
            res.status(400).json({"err": "Invalid id", "status": false});
        }
        return
    }

    res.status(400).json({"err": "invalid name or id param", "status": false});
});

app.listen(port, () => {
    console.log('server is running at port:' + port);
});