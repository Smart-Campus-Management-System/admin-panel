import React, { useState } from "react";
import axios from "axios";

const AddSection = () => {
  const [sectionName, setSectionName] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [quiz, setQuiz] = useState([
    {
      questionText: "",
      options: [
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
      ],
    },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle changes in question text
  const handleQuizChange = (index, field, value) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[index][field] = value;
    setQuiz(updatedQuiz);
  };

  // Handle changes in option text
  const handleOptionChange = (quizIndex, optionIndex, field, value) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[quizIndex].options[optionIndex][field] = value;
    setQuiz(updatedQuiz);
  };

  // Handle change in isCorrect flag for options
  const handleCorrectOptionChange = (quizIndex, optionIndex) => {
    const updatedQuiz = [...quiz];
    const selectedOption = updatedQuiz[quizIndex].options[optionIndex];
    selectedOption.isCorrect = !selectedOption.isCorrect;
    setQuiz(updatedQuiz);
  };

  // Add a new question
  const addQuestion = () => {
    setQuiz([
      ...quiz,
      {
        questionText: "",
        options: [
          { optionText: "", isCorrect: false },
          { optionText: "", isCorrect: false },
          { optionText: "", isCorrect: false },
          { optionText: "", isCorrect: false },
        ],
      },
    ]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    const updatedQuiz = quiz.filter((_, i) => i !== index);
    setQuiz(updatedQuiz);
  };

  // Add an option to a question
  const addOption = (quizIndex) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[quizIndex].options.push({ optionText: "", isCorrect: false });
    setQuiz(updatedQuiz);
  };

  // Remove an option from a question
  const removeOption = (quizIndex, optionIndex) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[quizIndex].options = updatedQuiz[quizIndex].options.filter(
        (_, i) => i !== optionIndex
    );
    setQuiz(updatedQuiz);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validate that each question has at least one correct option
    const isValid = quiz.every((question) =>
        question.options.some((option) => option.isCorrect)
    );

    if (!isValid) {
      setMessage("Each question must have at least one correct option.");
      setLoading(false);
      return;
    }

    const sectionData={
      sectionName:sectionName,
      videoFile:videoFile,
      quiz:quiz



    }
    const token=localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:4000/api/v1/sections/add",
        sectionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
    );

    console.log(response);

    // Simulating API call
    setTimeout(() => {
      setMessage("Section added successfully!");
      setLoading(false);
    }, 1500);
  };


  return (
      <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen">
        <div className="p-4">
          <div className="mx-auto max-w-4xl">
            <header className="mb-6 p-4 border-b border-cyan-600/20">
              <h1 className="text-2xl font-bold text-white">Add New Section</h1>
              <p className="text-gray-300 text-sm">
                Fill in the form below to add a new section
              </p>
            </header>

            <div className="bg-white/5 rounded-lg border border-cyan-500/20 shadow-lg shadow-cyan-500/10 backdrop-blur-sm overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="sectionName" className="block text-gray-200 text-sm font-medium">
                    Section Name
                  </label>
                  <input
                      type="text"
                      id="sectionName"
                      value={sectionName}
                      onChange={(e) => setSectionName(e.target.value)}
                      placeholder="Enter section name"
                      className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                      required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="videoFile" className="block text-gray-200 text-sm font-medium">
                    Video URL (Required)
                  </label>
                  <input
                      type="url"
                      id="videoFile"
                      value={videoFile}
                      onChange={(e) => setVideoFile(e.target.value)}
                      placeholder="Enter video URL"
                      className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                      required
                  />
                </div>

                <div className="space-y-6">
                  {quiz.map((question, quizIndex) => (
                      <div key={quizIndex} className="p-4 border border-gray-700 rounded-lg bg-gray-800/30 space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-gray-200 font-medium">
                            Question {quizIndex + 1}
                          </label>
                          {quiz.length > 1 && (
                              <button
                                  type="button"
                                  onClick={() => removeQuestion(quizIndex)}
                                  className="text-red-400 text-sm hover:text-red-300"
                              >
                                Remove Question
                              </button>
                          )}
                        </div>

                        <input
                            type="text"
                            value={question.questionText}
                            onChange={(e) => handleQuizChange(quizIndex, "questionText", e.target.value)}
                            placeholder="Enter question text"
                            className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                            required
                        />

                        <div className="space-y-3">
                          {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-3">
                                <input
                                    type="text"
                                    value={option.optionText}
                                    onChange={(e) =>
                                        handleOptionChange(quizIndex, optionIndex, "optionText", e.target.value)
                                    }
                                    placeholder={`Option ${optionIndex + 1}`}
                                    className="flex-1 p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                                    required
                                />
                                <label className="flex items-center space-x-2 text-gray-300">
                                  <input
                                      type="checkbox"
                                      checked={option.isCorrect}
                                      onChange={() => handleCorrectOptionChange(quizIndex, optionIndex)}
                                      className="rounded border-gray-500 text-cyan-500 focus:ring-cyan-500/50"
                                  />
                                  <span className="text-sm">Correct</span>
                                </label>
                                {question.options.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOption(quizIndex, optionIndex)}
                                        className="text-red-400 text-sm hover:text-red-300"
                                    >
                                      Remove
                                    </button>
                                )}
                              </div>
                          ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => addOption(quizIndex)}
                            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors duration-200"
                        >
                          Add Option
                        </button>
                      </div>
                  ))}
                </div>

                <button
                    type="button"
                    onClick={addQuestion}
                    className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors duration-200"
                >
                  Add Question
                </button>

                <div className="pt-6 border-t border-gray-700">
                  <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors duration-200 font-medium flex items-center justify-center"
                  >
                    {loading ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></span>
                          Adding Section...
                        </>
                    ) : (
                        "Add Section"
                    )}
                  </button>
                </div>
              </form>

              {message && (
                  <div className="px-6 pb-6">
                    <div className={`p-3 rounded-lg text-center ${message.includes("error") ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"}`}>
                      {message}
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default AddSection;
