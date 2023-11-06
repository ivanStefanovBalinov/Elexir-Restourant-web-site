import { configureStore } from '@reduxjs/toolkit';
import tablesSlice from './features/tables-slice';

export const store = configureStore({
    reducer: { tables: tablesSlice.reducer },
});
