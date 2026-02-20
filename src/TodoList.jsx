import { useState } from 'react';

export default function TodoList() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const addItem = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setItems((prev) => [...prev, text.trim()]);
    setText('');
  };

  return (
    <div className="todo">
      <h2>สิ่งที่ต้องทำ</h2>
      <form onSubmit={addItem}>
        <input
          placeholder="สิ่งที่ต้องทำ"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">เพิ่ม</button>
      </form>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
