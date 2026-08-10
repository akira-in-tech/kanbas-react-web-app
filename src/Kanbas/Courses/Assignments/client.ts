import axios from "axios";
import { Assignment } from "../../types";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (
  courseId: string
): Promise<Assignment[]> => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/assignments`
  );
  return response.data;
};

export const createAssignment = async (
  courseId: string,
  assignment: Partial<Assignment>
): Promise<Assignment> => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const updateAssignment = async (
  assignmentId: string,
  assignment: Partial<Assignment>
): Promise<Assignment> => {
  const response = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignmentId}`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};

export const findAssignmentById = async (
  assignmentId: string
): Promise<Assignment> => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};
