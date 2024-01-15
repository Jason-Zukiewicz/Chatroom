import { useState } from 'react';
import { poster } from './Utils';

const NewCat = ({ getCats }) => {
	const [catName, setCatName] = useState("");
  const [catBudget, setCatBudget] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formJson = Object.fromEntries(formData.entries());
		poster("cats/", formJson, getCats);
		setCatName("");
    setCatBudget("");
	};	

	return (
		<form onSubmit={handleSubmit}>
      <table>
        <tbody>
        <tr>
          <td>Name</td>
          <td><input type="text" name="name" value={catName} onChange={(e) => setCatName(e.target.value)} /></td>
        </tr>
        <tr>
          <td>Budget</td>
          <td><input type="number" name="budget" value={catBudget} onChange={(e) => setCatBudget(e.target.value)} /></td>
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

export default NewCat;