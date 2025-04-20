import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Sets item in local storage
   *
   * @param {string} key
   * @param {unknown} value
   */
  setItem(key: string, value: unknown) {
    try {
      localStorage.setItem(`QLand-token-${key}`, JSON.stringify(value));
    } catch (e) {
      localStorage.setItem(`QLand-token-${key}`, value as string);
    }
  }

  /**
   * Gets item from local storage by key
   *
   * @param {string} key
   * @return {*}  {unknown}
   */
  getItem(key: string): unknown {
    const value = localStorage.getItem(`QLand-token-${key}`);
    try {
      return JSON.parse(value as string);
    } catch (e) {
      return value;
    }
  }

  /**
   * Removes item from local storage by key
   *
   * @param {string} key
   */
  removeItem(key: string) {
    localStorage.removeItem(`QLand-token-${key}`);
  }
}
