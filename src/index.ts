import express from "express";
import path from "path";
import { Socket } from "socket.io";
import routes from "./routes";
import scrape from "./utils/scrape";

const port = process.env.port || 3000;
const app = express();

app.use(routes);
app.use(express.static(path.resolve(__dirname + '/../node_modules/')))

const http = require("http").Server(app);
const io = require("socket.io")(http);

http.listen(port, () => console.info(`Listening on > http://localhost:${port}`));

interface OverlayData {
    server: string,
    summoner: string,
    champion: string,
    socketId: string,
}

let clients: OverlayData[] = [];

io.on("connection", ( socket: Socket ) => {
    socket.on("overlayLoad", ( data: OverlayData ) => {
        data.socketId = socket.id;
        clients = [ ...clients, data ];
        
        console.log("Client connected:", socket.id);
    })

    socket.on("disconnect", () => {
        clients.filter(( client ) => client.socketId !== socket.id);
        console.log("Client disconnected:", socket.id);
    })
})

setInterval(() => {
    clients.forEach(async ( client: OverlayData ) => {
        const params = {
            server: client.server,
            champion: client.champion,
            summoner: client.summoner,
        }

        const data = await scrape(params);
        io.to(client.socketId).emit("refresh", data);

        console.log(client.socketId, clients);
    })
}, 600000)

export { io };