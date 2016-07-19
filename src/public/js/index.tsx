/// <reference path="../../../typings/index.d.ts" />
import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/app.tsx";

async function main() {
    ReactDOM.render(
        <App/>,
        document.getElementById("root"));
}

main().catch(e => console.error(e.stack || e));
