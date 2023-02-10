import { z } from "zod";

export const BaseMessage = z.object({
    type: z.string(),
    userId: z.string().uuid(),
    token: z.string(),
    payload: z.unknown(),
});

export const Message = BaseMessage.extend({
    type: z.enum(),
});
