
export enum Stores {
    events,
}


export type EventType = {
    name: string;
    from: string;
    to: string;
    color: string;
}




export type Events = {
    [k: string]: Record<number, EventType[]>
}



export interface IStoreContent {
    [Stores.events]: Events;

}

export type IStoreSet = <T, K extends keyof IStore>(key: K, value: T) => void;

export interface IStore extends IStoreContent {
    set<T, K extends keyof IStore>(key: K, value: T): void;
}

export interface IContext {
    context: IStore;
}

export const store: IStoreContent = {
    [Stores.events]: {},
};
