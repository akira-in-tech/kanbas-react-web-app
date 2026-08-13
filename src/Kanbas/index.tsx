import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import { useSelector } from "react-redux";
import * as courseClient from "./Courses/client";
import { RootState } from "./store";
import { Course } from "./types";

export default function Kanbas() {
  const [courses, setCourses] = useState<Course[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [course, setCourse] = useState<Course>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const addNewCourse = async () => {
    try {
      const newCourse = await courseClient.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error(error);
    }
  };

  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses(
        courses.map((c) => (c._id === course._id ? course : c))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const [enrolling, setEnrolling] = useState<boolean>(false);
  const findCoursesForUser = async () => {
    if (!currentUser) return;
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (!currentUser) return;
    try {
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }
      setCourses(
        courses.map((course) =>
          course._id === courseId ? { ...course, enrolled } : course
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async () => {
    if (!currentUser) return;
    try {
      const allCourses: Course[] = await courseClient.fetchAllCourses();
      const enrolledCourses: Course[] = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course) => {
        if (enrolledCourses.find((c) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, enrolling]);

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="Courses/:cid/*"
              element={<Courses courses={courses} />}
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
