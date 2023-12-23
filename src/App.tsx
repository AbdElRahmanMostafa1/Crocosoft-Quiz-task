import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout";
import { AddEditQuiz, NotFound, AllQuizzes, Quiz } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllQuizzes />} />
          <Route path="add-quiz" element={<AddEditQuiz />} />
          <Route path="edit-quiz/:id" element={<AddEditQuiz />} />
          <Route path="quiz/:id" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
