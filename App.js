const BUILD_TAG = "mv-3358";
/* eslint-disable import/first */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ExpenseList from "./pages/ExpenseList";
import AddExpense from "./pages/AddExpense";
import ExpenseDetail from "./pages/ExpenseDetail";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadedRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem("gk_expenses"));
    } catch {
      saved = null;
    }

    if (Array.isArray(saved)) {
      setExpenses(saved);
      loadedRef.current = true;
      setLoading(false);
    } else {
      axios
        .get("/data/expenses.json", { signal: controller.signal })
        .then((res) => {
          if (!Array.isArray(res.data)) {
            throw new Error("Dữ liệu không hợp lệ");
          }
          setExpenses(res.data);
          loadedRef.current = true;
          setLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) return;
          setError("Không tải được dữ liệu");
          setLoading(false);
        });
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!loading && loadedRef.current) {
      localStorage.setItem("gk_expenses", JSON.stringify(expenses));
    }
  }, [expenses, loading]);

  const handleAdd = (data) => {
    setExpenses((prev) => {
      const nextId = prev.reduce((max, { id }) => Math.max(max, id), 0) + 1;
      return [...prev, { id: nextId, ...data, paid: false }];
    });
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTogglePaid = (id) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, paid: !item.paid } : item))
    );
  };

  return (
    <div className="app" data-build={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout loading={loading} error={error} />}>
          <Route index element={<Home expenses={expenses} />} />
          <Route
            path="expenses"
            element={
              <ExpenseList
                expenses={expenses}
                onToggle={handleTogglePaid}
                onDelete={handleDelete}
              />
            }
          />
          <Route path="expenses/new" element={<AddExpense onAdd={handleAdd} />} />
          <Route path="expenses/:id" element={<ExpenseDetail expenses={expenses} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
