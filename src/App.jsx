import "./App.css";

import FormQr from "./components/FormQr";
import CryptoTransferQR from "./components/CryptoTransferQr";
import DataProvider from "./contex/QrContex";

function App() {
    return (
        <DataProvider>
            <FormQr />
            <CryptoTransferQR />
        </DataProvider>
    );
}

export default App;
