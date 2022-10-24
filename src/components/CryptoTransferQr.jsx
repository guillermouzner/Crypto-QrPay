import React, { useContext } from "react";
import QRCode from "qrcode.react";
import "./components.css";
import { QrContex } from "../contex/QrContex";

const CryptoTransferQR = () => {
    const { data } = useContext(QrContex);

    //console.log(data, "hola QR");

    //, chain, to, amount, decimals

    return (
        <>
            {JSON.stringify(data) !== "{}" && (
                <div className="qrcode-data">
                    <div className="qrcode">
                        <QRCode
                            value={
                                "ethereum:pay-" +
                                data.contract +
                                "@" +
                                data.chain +
                                "/transfer?address=" +
                                data.to +
                                "&uint256=" +
                                data.amount +
                                "e" +
                                data.decimals
                            }
                            size={300}
                            bgColor={"#FFFFFF"}
                            fgColor={"#000000"}
                            level={"H"}
                            includeMargin={true}
                            renderAs={"canvas"}
                        />

                        <div className="content-data">
                            <h3>
                                {data.amount} {data.coin}
                            </h3>
                            <span>to: {data.to}</span>
                            <span>
                                Network: {data.chain} {data.network}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CryptoTransferQR;
