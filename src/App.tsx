import type { Component, JSX } from "solid-js";
import styles from "./App.module.css";
import { OrgData } from "./types/org-data";
import { storeData } from "./db/store-data";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <input type="file" onChange={loadCSV} accept=".csv" />
      </header>
    </div>
  );
};

const loadCSV: JSX.EventHandler<HTMLInputElement, Event> = async (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    return;
  }

  try {
    const csvText = await readFileAsText(file);
    if (!csvText) return;

    const rows = csvText.split("\n").slice(1);
    const data: OrgData[] = rows.map((row) => {
      const [orgName, town, industry, mainTier, subTier, dateAdded] =
        row.split(",");
      const formatedOrgName = orgName
        ?.replace(/[^\w]/g, " ")
        .trim()
        .toLowerCase();
      return {
        orgName: formatedOrgName,
        town: town?.trim(),
        industry: industry?.trim(),
        mainTier: mainTier?.trim(),
        subTier: subTier?.trim(),
        dateAdded: new Date(dateAdded?.trim()),
        words: getAllWords(formatedOrgName),
      };
    });

    await storeData(data);
  } catch (error) {
    console.error("Error loading CSV:", error);
  }
};

function readFileAsText(file: File): Promise<string | undefined | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

function getAllWords(text?: string) {
  if (!text) return null;
  var allWordsIncludingDups = text.split(" ");
  var wordSet = allWordsIncludingDups.reduce<Record<string, boolean>>(
    (prev, current) => {
      if (!/^\d+$/.test(current) && current) {
        prev[current] = true;
      }
      return prev;
    },
    {}
  );
  return Object.keys(wordSet);
}

export default App;
