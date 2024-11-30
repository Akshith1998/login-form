import { useState } from "react";
import { formData } from "./data";
import "./styles.css";

export default function App() {
  const [formItems, setFormItems] = useState(formData);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleOnChange = (e) => {
    const copyFormItems = formItems.map((item) => {
      if (item.id === e.target.id) {
        return {
          ...item,
          value: e.target.value,
          isError: e.target.value ? false : true,
        };
      } else return item;
    });
    validatePasswords(copyFormItems);
    setFormItems(copyFormItems);
  };

  const validateFormItems = (items) => {
    const copyFormItems = items.map((item) => {
      if (!item.value) return { ...item, isError: true };
      else return item;
    });
    setFormItems(copyFormItems);
    return copyFormItems.every((item) => !item.isError);
  };

  const validatePasswords = (items) => {
    let password;
    let confirmPassword;
    items.forEach((item) => {
      if (item.id === "password") password = item.value;
      else if (item.id === "confirmPassword") confirmPassword = item.value;
    });
    setPasswordsMatch(password === confirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFormItems(formItems);
    validatePasswords(formItems);
  };

  return (
    <form className="App" onSubmit={handleSubmit}>
      {formItems.map((item) => {
        return (
          <div key={item.id}>
            <label>{item.label}</label>
            <input
              id={item.id}
              type={item.type}
              value={item.value}
              placeholder={item.placeholder}
              onChange={handleOnChange}
            />
            {item.isError && <div>{item.errorMessage}</div>}
            {item.id === "confirmPassword" && !passwordsMatch && (
              <div>Passwords doesn't match</div>
            )}
          </div>
        );
      })}
      <button>Submit</button>
    </form>
  );
}
