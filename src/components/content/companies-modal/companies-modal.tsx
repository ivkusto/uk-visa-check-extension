import { Component, For, Show, Signal } from "solid-js";
import { OrgData } from "../../../types/org-data";
import styles from "./companies-modal.module.css";

const CompaniesModal: Component<CompaniesModalProps> = (props) => {
  return (
    <Show when={props.opened}>
      <div class={styles.popup}>
        <ul class={styles.list}>
          <For each={props.companies}>
            {(company) => <li class={styles.listItem}>{company.orgName}</li>}
          </For>
        </ul>
      </div>
    </Show>
  );
};

interface CompaniesModalProps {
  opened: boolean;
  companies: OrgData[];
}

export default CompaniesModal;
