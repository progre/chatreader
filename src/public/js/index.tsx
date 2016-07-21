/// <reference path="../../../typings/index.d.ts" />
import "babel-polyfill";
import * as React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./containers/app.tsx";
import reducer from "./reducer.ts";

async function main() {
    render(
        <Provider store={createStore(reducer)}>
            <App/>
        </Provider>,
        document.getElementById("root") !);
}

main().catch(e => console.error(e.stack || e));
