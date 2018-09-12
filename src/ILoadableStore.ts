/**
 * An interface of a store with loading states.
 */
interface ILoadableStore {
  SET_LOADING (name: string): void;
  UNSET_LOADING (name: string): void;
}

export default ILoadableStore;
