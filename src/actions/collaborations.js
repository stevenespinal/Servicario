import * as api from "../api/collaborations";

export const collaborate = ({collaboration, msg}) => api.createCollaboration(collaboration).then(collabId => {
  msg.cta = `/collaborations/${collabId}`;
  api.sendMessage(msg);
  return collabId;
});
