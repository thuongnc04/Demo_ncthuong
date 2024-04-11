import { createSlice } from '@reduxjs/toolkit'
import { addCarAPI, deleteCarAPI, updateCarAPI } from '../actions/carAction'

const initialState = {
    listCar: []
}


const carslice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        addCar(state, aciton) {
            state.listCar.push(aciton.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(addCarAPI.fulfilled, (state, action) => {
            console.log(1111, action.payload);
            console.log(action.payload);
            state.listCar.push(action.payload);
        })
            .addCase(addCarAPI.rejected, (state, action) => {
                console.log("ADD rejected: " + action.error.message);
            });

        builder.addCase(deleteCarAPI.fulfilled, (state, action) => {
            state.listCar = state.listCar.filter(row => row.id !== action.payload);
        });
        builder.addCase(updateCarAPI.fulfilled, (state, action) => {
            const { id, ten_xe_ph31749, mau_sac_ph31749, gia_ban_ph31749, mo_ta_ph31749, hinh_anh_ph31749 } = action.payload;
            console.log(id);
            const car = state.listCar.find(row => row.id == id);
            if (car) {
                car.ten_xe_ph31749 = ten_xe_ph31749;
                car.mau_sac_ph31749 = mau_sac_ph31749;
                car.gia_ban_ph31749 = gia_ban_ph31749;
                car.mo_ta_ph31749 = mo_ta_ph31749;
                car.hinh_anh_ph31749 = hinh_anh_ph31749;
            }
        })
    }
})

export const { addCar } = carslice.actions;
export default carslice.reducer;
