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

export const updateTable = async (id, isActive = false) => {
  try {
    const { data } = await axios.patch(`${baseURL}restaurant/${id}.json`, {
      isActive: isActive,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
