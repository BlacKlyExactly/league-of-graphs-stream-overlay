import { Router } from "express";
import path from "path";
import scrape from "../utils/scrape";
import { io } from "../";
import { Socket } from "socket.io";

const router = Router();

router.get("/overlay/:server/:summoner/:champion", async ( req, res ) => {
    const { 
        summoner, 
        champion, 
        server 
    } = req.params;

    if(!summoner || !champion || !server){
        res.status(422).send("Missing data");
        return;
    }

    const data = await scrape(req.params);
    res.sendFile(path.resolve(__dirname + "/../views/champion.html"));

    io.on("connection", ( socket: Socket ) => {
        socket.emit("refresh", data);
    })
})

export default router;