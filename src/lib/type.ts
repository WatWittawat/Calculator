import { ACTION } from "./data";

export type useACTIONname = (typeof ACTION)[keyof typeof ACTION];
