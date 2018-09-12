import ILoadableStore from './ILoadableStore';
import isILoadableStore from './isILoadableStore';

/**
 * Handles it's loading on an ILoadableStore implementation.
 * @param name
 * @param store
 */
const loadable = (
  name: string,
  store?: ILoadableStore,
) => (_: any, __: any, descriptor: TypedPropertyDescriptor<Function>) => {
  const original = descriptor.value!;

  descriptor.value = function () {
    const _store = (store || this) as ILoadableStore;

    if (!isILoadableStore(_store))
      throw new Error(
        'This decorator was called outside ILoadableStore implementation\'s ' +
        'scope and didn\'t receive it as the second argument.'
      );

    _store.SET_LOADING(name);

    /**
     * Removes state and returns a promise rejection.
     * @param error
     */
    const onError = (error?: Error) => {
      _store.UNSET_LOADING(name);
      return Promise.reject(error);
    };

    /**
     * Removes state and returns a promise resolution.
     * @param value
     */
    const onValue = (value: any) => {
      _store.UNSET_LOADING(name);
      return Promise.resolve(value);
    };

    try {
      const value = original.apply(_store, arguments);
      return Promise.resolve(value).then(onValue).catch(onError);
    } catch (error) {
      return onError(error);
    }
  };
};

export default loadable;
