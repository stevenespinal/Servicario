import db from "../db";

export * from "./services";
export * from "./auth";

export const createRef = (collection, docId) => db.doc(`${collection}/${docId}`);