import { storeData } from "../store-data";
import { OrgData } from "../../types/org-data";
import { config } from "../config";
import FDBFactory from "fake-indexeddb/lib/FDBFactory";
import { mockOrgDataArray } from "../../types/mocks/mock-org-data";

describe("storeData", () => {
  beforeAll(() => {
    (global as any).indexedDB = new FDBFactory();
  });

  test("should store data in IndexedDB", async () => {
    await storeData(mockOrgDataArray);

    const openRequest = indexedDB.open(config.dbName, 1);

    openRequest.onsuccess = (event) => {
      const db = (event.target as any).result as IDBDatabase;
      const transaction = db.transaction(config.store, "readonly");
      const objectStore = transaction.objectStore(config.store);
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = (getAllEvent) => {
        const storedData = (getAllEvent.target as any).result;
        expect(storedData).toHaveLength(mockOrgDataArray.length);
        expect(storedData[0]).toMatchObject(mockOrgDataArray[0]);
      };
    };
  });

  test("should store data with correct words index", async () => {
    const newData: OrgData = {
      orgName: "New Organization",
      town: "New Town",
      industry: "New Industry",
      mainTier: "New Main Tier",
      subTier: "New Sub Tier",
      dateAdded: new Date(),
      words: ["wordIndex1", "wordIndex2"],
    };

    await storeData([...mockOrgDataArray, newData]);

    const openRequest = indexedDB.open(config.dbName, 1);

    openRequest.onsuccess = (event) => {
      const db = (event.target as any).result as IDBDatabase;
      const transaction = db.transaction(config.store, "readonly");
      const objectStore = transaction.objectStore(config.store);
      const wordsIndex = objectStore.index(config.index);

      const indexGetRequest = wordsIndex.getAll("wordIndex1");

      indexGetRequest.onsuccess = (indexGetEvent) => {
        const indexData = (indexGetEvent.target as any).result;
        expect(indexData).toHaveLength(1);
        expect(indexData[0]).toMatchObject(newData);
      };
    };
  });
});
