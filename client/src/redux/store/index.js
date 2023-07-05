import { configureStore } from "@reduxjs/toolkit";

import reducersUser from "../features/data/dataUser.js";
import reducersAdmin from "../features/data/dataAdmin.js";

const store = configureStore({
    reducer: {
        dataUser: reducersUser,
        dataAdmin: reducersAdmin
    }
})

export default store;