import axios from "axios";

const baseURL =
  "https://new-project-d3d31-default-rtdb.europe-west1.firebasedatabase.app/";

export const fetchTables = async () => {
  try {
    const { data } = await axios.get(`${baseURL}restaurant.json`);
    const res = data
      ? Object.entries(data).map(([id, table]) => ({ id, ...table }))
      : [];
    return res;
  } catch (error) {
    throw error;
  }
};

export const addTable = async (tableNumber) => {
  try {
    const { data } = await axios.post(`${baseURL}restaurant.json`, {
      tableNumber: tableNumber,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const addQuery = async (number) => {
  try {
    const { data } = await axios.post(`${baseURL}query.json`, {
      tableNumber: number,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchQueries = async () => {
  try {
    const { data } = await axios.get(`${baseURL}query.json`);
    const res = data
      ? Object.entries(data).map(([id, table]) => ({ id, ...table }))
      : [];
    return res;
  } catch (error) {
    throw error;
  }
};
