import type { Nullable } from '/#/global';

import { cacheCipher } from '/@/settings/encryptionSetting';

import type { EncryptionParams } from '/@/utils/cipher';

import { AesEncryption } from '/@/utils/cipher';

import { isNullOrUnDef } from '/@/utils/is';

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
}

// class WebStorage {
//   private storage: Storage;
//   private prefixKey?: string;
//   private encryption: AesEncryption;
//   private hasEncrypt: boolean;
//   private timeout: null | number;

//   constructor() {}

//   init(storage: Storage, prefixKey: string, encryption: AesEncryption, timeout: null | number, hasEncrypt: boolean) {
//     this.storage = storage;
//     this.prefixKey = prefixKey;
//     this.encryption = encryption;
//     this.hasEncrypt = hasEncrypt;
//     this.timeout = timeout;
//   }

//   private getKey(key: string) {
//     return `${this.prefixKey}${key}`.toUpperCase();
//   }

//   set(key: string, value: any, expire: number | null = this.timeout) {
//     const stringData = JSON.stringify({
//       value,
//       time: Date.now(),
//       expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
//     });
//     const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData;
//     this.storage.setItem(this.getKey(key), stringifyValue);
//   }

//   get(key: string, def: any = null): any {
//     const val = this.storage.getItem(this.getKey(key));
//     if (!val) return def;

//     try {
//       const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
//       const data = JSON.parse(decVal);
//       const { value, expire } = data;
//       if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
//         return value;
//       }
//       this.remove(key);
//     } catch (e) {
//       return def;
//     }
//   }

//   remove(key: string) {
//     this.storage.removeItem(this.getKey(key));
//   }

//   clear(): void {
//     this.storage.clear();
//   }
// }

function WebStorageFn(storage: Storage, prefixKey: string, encryption: AesEncryption, timeout: null | number, hasEncrypt: boolean) {
  function getKey(key) {
    return `${prefixKey}${key}`.toUpperCase();
  }

  function set(key, value, expire = timeout) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    });
    const stringifyValue = hasEncrypt ? encryption.encryptByAES(stringData) : stringData;
    storage.setItem(getKey(key), stringifyValue);
  }

  function get(key, def = null) {
    const val = storage.getItem(getKey(key));
    if (!val) return def;

    try {
      const decVal = hasEncrypt ? encryption.decryptByAES(val) : val;
      const data = JSON.parse(decVal);
      const { value, expire } = data;
      if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
        return value;
      }
      remove(key);
    } catch (e) {
      return def;
    }
  }

  function remove(key) {
    storage.removeItem(getKey(key));
  }

  function clear() {
    storage.clear();
  }

  return {
    set,
    get,
    remove,
    clear,
  };
}

export const createStorage = ({ prefixKey = '', storage = sessionStorage, key = cacheCipher.key, iv = cacheCipher.iv, timeout = null, hasEncrypt = true }: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  const _storage = WebStorageFn(storage, prefixKey, encryption, timeout, hasEncrypt);
  return _storage;
};
