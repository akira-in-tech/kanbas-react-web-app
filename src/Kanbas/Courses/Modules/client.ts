import axios from "axios";
import { Module } from "../../types";
import { REMOTE_SERVER } from "../../../config";

const axiosWithCredentials = axios.create({ withCredentials: true });
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const updateModule = async (module: Module): Promise<Module> => {
  const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return data;
};

export const deleteModule = async (moduleId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
};
