import { useState, useEffect } from 'react';
import { getter } from './Utils';
import Cats from './Cats';
import NewCat from './NewCat';

import Purs from './Purs';
import NewPur from './NewPur';

import './App.css';

const ToggleToggle = ({getCats, getPurs, cats}) => {
	const [catToggle, setCatToggle] = useState(false);
	const [purToggle, setPurToggle] = useState(false);
	

	const handleCatClick = () => {
		setCatToggle(!catToggle);
		setPurToggle(false);
	};
	const handlePurClick = () => {
		setPurToggle(!purToggle);
		setCatToggle(false);
	};


	return(
		<div> 
			<button onClick={handleCatClick} className={catToggle ? "button-on":"button-off"}>{catToggle ? 'Hide Category' : 'New Category'}</button>
			<button onClick={handlePurClick} className={purToggle ? "button-on":"button-off"}>{purToggle ? 'Hide Purchase' : 'New Purchase'}</button>
			{catToggle ? <NewCat getCats={getCats} />  : null}
			{purToggle ? <NewPur getPurs={getPurs} cats={cats} />  : null}
		</div>
	);
}

const App = () => {
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState(null);

  const [cats, setCats] = useState(null);
	useEffect(() => {getCats();}, []);
	const getCats = () => { getter("cats/", setCats, setLoading, setErr); };

  const [purs, setPurs] = useState(null);
	useEffect(() => {getPurs();}, []);
	const getPurs = () => { getter("purs/", setPurs, setLoading, setErr); };


	return (
	<div className="App">
		{ loading && <p>Loading..purchases = Purchase.query.order_by(Purchase.date.desc(), Purchase.id.desc()).all().</p> }
		{ err && <p>Failed to load!</p> }

		<div className="toggles">
			<ToggleToggle getCats={getCats} getPurs={getPurs} cats={cats}/>
		</div>
		<hr />
		<div className="content">
		{ !loading && cats && <Cats cats={cats} getCats={getCats}/> }
    { !loading && purs && <Purs purs={purs} getPurs={getPurs}/> }
		</div>
	</div>
	);
};

export default App;