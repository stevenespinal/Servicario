import * as api from "../api";

export const checkUserConnection = userId => {
  const userStatusDbRef = api.createFirebaseRef("status", userId);

  api.onConnectionChanged(isConnected => {
    if (!isConnected) {
      userStatusDbRef.set(api.isOffline)
      return null;
    }

    userStatusDbRef.onDisconnect().set(api.isOffline).then(() => userStatusDbRef.set(api.isOnline));

  });
}