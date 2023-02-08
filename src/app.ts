import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

import { Config } from "./config";
import { Database } from "./database";
import { UserConnection } from "../types";
import { WebSocketServer } from "ws";

export default class App {
    config: Config;
    server: WebSocketServer;
    connections: UserConnection[];
    db: Kysely<Database>;

    constructor(config: Config) {
        this.config = config;

        this.server = new WebSocketServer();
        this.connections = [];

        this.db = new Kysely<Database>({
            dialect: new PostgresDialect({
                pool: new Pool(this.config.database),
            }),
        });
    }
}
