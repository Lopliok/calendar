import React, { ReactChild, useState } from 'react';
import { IStore } from '.';

const Store = React.createContext<Partial<IStore>>({});

interface Props {
    defaultValue: object;
    children: ReactChild;
}

export const StoreProvider: React.FunctionComponent<Props> = ({ defaultValue, ...props }: Props) => {
    const [state, setState] = useState<Partial<IStore>>(defaultValue);

    function set<T, K extends keyof IStore>(key: K, value: T): void {
        setState(prevState => {
            let newState = {
                ...prevState,
                set,
                [key]: { ...prevState[key], ...value },
            };
            return newState;
        });
    }

    return (
        <Store.Provider value={{ ...state, set }}>{props.children}</Store.Provider>
    );
};

export function withContext<T extends IStore>(Component: React.FunctionComponent<T>) {
    return function contextComponent(props: T) {
        return <Store.Consumer>{(context: Partial<IStore>) => <Component {...props} context={context} />}</Store.Consumer>;
    };
}

export default Store;
