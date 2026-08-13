import axios from "axios";
import { Course, User } from "../types";
import { REMOTE_SERVER } from "../../config";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: Partial<User>): Promise<User> => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};
export const signup = async (user: Partial<User>): Promise<User> => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};
export const updateUser = async (user: User): Promise<User> => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};
export const profile = async (): Promise<User> => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};
export const signout = async (): Promise<void> => {
  await axiosWithCredentials.post(`${USERS_API}/signout`);
};
export const findMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};
export const createCourse = async (course: Partial<Course>): Promise<Course> => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};
export const findAllUsers = async (): Promise<User[]> => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};
export const findUsersByRole = async (role: string): Promise<User[]> => {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};
export const findUsersByPartialName = async (name: string): Promise<User[]> => {
  const response = await axios.get(`${USERS_API}?name=${name}`);
  return response.data;
};
export const findUserById = async (id: string): Promise<User> => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};
export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`${USERS_API}/${userId}`);
};
export const createUser = async (user: Partial<User>): Promise<User> => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};
export const findCoursesForUser = async (userId: string): Promise<Course[]> => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/courses`
  );
  return response.data;
};
export const enrollIntoCourse = async (userId: string, courseId: string): Promise<void> => {
  await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
};
export const unenrollFromCourse = async (userId: string, courseId: string): Promise<void> => {
  await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
};
