import React from 'react';

const InvoicesDetail = ({ invoice }) => {
    const orderDetails = [
        { stt: 1, name: "Món 1", price: "200,000 ₫" },
        { stt: 2, name: "Món 2", price: "150,000 ₫" },
        { stt: 3, name: "Món 3", price: "300,000 ₫" },
        { stt: 4, name: "Món 4", price: "120,000 ₫" },
        { stt: 5, name: "Món 5", price: "250,000 ₫" },
        { stt: 6, name: "Món 6", price: "180,000 ₫" },
        { stt: 7, name: "Món 7", price: "210,000 ₫" },
        { stt: 8, name: "Món 8", price: "130,000 ₫" },
        { stt: 9, name: "Món 9", price: "190,000 ₫" },
        { stt: 10, name: "Món 10", price: "220,000 ₫" },
    ];

    const totalAmount = orderDetails.reduce((sum, item) => sum + parseInt(item.price.replace(/[^\d]/g, "")), 0);

    return (
        <div className="invoice-details">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Món</th>
                            <th>Giá Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((item, index) => (
                            <tr key={index}>
                                <td>{item.stt}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="total-amount">
                <strong>Tổng tiền:</strong> {totalAmount.toLocaleString()} ₫
            </div>
        </div>
    );
};

export default InvoicesDetail;
