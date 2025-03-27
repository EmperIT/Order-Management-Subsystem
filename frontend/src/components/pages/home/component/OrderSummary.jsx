import "../styles/OrderSummary.css";

const OrderSummary = () => {
  return (
    <div className="order-summary">
      <table>
        <tbody>
          <tr>
            <td>Tổng tiền</td>
            <td className="right">450.000</td>
          </tr>
          <tr>
            <td>Thuế</td>
            <td className="right">10%</td>
          </tr>

          <tr className="total-row">
            <td><strong>Tổng thanh toán</strong></td>
            <td className="total-right"><strong>500.000 đ</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummary;
