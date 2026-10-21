import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data";

const AddExpense = ({ onAdd }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || amount === "" || date === "") {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const value = Number(amount);
    if (!Number.isInteger(value) || value < 1000 || value > 100000000) {
      setMessage("Số tiền phải từ 1.000 đến 100.000.000");
      return;
    }

    onAdd({ title: title.trim(), amount: value, category, date });
    navigate("/expenses", { replace: true });
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="expense-title">Tên khoản chi</label>
          <input
            id="expense-title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="expense-amount">Số tiền</label>
          <input
            id="expense-amount"
            type="number"
            value={amount}
            onChange={({ target }) => setAmount(target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="expense-category">Danh mục</label>
          <select
            id="expense-category"
            value={category}
            onChange={({ target }) => setCategory(target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="expense-date">Ngày chi</label>
          <input
            id="expense-date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <button type="submit">Thêm</button>
      </form>
      {message && <p className="error">{message}</p>}
    </>
  );
};

export default AddExpense;
