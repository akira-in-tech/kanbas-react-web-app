import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment as updateAssignmentAction } from "./reducer";
import * as assignmentsClient from "./client";
import { Assignment } from "../../types";

export default function AssignmentEditor() {
  const { cid = "", aid } = useParams<{ cid: string; aid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const [assignment, setAssignment] = useState<Assignment>({
    _id: aid === "New" ? "" : aid || "",
    title: "",
    description: "",
    points: 100,
    group: "assignments",
    gradeDisplay: "percentage",
    submissionType: "online",
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  });

  useEffect(() => {
    const fetchAssignment = async () => {
      if (aid && aid !== "New") {
        try {
          const fetchedAssignment = await assignmentsClient.findAssignmentById(aid);
          setAssignment(fetchedAssignment);
        } catch (err) {
          console.error(err);
          setError("Unable to load this assignment. Please try again.");
        }
      }
    };
    fetchAssignment();
  }, [aid]);

  const save = async () => {
    try {
      if (aid === "New") {
        const newAssignment = await assignmentsClient.createAssignment(cid, assignment);
        dispatch(addAssignment(newAssignment));
      } else {
        await assignmentsClient.updateAssignment(assignment._id, assignment);
        dispatch(updateAssignmentAction(assignment));
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } catch (err) {
      console.error(err);
      setError("Unable to save this assignment. Please try again.");
    }
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4 p-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        {/* Assignment Name */}
        <div className="mb-4">
          <label htmlFor="wd-name" className="form-label fw-bold">
            Assignment Name
          </label>
          <input
            id="wd-name"
            className="form-control"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </div>

        {/* Description Frame */}
        <div className="mb-4">
          <textarea
            id="wd-description"
            className="form-control"
            rows={6}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </div>

        {/* Points and Assignment Group */}
        <div className="row mb-4">
          <div className="col-md-3 d-flex align-items-center">
            <label htmlFor="wd-points" className="form-label fw-bold mb-0">
              Points
            </label>
          </div>
          <div className="col-md-9">
            <input
              id="wd-points"
              type="number"
              className="form-control"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-3 d-flex align-items-center">
            <label htmlFor="wd-group" className="form-label fw-bold mb-0">
              Assignment Group
            </label>
          </div>
          <div className="col-md-9">
            <select
              id="wd-group"
              className="form-select"
              value={assignment.group}
              onChange={(e) =>
                setAssignment({ ...assignment, group: e.target.value })
              }
            >
              <option value="assignments">ASSIGNMENTS</option>
            </select>
          </div>
        </div>

        {/* Display Grade as */}
        <div className="row mb-4">
          <div className="col-md-3 d-flex align-items-center">
            <label
              htmlFor="wd-grade-display"
              className="form-label fw-bold mb-0"
            >
              Display Grade as
            </label>
          </div>
          <div className="col-md-9">
            <select
              id="wd-grade-display"
              className="form-select"
              value={assignment.gradeDisplay}
              onChange={(e) =>
                setAssignment({ ...assignment, gradeDisplay: e.target.value })
              }
            >
              <option value="percentage">Percentage</option>
            </select>
          </div>
        </div>

        {/* Submission Type Section */}
        <div className="row mb-4 align-items-start">
          <div className="col-md-3">
            <label
              htmlFor="wd-submission-type"
              className="form-label fw-bold mb-0"
            >
              Submission Type
            </label>
          </div>
          <div className="col-md-9">
            <div className="card p-3">
              <select
                id="wd-submission-type"
                className="form-select mb-3"
                value={assignment.submissionType}
                onChange={(e) =>
                  setAssignment({ ...assignment, submissionType: e.target.value })
                }
              >
                <option value="online">Online</option>
              </select>

              <label className="form-label fw-bold">Online Entry Options</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="website-url"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="website-url">
                  Website URL
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Assign Section */}
        <div className="row mb-4 align-items-start">
          <div className="col-md-3">
            <label htmlFor="wd-assign-to" className="form-label fw-bold mb-0">
              Assign
            </label>
          </div>
          <div className="col-md-9">
            <div className="card p-3">
              {/* Assign to */}
              <label htmlFor="wd-assign-to" className="form-label fw-bold">
                Assign to
              </label>
              <div className="border p-2 mb-3">
                <span className="badge bg-light text-dark me-1">
                  Everyone{" "}
                  <button
                    type="button"
                    className="btn-close btn-sm"
                    aria-label="Remove"
                  ></button>
                </span>
              </div>

              {/* Due Date */}
              <label htmlFor="wd-due-date" className="form-label fw-bold">
                Due
              </label>
              <input
                id="wd-due-date"
                type="datetime-local"
                className="form-control mb-3"
                value={assignment.dueDate}
                onChange={(e) =>
                  setAssignment({ ...assignment, dueDate: e.target.value })
                }
              />

              {/* Available From and Until */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Available from</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={assignment.availableFrom}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableFrom: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Until</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={assignment.availableUntil}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableUntil: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end">
          <Link
            to={`/Kanbas/Courses/${cid}/Assignments`}
            type="button"
            className="btn btn-outline-secondary me-3"
          >
            Cancel
          </Link>
          <button type="submit" className="btn btn-danger">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
