import { UserTable } from "./tables/user.table";
import { TokenTable } from "./tables/token.table";

export interface Database {
    user_account: UserTable;
    conversation: UserTable;
    conversation_recipient: TokenTable;
    conversation_message: TokenTable;
}
