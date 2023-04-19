import { Component, For } from "solid-js";
import styles from "./sticker.module.css";
import { createSignal } from "solid-js";
import { OrgData } from "../../types/org-data";
import Popup from "../popup/popup";

const Sticker: Component<StickerProps> = ({
  secondaryResult,
  primaryResult,
}) => {
  const [primaryOpened, setPrimaryOpened] = createSignal(false);
  const [secondaryOpened, setSecondaryOpened] = createSignal(false);
  const [list, setList] = createSignal(primaryResult);
  const opened = () => primaryOpened() || secondaryOpened();
  return (
    <div class={styles.container}>
      <div class={styles.buttons}>
        {primaryResult.length > 0 && (
          <button
            classList={{ [styles.button]: true, [styles.primaryButton]: true }}
            onClick={() => {
              setPrimaryOpened((opened) => !opened);
              setSecondaryOpened(false);
              setList(primaryResult);
            }}
          >
            👍
          </button>
        )}
        {secondaryResult.length > 0 && (
          <button
            classList={{
              [styles.button]: true,
              [styles.secondaryButton]: true,
            }}
            onClick={() => {
              setPrimaryOpened(false);
              setSecondaryOpened((opened) => !opened);
              setList(secondaryResult);
            }}
          >
            ?
          </button>
        )}
      </div>
      <Popup opened={opened()} companies={list()} />
    </div>
  );
};

export default Sticker;

interface StickerProps {
  secondaryResult: OrgData[];
  primaryResult: OrgData[];
  orgName: string;
}
