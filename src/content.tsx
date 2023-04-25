/* @refresh reload */
import { render } from "solid-js/web";

import Sticker from "./components/content/sticker/sticker";
import { OrgData } from "./types/org-data";

window.addEventListener("load", async () => {
  const companyList = document.querySelectorAll(".companyName");

  for (const node of companyList) {
    const companyName = getCompanyName(node);
    if (!companyName) continue;

    const words = companyName.split(/[^\d\w]/g);
    const [primaryResult, secondaryResult] = await Promise.all([
      searchByFirstWord(words),
      searchByRemainingWords(words),
    ]);

    if (!hasResults(primaryResult, secondaryResult)) continue;

    const stickerRoot = document.createElement("div");
    node.appendChild(stickerRoot);

    renderSticker(primaryResult, secondaryResult, companyName, stickerRoot);
  }
});

function getCompanyName(node: Element) {
  return node.childNodes[0].textContent;
}

function searchByOrgName(partialOrgName: string): Promise<OrgData[]> {
  return new Promise((res, rej) => {
    chrome.runtime.sendMessage(
      { action: "searchByOrgName", partialOrgName },
      (response) => {
        res(response as OrgData[]);
      }
    );
  });
}

async function searchByFirstWord(words: string[]): Promise<OrgData[]> {
  return words[0] ? await searchByOrgName(words[0]) : [];
}

async function searchByRemainingWords(words: string[]): Promise<OrgData[]> {
  const remainingWords = words.splice(1);

  const results = await remainingWords.reduce(
    async (accPromise: Promise<OrgData[]>, word: string) => {
      const acc = await accPromise;
      const request = await searchByOrgName(word);
      return acc.concat(request);
    },
    Promise.resolve([])
  );

  return results;
}

function hasResults(
  primaryResult: OrgData[],
  secondaryResult: OrgData[]
): boolean {
  return (
    !!primaryResult.length || (secondaryResult && secondaryResult.length > 0)
  );
}

function renderSticker(
  primaryResult: OrgData[],
  secondaryResult: OrgData[],
  companyName: string,
  root: HTMLElement
): void {
  render(
    () => (
      <Sticker
        primaryResult={primaryResult}
        secondaryResult={secondaryResult || []}
        orgName={companyName}
      />
    ),
    root
  );
}
