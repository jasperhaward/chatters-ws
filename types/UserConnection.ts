import { WebSocket } from "ws";

export interface UserConnection {
    userId: string;
    socket: WebSocket;
}
