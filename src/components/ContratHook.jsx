import contract from "../../data.json";
import React from "react";

const ContratHook = (network) => {
    if (network === "eth") return contract[0].eth;
    if (network === "matic") return contract[0].matic;
    if (network === "bnb") return contract[0].bnb;
};

export default ContratHook;
