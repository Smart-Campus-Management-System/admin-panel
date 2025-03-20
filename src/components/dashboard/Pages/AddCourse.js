import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Header from "../Header";
import "./styles/AddCourse.css";

const AddCourse = () => {
  const [course, setCourse] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [formStep, setFormStep] = useState(1); // To track form steps

  // Fetch sections from the API
  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/v1/sections");

        const sectionOptions = response.data.data.map((section) => ({
          value: section._id,
          label: section.sectionName || "Unnamed Section",
        }));

        setSections(sectionOptions);
      } catch (error) {
        setError("Failed to load sections.");
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess("");

    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication required. Please log in.");
      setLoading(false);
      return;
    }

    if (!category) {
      setError("Please enter a category.");
      setLoading(false);
      return;
    }

    // Split tags by commas, trim spaces, and filter out empty tags
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    if (tagsArray.length === 0) {
      setError("Please enter at least one tag.");
      setLoading(false);
      return;
    }

    try {
      const courseData = {
        courseName: course,
        category: category,
        tag: tagsArray,
        courseContent: selectedSections.map((section) => section.value),
      };

      // Sending POST request to add course
      const response = await axios.post(
        "http://localhost:4000/api/v1/courses/add",
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const newNotification = {
          message: 'Added new cource "' + courseData.courseName+ '" ', 
          status: 'unread'
        }
        const response = await axios.post('http://localhost:4000/api/v1/notifications',
          newNotification,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        setSuccess("Course added successfully!");
        setCourse("");
        setCategory("");
        setTags("");
        setSelectedSections([]);
        setFormStep(1);
      }
    } catch (error) {
      if (error.response && error.response.data.message === "Course name must be unique.") {
        setError("Course name already exists. Please choose a different name.");
      } else {
        setError(error.response ? error.response.data.message : "An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (formStep === 1 && !course) {
      setError("Please enter a course name.");
      return;
    }

    if (formStep === 2 && !category) {
      setError("Please enter a category.");
      return;
    }

    setError(null);
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setError(null);
    setFormStep(formStep - 1);
  };

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#00bcd4',
      },
      padding: '4px',
      borderRadius: '8px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#2a2d3a',
      borderRadius: '8px',
      overflow: 'hidden',
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#00bcd4' : state.isFocused ? 'rgba(0, 188, 212, 0.1)' : 'transparent',
      color: state.isSelected ? 'white' : '#e0e0e0',
      '&:hover': {
        backgroundColor: state.isSelected ? '#00bcd4' : 'rgba(0, 188, 212, 0.2)',
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(0, 188, 212, 0.2)',
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#e0e0e0',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#e0e0e0',
      '&:hover': {
        backgroundColor: 'rgba(244, 67, 54, 0.3)',
        color: '#f44336',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a0a0a0',
    }),
    input: (provided) => ({
      ...provided,
      color: '#e0e0e0',
    }),
  };

  return (
    <div className="main">

      <div className="add-course-container">
        <div className="form-container">
          <div className="form-header">
            <h1 className="form-title">Add New Course</h1>
            <p className="form-subtitle">Create and publish a new course for students</p>
          </div>

          {/* Form steps progress */}
          <div className="form-progress">
            <div className={`progress-step ${formStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span className="step-text">Basic Info</span>
            </div>
            <div className="step-connector"></div>
            <div className={`progress-step ${formStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span className="step-text">Category & Tags</span>
            </div>
            <div className="step-connector"></div>
            <div className={`progress-step ${formStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span className="step-text">Course Content</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="course-form">
            {/* Step 1: Basic Course Info */}
            {formStep === 1 && (
              <div className="form-step">
                <div className="input-group">
                  <label htmlFor="course">Course Name</label>
                  <input
                    type="text"
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="Enter a descriptive name for your course"
                    required
                  />
                  <p className="input-hint">Choose a name that clearly describes what your course teaches</p>
                </div>

                <div className="form-navigation">
                  <button type="button" className="next-btn" onClick={nextStep}>
                    Next <span className="btn-icon">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Category and Tags */}
            {formStep === 2 && (
              <div className="form-step">
                <div className="input-group">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Programming, Design, Business"
                    required
                  />
                  <p className="input-hint">Choose a main category for your course</p>
                </div>

                <div className="input-group">
                  <label htmlFor="tags">Tags (separate by commas)</label>
                  <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. javascript, web development, beginner"
                    required
                  />
                  <p className="input-hint">Add relevant tags to help students find your course</p>
                </div>

                <div className="form-navigation">
                  <button type="button" className="back-btn" onClick={prevStep}>
                    <span className="btn-icon">←</span> Back
                  </button>
                  <button type="button" className="next-btn" onClick={nextStep}>
                    Next <span className="btn-icon">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Course Content */}
            {formStep === 3 && (
              <div className="form-step">
                <div className="input-group">
                  <label htmlFor="sections">Course Sections</label>
                  <Select
                    isMulti
                    name="sections"
                    options={sections}
                    value={selectedSections}
                    onChange={setSelectedSections}
                    className="sections-select"
                    placeholder="Select sections to include in this course"
                    isLoading={loading}
                    styles={customSelectStyles}
                    noOptionsMessage={() => "No sections available"}
                  />
                  <p className="input-hint">Select all sections that should be included in this course</p>
                </div>

                <div className="form-navigation">
                  <button type="button" className="back-btn" onClick={prevStep}>
                    <span className="btn-icon">←</span> Back
                  </button>
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner"></span>
                        <span>Processing...</span>
                      </>
                    ) : (
                      "Create Course"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Error and Success Messages */}
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
