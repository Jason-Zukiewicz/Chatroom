import { deleter } from './Utils';

const Purs = ({ purs, getPurs }) => {
	return (
	<div className="content-item">
		<h1>Purchases:</h1>
		<table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
          <th>DELETE</th>
        </tr>
      </thead>
			<tbody>
				{ Object.entries(purs).sort(date_sort)
          .map(([k, v]) => <Pur key={k} purID={k} {...v} getPurs={getPurs}/>) }
			</tbody>
		</table>
	</div>
	);
};

function date_sort(a, b) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}


const Pur = ({ purID, name, amount, date, cat, over, getPurs }) => {
	const deletePur = () => {
    deleter("purs/"+purID, {} , getPurs);
  };
  return (  
    <tr className={over ? "over":""}>
      <td>{name}</td>
      <td>{amount}</td>
      <td>{date}</td>
      <td>{cat}</td>
      <td><input type="button" value="DELETE" onClick={deletePur}/></td>
    </tr>
  );
};

export default Purs;