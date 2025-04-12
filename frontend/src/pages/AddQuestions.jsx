import { useState, useEffect } from "react";
import axios from "axios";

const AddQuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [answer, setAnswer] = useState("");
  const [quizId, setQuizId] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quizzes for dropdown
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/institute/getQuizzes", {
          withCredentials: true,
        });
        setQuizzes(res.data.quizzes || []);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };
    fetchQuizzes();
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9000/api/institute/addquestion",
        {
          Question: question,
          Options: options,
          Answer: answer,
          Quiz: quizId,
        },
        { withCredentials: true }
      );
      alert("Question added successfully!");
      setQuestion("");
      setOptions(["", ""]);
      setAnswer("");
      setQuizId("");
      console.log(res)
    } catch (err) {
      console.error(err);
      alert("Failed to add question");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />

        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        ))}

        <button
          type="button"
          onClick={addOption}
          className="text-blue-600 text-sm"
        >
          + Add Option
        </button>

        <input
          type="text"
          placeholder="Correct Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />

        <select
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Select Quiz</option>
          {quizzes.map((quiz) => (
            <option key={quiz._id} value={quiz._id}>
              {quiz.Title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
