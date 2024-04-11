import { createAsyncThunk } from '@reduxjs/toolkit'
import { addCar } from '../reducer/carReducer'

const api_url = 'http://10.0.2.2:3000/XeMay';

export const fetchCars = () => {
    return async dispatch => {
        try {
            const response = await fetch(api_url);
            const data = await response.json();
            // console.log(data);

            data.forEach(row => {
                dispatch(addCar(row));
            });
        } catch (error) {
            console.log('error fetch data: ' + error);
        }
    }
};

export const addCarAPI = createAsyncThunk(
    'car/addCarAPI',
    async (obj, thunkAPI) => {
        try {
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            const data = await response.json();
            if (response.ok) {
                return data;

            } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteCarAPI = createAsyncThunk(
    'car/deleteCarAPI',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(api_url + '/' + id, {
                method: 'DELETE'
            });
            if (response.ok) {
                return id;
            } else {
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const updateCarAPI = createAsyncThunk(
    'car/updateCarAPI',
    async (objupdate, thunkAPI) => {
        try {
            console.log(objupdate);
            const response = await fetch(api_url + "/" + objupdate.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objupdate.data),
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                const errData = await response.json();
                return thunkAPI.rejectWithValue(errData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)