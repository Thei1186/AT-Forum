import {Topic} from "./topic";

export interface User {
    uid: string;
    name: string;
    username: string;
    email: string;
    photoURL: string;
    favouriteTopics?: Topic[];
}
