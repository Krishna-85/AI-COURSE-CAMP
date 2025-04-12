import { useState, useEffect } from "react";
import axios from "axios";

const AddQuizForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");
  const [lecture, setLecture] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [marks, setMarks] = useState("");
  const [questions, setQuestions] = useState([]);
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    // Fetch available lectures
    const fetchLectures = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/institute/lecture",{
            withCredentials: true, //  cookie send karega
        }
            
        ); // change path accordingly
        

        setLectures(res.data.lectures);
      } catch (err) {
        console.error("Error fetching lectures:", err);
      }
    };

    fetchLectures();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        Title: title,
        Description: description,
        Duration: duration,
        Type: type,
        Lecture: lecture,
        Questions: questions,
        totalQuestions,
        Marks: marks,
      };
      const res = await axios.post("http://localhost:9000/api/institute/addQuiz", payload,
     { withCredentials: true });
      alert("Quiz added successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration (e.g. 30 min)"
          className="w-full p-2 border rounded-md"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type (e.g. MCQ)"
          className="w-full p-2 border rounded-md"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total Questions"
          className="w-full p-2 border rounded-md"
          value={totalQuestions}
          onChange={(e) => setTotalQuestions(e.target.value)}
        />
        <input
          type="number"
          placeholder="Marks"
          className="w-full p-2 border rounded-md"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />

        <select
          value={lecture}
          onChange={(e) => setLecture(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Lecture</option>
          {lectures.map((lec) => (
            <option key={lec._id} value={lec._id}>
              {lec.Title}
            </option>
          ))}
        </select>

        {/* Placeholder for questions (You can later integrate question form builder) */}
        <textarea
          placeholder="Optional: Add questions JSON"
          className="w-full p-2 border rounded-md"
          onChange={(e) => {
            try {
              const q = JSON.parse(e.target.value);
              setQuestions(q);
            } catch {
              console.log("Invalid JSON");
            }
          }}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Quiz
        </button>
      </form>
    </div>
  );
};

export default AddQuizForm;
