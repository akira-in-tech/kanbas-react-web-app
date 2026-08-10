import axios from "axios";
import { Enrollment } from "../types";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const API_BASE = `${REMOTE_SERVER}/api`;

export const enrollUserInCourse = async (
  userId: string,
  courseId: string
): Promise<Enrollment> => {
  const response = await axiosWithCredentials.post(`${API_BASE}/enrollments`, {
    userId,
    courseId,
  });
  return response.data;
};

export const unenrollUserFromCourse = async (
  userId: string,
  courseId: string
): Promise<void> => {
  await axiosWithCredentials.delete(`${API_BASE}/enrollments`, {
    data: { userId, courseId },
  });
};

export const findEnrollmentsForUser = async (
  userId: string
): Promise<Enrollment[]> => {
  const response = await axiosWithCredentials.get(
    `${API_BASE}/users/${userId}/enrollments`
  );
  return response.data;
};

export const findEnrollmentsForCourse = async (
  courseId: string
): Promise<Enrollment[]> => {
  const response = await axiosWithCredentials.get(
    `${API_BASE}/courses/${courseId}/enrollments`
  );
  return response.data;
};
