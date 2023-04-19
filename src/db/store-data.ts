import { OrgData } from "../types/org-data";
import { getIndexedDBEventTarget } from "./get-event-target";
import { config } from "./config";

export async function storeData(data: OrgData[]) {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(config.dbName, 1);

    openRequest.onupgradeneeded = (event) => {
      const db = getIndexedDBEventTarget(event).result;
      const objectStore = db.createObjectStore(config.store, {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex(config.index, config.index, { multiEntry: true });
    };

    openRequest.onsuccess = (event) => {
      const db = getIndexedDBEventTarget(event).result;
      const transaction = db.transaction(config.store, "readwrite");
      const objectStore = transaction.objectStore(config.store);

      data.forEach((item) => {
        objectStore.add(item);
      });

      transaction.oncomplete = () => resolve(true);
      transaction.onerror = () => reject(transaction.error);
    };

    openRequest.onerror = (event) => {
      reject(getIndexedDBEventTarget(event).error);
    };
  });
}
