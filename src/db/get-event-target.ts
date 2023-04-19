export function getIndexedDBEventTarget(event: Event) {
  return (
    event as unknown as Event & {
      target: { result: IDBDatabase; error: Error };
    }
  ).target;
}
