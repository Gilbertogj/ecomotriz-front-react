import { NetworkStatusNotification } from "../network-status-notificacion/NetworkStatusNotification";

export const NetworkStatus = () => {
  window.addEventListener("online", () => {
    NetworkStatusNotification(true, "Vuelves a tener conexión");
  });

  window.addEventListener("offline", () => {
    NetworkStatusNotification(false, "Perdiste la conexión");
  });
};
