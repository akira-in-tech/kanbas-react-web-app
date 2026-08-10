import axios from "axios";
import { Module } from "../../types";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const updateModule = async (module: Module): Promise<Module> => {
  const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return data;
};

export const deleteModule = async (moduleId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
};
