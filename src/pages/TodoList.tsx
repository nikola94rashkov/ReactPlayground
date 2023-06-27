import { useState } from "react";

export type Item = {
  id: number;
  text: string;
  done: boolean;
};

export type State = {
  items: Map<number, Item>;
};

export const TodoList = () => {
  const [text, setText] = useState<string>("");
  const [state, setState] = useState<State>({
    items: new Map(),
  });

  const addItem = (text: string) => {
    setState((state) => {
      const id = Date.now();
      const item: Item = { id, text, done: false };

      const items = new Map(state.items).set(id, item);

      return { ...state, items };
    });
  };

  const toggleItem = (id: number) => {
    setState((state) => {
      const item = state.items.get(id);

      if (!item) {
        return state;
      }

      const newItem = { ...item, done: !item.done };

      const items = new Map(state.items).set(id, newItem);

      return { ...state, items };
    });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Type new item"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => addItem(text)}>Add Item</button>

      <h2>To do list</h2>

      <ul>
        {[...state.items.values()].map((item) => (
          <li key={item.id}>
            {item.done ? <s>{item.text}</s> : <span>{item.text}</span>}

            <br />

            <span>{item.id}</span>

            <br />

            <button onClick={() => toggleItem(item.id)}>toggle</button>
          </li>
        ))}
      </ul>
    </>
  );
};
