import { deleter } from './Utils';

const Cats = ({ cats, getCats }) => {
	return (
	<div className="content-item">
		<h1>Categories:</h1>
		<table>
		<thead>
        <tr>
          <th>Name</th>
          <th>Budget</th>
					<th>DELETE</th>
        </tr>
      </thead>
			<tbody>
				{ Object.entries(cats).map(([k, v]) => <Cat key={k} catID={k} {...v} getCats={getCats}/>) }
			</tbody>
		</table>
	</div>
	);
};

const Cat = ({ catID, name, budget, getCats }) => {
	const deleteCat = () => {
    deleter("cats/"+catID, {} , getCats);
  };
  return (  
    <tr>
      <td>{name}</td>
      <td>{budget}</td>
      <td><input type="button" value="DELETE" onClick={deleteCat}/></td>
    </tr>
  );
};

export default Cats;