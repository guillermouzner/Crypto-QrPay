import { createContext, useState } from "react";

export const QrContex = createContext();

let transferQrData = {};

const QrProvider = ({ children }) => {
    const [data, setData] = useState(transferQrData);

    return (
        <QrContex.Provider value={{ data, setData }}>
            {children}
        </QrContex.Provider>
    );
};

export default QrProvider;
