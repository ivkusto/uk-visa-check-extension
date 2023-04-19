import { OrgData } from "../types/org-data";
import { getIndexedDBEventTarget } from "./get-event-target";
import { config } from "./config";

export async function searchByOrgName(partialOrgName: string) {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(config.dbName, 1);

    openRequest.onsuccess = (event) => {
      const db = getIndexedDBEventTarget(event).result;
      const transaction = db.transaction(config.store, "readonly");
      const objectStore = transaction.objectStore(config.store);
      const index = objectStore.index(config.index);
      const request = index.openCursor(
        IDBKeyRange.only(partialOrgName.toLowerCase())
      );
      const results: OrgData[] = [];

      request.onsuccess = (event) => {
        const cursor = getIndexedDBEventTarget(event)
          .result as unknown as IDBCursorWithValue;
        if (cursor) {
          const item = cursor.value;
          results.push(item);
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    };

    openRequest.onerror = (event) => {
      reject(getIndexedDBEventTarget(event).error);
    };
  });
}
