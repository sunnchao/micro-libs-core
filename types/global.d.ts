export {};

declare const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
  };
  lastBuildTime: string;
};
export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};
declare type Indexable<T = any> = {
  [key: string]: T;
};
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type IntervalHandle = ReturnType<typeof setInterval>;

declare interface ChangeEvent extends Event {
  target: HTMLInputElement;
}

declare interface WheelEvent {
  path?: EventTarget[];
}

// interface ImportMetaEnv extends ViteEnv {
//   __: unknown;
// }

declare function parseInt(s: string | number, radix?: number): number;

declare function parseFloat(string: string | number): number;
// }

export interface MicroAppDataFunction {
  /**
   * 发送数据
   * @param appName
   * @param data
   * @param callback
   * @returns
   */
  setData: (appName: string, data: Recordable, callback?: (data: Recordable) => void) => void;

  getData: (appName: string) => Recordable;

  clearData: (appName: string) => void;

  /**
   * 绑定监听函数，监听函数只有在数据变化时才会触发
   * @param listener 绑定函数
   * @param autoTrigger 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
   * @returns
   */
  // addDataListener: (listener: (data: Recordable) => void, autoTrigger?: boolean) => void;
  addDataListener: (
    appName: string,
    listener: (data: Recordable) => void,
    autoTrigger?: boolean,
  ) => void;

  removeDataListener: (appName: string, listener: (data: Recordable) => void) => void;

  clearDataListener: (appName?: string) => void;

  // 强制发送数据
  forceSetData: (appName: string, data: Recordable, callback?: (data: Recordable) => void) => void;

  // 子向主
  dispatch: (data: Recordable, callback?: (data: Recordable) => void) => void;
}

export interface MicroAppGlobalFunction {
  /**
   * 全局数据
   * @param data
   * @returns
   */
  setGlobalData: (data: Recordable) => void;

  getGlobalData: () => Recordable;

  clearGlobalData: () => void;

  /**
   * 添加全局数据变化监听函数
   * @param listener 绑定函数
   * @param autoTrigger 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
   */
  addGlobalDataListener: (listener: (data: Recordable) => void, autoTrigger?: boolean) => void;

  removeGlobalDataListener: (listener: (data: Recordable) => void) => void;

  clearGlobalDataListener: () => void;
}

export interface MicroApp extends MicroAppDataFunction, MicroAppGlobalFunction {}

declare global {
  interface Window {
    __MICRO_APP_ENVIRONMENT__?: boolean;
    __MICRO_APP_NAME__?: string;
    __MICRO_APP_PUBLIC_PATH__?: string;
    microApp?: MicroApp;
  }
}
