// src/Kanbas/types.ts

export interface User {
  _id: string;
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role?: "STUDENT" | "TA" | "FACULTY" | "ADMIN" | "USER";
  section?: string;
  loginId?: string;
  lastActivity?: string;
  totalActivity?: string;
}

export interface Course {
  _id: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  image?: string;
  enrolled?: boolean;
}

export interface Lesson {
  _id: string;
  name: string;
  module?: string;
}

export interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

export interface Assignment {
  _id: string;
  title: string;
  description?: string;
  points?: number;
  group?: string;
  gradeDisplay?: string;
  submissionType?: string;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
  course: string;
}

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}
