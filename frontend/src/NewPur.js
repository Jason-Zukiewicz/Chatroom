import { useState } from 'react';
import { poster } from './Utils';

const NewPur = ({ getPurs,cats}) => {
	const [purName, setPurName] = useState("");
  const [purAmount, setPurAmount] = useState("");
  const [purDate, setPurDate] = useState("");
  const [purCat, setPurCat] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formJson = Object.fromEntries(formData.entries());
		poster("purs/", formJson, getPurs);
		setPurName("");
    setPurAmount("");
    setPurDate("");
    setPurCat("");
	};	

	return (
		<form onSubmit={handleSubmit}>
      <table>
        <tbody>
        <tr>
          <td>Name</td>
          <td><input type="text" name="name" value={purName} onChange={(e) => setPurName(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Amount</td>
          <td><input type="number" name="amount" value={purAmount} onChange={(e) => setPurAmount(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Date</td>
          <td><input type="date" name="date" value={purDate} onChange={(e) => setPurDate(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Category</td>
          <td>
            <select name="cat" value={purCat} onChange={(e) => setPurCat(e.target.value)}>
              { Object.entries(cats).map(([k, v]) => <Cat key={k} catID={k} {...v} />) }
            </select>
          </td>
        </tr>
        <tr>
          <td></td>
          <td><input type="submit" value="Submit" /></td>
        </tr>
        </tbody>
      </table>
		</form>
	);
};

const Cat = ({ catID, name, budget, getCats }) => {
  return (  
    <option value={name}>{name}</option>
  );
};

export default NewPur;