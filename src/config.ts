import "dotenv/config";
import { PoolConfig } from "pg";

export interface Config {
    readonly port: number;
    readonly database: PoolConfig;
}

const config: Config = {
    port: parseInt(env("PORT")),
    database: {
        host: env("POSTGRES_HOST"),
        port: parseInt(env("POSTGRES_PORT")),
        user: env("POSTGRES_USER"),
        password: env("POSTGRES_PASSWORD"),
        database: env("POSTGRES_DATABASE"),
    },
};

function env(name: string) {
    if (!process.env[name]) {
        throw new Error(`Environment variable '${name}' not found`);
    }

    return process.env[name]!;
}

export default config;
