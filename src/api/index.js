import db from "../db";

export * from "./services";
export * from "./auth";
export * from "./offers";
export * from "./collaborations";

export const createRef = (collection, docId) => db.doc(`${collection}/${docId}`);