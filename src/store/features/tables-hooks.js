import { useSelector } from 'react-redux';

export const useGetAllTables = () =>
    useSelector((state) => state.tables.tables);

export const useGetAllBarSpots = () =>
    useSelector((state) => state.tables.barSpots);
export const useGetSelectedTableOrBarSpot = () =>
    useSelector((state) => state.tables.selectedTableOrBarSpot);
