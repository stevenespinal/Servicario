import {FETCH_SERVICES_SUCCESS, FETCH_SERVICE_SUCCESS} from "../types";
import db from "../db";

export const fetchServices = () => {
  return db.collection("services").get().then(snapshot => {
    const services = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return {
      type: FETCH_SERVICES_SUCCESS,
      services
    }
  });
}

export const fetchService = id => {
  return db.collection("services").doc(id).get().then(snapshot => {
    return {
      type: FETCH_SERVICE_SUCCESS,
      service: {id: snapshot.id, ...snapshot.data()}
    }
  });
}

