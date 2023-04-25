import { Component, JSX, createSignal } from "solid-js";
import styles from "./csv-loader.module.css";
import { storeData } from "../../../db/store-data";
import { OrgData } from "../../../types/org-data";
import { getAllWords } from "./utils/get-all-words";

const CSVLoader: Component<CSVLoaderProps> = ({}) => {
  const [loading, setLoading] = createSignal(false);

  const onCSVLoad: JSX.EventHandler<HTMLInputElement, Event> = async (
    event
  ) => {
    setLoading(true);
    loadCSV(event).then(() => setLoading(false));
  };

  return (
    <input
      type="file"
      onChange={onCSVLoad}
      accept=".csv"
      class={styles.input}
      disabled={loading()}
    />
  );
};

async function loadCSV(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    return Promise.reject("file not found");
  }

  try {
    const csvText = await readFileAsText(file);
    if (!csvText) return;

    const rows = csvText.split("\n").slice(1);
    const data: OrgData[] = rows.map(orgDataByRow);

    await storeData(data);
  } catch (error) {
    console.error("Error loading CSV:", error);
  }
}

function readFileAsText(file: File): Promise<string | undefined | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

function orgDataByRow(row: string) {
  const [orgName, town, industry, mainTier, subTier, dateAdded] =
    row.split(",");
  const formatedOrgName = orgName?.replace(/[^\w]/g, " ").trim().toLowerCase();
  return {
    orgName: formatedOrgName,
    town: town?.trim(),
    industry: industry?.trim(),
    mainTier: mainTier?.trim(),
    subTier: subTier?.trim(),
    dateAdded: new Date(dateAdded?.trim()),
    words: getAllWords(formatedOrgName),
  };
}

export default CSVLoader;

interface CSVLoaderProps {}
