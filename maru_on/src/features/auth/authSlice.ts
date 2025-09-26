import { createSlice } from "@reduxjs/toolkit";

type AuthState = { token: string | null; role: string | null };
const initialState: AuthState = { token: null, role: null };

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (s, a) => { s.token = a.payload.token; s.role = a.payload.role ?? null; },
        clearAuth: (s) => { s.token = null; s.role = null; },
    },
});

export const { setAuth, clearAuth } = slice.actions;
export default slice.reducer;