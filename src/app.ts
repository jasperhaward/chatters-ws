import { WebSocketServer, WebSocket } from "ws";
import { IncomingMessage } from "http";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

import { Config } from "./config";
import { Database } from "./database";
import { UserConnection } from "../types";
import * as api from "./api";

export default class App {
    config: Config;
    server: WebSocketServer;
    connections: Set<UserConnection>;
    db: Kysely<Database>;

    constructor(config: Config) {
        this.config = config;

        this.server = new WebSocketServer({ port: config.port });
        this.connections = new Set();

        this.db = new Kysely<Database>({
            dialect: new PostgresDialect({
                pool: new Pool(config.database),
            }),
        });

        this.server.on("connection", this.onConnection);
    }

    onConnection(socket: WebSocket, request: IncomingMessage) {
        socket.on("message", async (data) => {
            const message = JSON.parse(`${data}`);

            try {
                await api.verifyToken();
            } catch {
                socket.send("HTTP/1.1 401 Unauthorized\r\n\r\n");
                socket.close();
                return;
            }
        });
    }
}
