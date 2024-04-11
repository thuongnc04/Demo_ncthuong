import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../reducer/carReducer";

export default configureStore({
    reducer: {
        listCar: carReducer
    }
})