import axios from "axios";
import { Course, Module, User } from "../types";
import { REMOTE_SERVER } from "../../config";

const axiosWithCredentials = axios.create({ withCredentials: true });

const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
};

export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: Partial<Module>
): Promise<Module> => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const findModulesForCourse = async (
  courseId: string
): Promise<Module[]> => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return response.data;
};

export const createCourse = async (course: Partial<Course>): Promise<Course> => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

export const findUsersForCourse = async (courseId: string): Promise<User[]> => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};
