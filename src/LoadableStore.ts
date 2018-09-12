import { action, computed, observable } from 'mobx';
import ILoadableStore from './ILoadableStore';

/**
 * Actions and their count of loading states.
 */
type Actions = { [name: string]: number; };

/**
 * A store of loadable actions.
 */
class LoadableStore implements ILoadableStore {
  @observable
  private _actions: Actions = Object.create(null);

  @computed
  get isLoadingAny (): boolean {
    const states = Object.keys(this._actions).map((name) => this._actions[name]);
    return states.some((state) => (state || 0) > 0);
  }

  isLoading (name: string): boolean {
    return (this._actions[name] || 0) > 0;
  }

  @action('SET_LOADING')
  SET_LOADING (name: string): void {
    this._actions[name] = (this._actions[name] || 0) + 1;
  }

  @action('UNSET_LOADING')
  UNSET_LOADING (name: string): void {
    this._actions[name] = (this._actions[name] || 0) - 1;
    if (!this._actions[name])
      delete this._actions[name];
  }
}

export default LoadableStore;
