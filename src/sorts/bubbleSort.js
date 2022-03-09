import react from 'react'

var App = (arg) => {

	const {
		nbElement,
		step,
		setEnd,
		end
	} = arg

	const [elements, setElements] = react.useState(new Array(nbElement).fill().map((e,i) => i+1).sort((a, b) => 0.5 - Math.random()));
	const [max, setMax] = react.useState(nbElement - 1)
	const [position, setPosition] = react.useState(0)
	const [watched, setWatched] = react.useState([0,1])
	const [isEnded, setIsEnded] = react.useState(true)

	const bubbleSort = () => {
		if(elements){
			var endt = true;
			if(elements[position] > elements[position + 1]){
				setIsEnded(false)
				endt = false
				setElements(elements => {
					var tab;
					tab = [...elements];
					[tab[position], tab[position + 1]] = [tab[position + 1], tab[position]];
					return tab;
				})
			}
			if(position + 1 === max){
				if(isEnded && endt){
					setEnd(true)
				}
				setIsEnded(true)
				setPosition(0)
				setMax(max => max - 1)
				setWatched([0,1])
			} else {
				setPosition(position => position + 1)
				setWatched(watched => [watched[0] + 1, watched[1] + 1])
			}
		}
	}

	const firstUpdate = react.useRef(true)
	react.useEffect(() => {
		if(firstUpdate.current){
			firstUpdate.current = false;
			return;
		} 
		if(max === 0){
			setEnd(true)
			return;
		}
		bubbleSort()
		
	}, [step])
	
	return (
		<>
			{
				elements.map((element, i) => (
				<div 
					key={element} 
					style={{
					height: element / elements.length * 100 + "%",
					backgroundColor: "hsl(196, 68%, " + (100 - (element / elements.length * 40 + 25)) + "%)"
					}} 
					className="element"
				>
					{ watched.includes(i) && !end && (
						<div>

						</div>
					)}
				</div>
				))
			}
		</>
	)
}

export default App