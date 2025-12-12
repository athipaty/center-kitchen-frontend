import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    outletName: '',
    sauce: '',
    quantity: '',
    deliveryDate: ''
  });

  // Fetch all orders
  useEffect(() => {
    axios.get('http://localhost:5000/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/orders', form)
      .then(res => {
        alert('Order submitted!');
        setOrders([...orders, res.data]);
        setForm({ outletName: '', sauce: '', quantity: '', deliveryDate: '' });
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kitchen Order Form</h1>
      <form onSubmit={handleSubmit}>
        <input name="outletName" placeholder="Outlet Name" value={form.outletName} onChange={handleChange} /><br />
        <input name="sauce" placeholder="Sauce" value={form.sauce} onChange={handleChange} /><br />
        <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} type="number" /><br />
        <input name="deliveryDate" placeholder="Delivery Date" value={form.deliveryDate} onChange={handleChange} /><br />
        <button type="submit">Send Order</button>
      </form>

      <h2>All Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            {order.outletName} ordered {order.quantity} of {order.sauce} for {order.deliveryDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
