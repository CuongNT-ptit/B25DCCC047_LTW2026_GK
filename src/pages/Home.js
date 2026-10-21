import { formatMoney } from "../data";

const Home = ({ expenses }) => {
  const totalAmount = expenses.reduce((sum, { amount }) => sum + amount, 0);
  const unpaidAmount = expenses.reduce(
    (sum, { amount, paid }) => (paid ? sum : sum + amount),
    0
  );

  return (
    <div>
      <h1>Chi tiêu cá nhân</h1>
      <p>{`Tổng số khoản chi: ${expenses.length}`}</p>
      <p>{`Tổng số tiền đã chi: ${formatMoney(totalAmount)}`}</p>
      <p>{`Tổng số tiền chưa thanh toán: ${formatMoney(unpaidAmount)}`}</p>
    </div>
  );
};

export default Home;
