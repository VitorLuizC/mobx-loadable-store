import ILoadableStore from './ILoadableStore';

/**
 * Check if value is an object.
 * @param value
 */
const isObject = (
  value: any,
): boolean => value && typeof value === 'object';

/**
 * Check if value is an ILoadableStore implementation.
 * @param value
 */
const isILoadableStore = (
  value: any,
): value is ILoadableStore => (
  isObject(value) &&
  'SET_LOADING' in value &&
  'UNSET_LOADING' in value &&
  typeof value.SET_LOADING === 'function' &&
  typeof value.UNSET_LOADING === 'function'
);

export default isILoadableStore;
