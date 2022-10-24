import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { QrContex } from "../contex/QrContex";
import ContratHook from "./ContratHook";
import { FiSettings } from "react-icons/fi";

const FormQr = () => {
    const { register, handleSubmit, watch, reset } = useForm();

    const [framework, setFramework] = useState("eth");

    const [network, setNetwork] = useState(ContratHook(framework));

    useEffect(() => {
        setNetwork(ContratHook(framework));
        setData({});
    }, [framework]);

    const cambioRadioButton = (e) => {
        setFramework(e.target.value);
    };

    const onSubmit = () => {
        setData(transferQrData);
    };

    const [destinationAdress, setDestinationAdress] = useState(false);
    const [adress, setAdress] = useState(
        window.localStorage.getItem("adress") ||
            "0xe64515f58760dD9a95177f65Ec75B0B6ddED8e23"
    );

    const clickMe = (e) => {
        e.preventDefault();
        setDestinationAdress(true);
    };

    const newAdress = watch("newAdress");

    const new_adress = () => {
        try {
            setAdress(newAdress);
            window.localStorage.setItem("adress", newAdress);
            setDestinationAdress(false);
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    const [selec, setSelec] = useState("Choose");
    let datos = [];
    datos = network.filter((item) => item.name === selec);
    //console.log(datos);

    let transferQrData = {};
    const { setData } = useContext(QrContex);

    if (
        datos.length > 0 &&
        datos[0].contract?.length > 0 &&
        watch("cantidad") > 0
    ) {
        transferQrData = {
            contract: datos[0].contract,
            chain: datos[0].chain,
            to: adress,
            amount: watch("cantidad"),
            decimals: datos[0].decimals,
            coin: watch("moneda"),
            network: framework,
        };
    }

    const disabled = JSON.stringify(transferQrData) !== "{}";

    return (
        <>
            <form className="container__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="available__red">
                    <h5>Network:</h5>
                    <div className="available__red__input">
                        <div>
                            <input
                                type="radio"
                                value="eth"
                                checked={framework === "eth" ? true : false}
                                {...register("eth", {
                                    onChange: cambioRadioButton,
                                })}
                            />
                            Ethereum
                        </div>
                        <div>
                            <input
                                type="radio"
                                value="matic"
                                checked={framework === "matic" ? true : false}
                                {...register("matic", {
                                    onChange: cambioRadioButton,
                                })}
                            />
                            Polygon
                        </div>
                        <div>
                            <input
                                type="radio"
                                value="bnb"
                                checked={framework === "bnb" ? true : false}
                                {...register("bnb", {
                                    onChange: cambioRadioButton,
                                })}
                            />
                            Binance
                        </div>
                    </div>
                </div>

                <hr />
                <div className="destination__adress">
                    <h5>{"Destination adress: " + adress + " "}</h5>

                    <i onClick={clickMe} {...register("cambiar")}>
                        {" "}
                        <FiSettings size="1.2rem" className="settings" />
                    </i>

                    {destinationAdress && (
                        <div className="destination__adress__settings">
                            <h5>New Address:</h5>
                            <input type="text" {...register("newAdress")} />
                            <button onClick={handleSubmit(new_adress)}>
                                Aceptar
                            </button>
                            <button
                                onClick={() => {
                                    setDestinationAdress(false);
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>

                <hr />
                <div className="amount">
                    <h5>Amount:</h5>
                    <input
                        type="number"
                        step="any"
                        min="0"
                        {...register("cantidad")}
                    />
                    <select
                        value={selec}
                        {...register("moneda", {
                            onChange: (e) => {
                                setSelec(e.target.value);
                            },
                        })}
                    >
                        {network.map((coin) => (
                            <option key={coin.contract} value={coin.name}>
                                {coin.name}
                            </option>
                        ))}
                    </select>
                </div>
                <hr />

                <div className="generate__qr">
                    <input
                        type="submit"
                        value="Generate QR"
                        disabled={!disabled}
                    />
                </div>
            </form>
        </>
    );
};

export default FormQr;
