import './App.css';
import react from 'react'
import BubbleSort from './sorts/bubbleSort'

function App() {

  const sorts = [
    {
      label: 'Tri à bulle',
      value: 'bubbleSort'
    },
    {
      label: 'Tri rapide',
      value: 'quickSort'
    }
  ]

  const [intervalPause, setIntervalPause] = react.useState(undefined)
  const [nbElement, setNbElement] = react.useState(10);
  const [generated, setGenerated] = react.useState(false);
  const [paused, setPaused] = react.useState(true);
  const [sortSelected, setSortSelected] = react.useState("bubbleSort");
  const [speed, setSpeed] = react.useState(500);
  const [forward, setForward] = react.useState(false);
  const [step, setStep] = react.useState(false);
  const [end, setEnd] = react.useState(false);

  react.useEffect(() => {
    setStep(step => !step)
  }, [forward])
  
  react.useEffect(() => {
    if(paused || end){
      clearInterval(intervalPause)
    } else {
      setIntervalPause(setInterval(() => {
        setStep(step => !step)
      }, speed))
    }
  }, [paused])

  react.useEffect(() => {
    if(!paused){
      clearInterval(intervalPause)
      setIntervalPause(setInterval(() => {
        setStep(step => !step)
      }, speed))
    }
  }, [speed])

  react.useEffect(() => {
    if(end) {
      clearInterval(intervalPause)
    }
  }, [end])

  return (
    <>
      <aside>
        <div>
          <div className="wrapperSettings">
            <h1>Settings</h1>
            { (generated &&
              <>
                <p>Nombre de colonnes à trier : {nbElement}</p>
                <p>Tri : {sorts.find(e => e.value === sortSelected).label}</p>
              </>
            ) || (
              <>
                <input 
                  name="nbElement"
                  type="number"
                  value={nbElement} 
                  onChange={e => {
                    if(e.target.value && e.target.value >= 5 && e.target.value <= 100){
                      setNbElement(parseInt(e.target.value))
                    }
                  }}
                />
                <select value={sortSelected} onChange={e => {
                  setSortSelected(e.target.value)
                }}>
                  { sorts.map(e => (
                    <option key={e.value} value={e.value}>{e.label}</option>
                  ))}
                </select>
              </>
            )}
          </div>
          <div className="wrapperButtons">
              { (!generated &&
                <button 
                  id="launch"
                  onClick={e => {
                    setGenerated(true)
                  }}
                >Générer</button>
              ) || (
                <>
                  <input type="range" value={1000 - speed} className="speed" name="speed" min="1" max="1000" onChange={e => {
                    setSpeed(1000 - parseInt(e.target.value))
                  }}/>
                  <div>
                    <svg className="stop" x="0px" y="0px" width="438.536px" height="438.536px" viewBox="0 0 438.536 438.536" onClick={e => {
                      setPaused(true);
                      setGenerated(false);
                      clearInterval(intervalPause)
                      setEnd(false)
                    }}>
                      <path d="M414.41,24.123C398.333,8.042,378.963,0,356.315,0H82.228C59.58,0,40.21,8.042,24.126,24.123
                        C8.045,40.207,0.003,59.576,0.003,82.225v274.084c0,22.647,8.042,42.018,24.123,58.102c16.084,16.084,35.454,24.126,58.102,24.126
                        h274.084c22.648,0,42.018-8.042,58.095-24.126c16.084-16.084,24.126-35.454,24.126-58.102V82.225
                        C438.532,59.576,430.49,40.204,414.41,24.123z"/>
                    </svg>
                    {( !paused && 
                    <svg className={"pause" + (end ? ' disable' : '')} x="0px" y="0px" width="792px" height="792px" viewBox="0 0 792 792" onClick={e => {
                      setPaused(true);
                    }}>
                      <path d="M282.856,0H169.714c-31.228,0-56.571,25.344-56.571,56.571v678.857c0,31.228,25.344,56.571,56.571,56.571h113.143
                        c31.256,0,56.572-25.315,56.572-56.571V56.571C339.428,25.344,314.112,0,282.856,0z M622.285,0H509.143
                        c-31.256,0-56.572,25.344-56.572,56.571v678.857c0,31.228,25.316,56.571,56.572,56.571h113.143
                        c31.256,0,56.572-25.315,56.572-56.571V56.571C678.857,25.344,653.541,0,622.285,0z"/>
                      </svg>
                    ) || (
                      <svg className={"play" + (end ? ' disable' : '')} x="0px" y="0px" width="163.861px" height="163.861px" viewBox="0 0 163.861 163.861" onClick={e => {
                        setPaused(false);
                      }}>
                        <path d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275
                          c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"/>
                      </svg>
                    )}
                    <svg className={"forward" + (end ? ' disable' : '')} x="0px" y="0px" viewBox="0 0 416.004 416.004" onClick={() => {
                      setForward(!forward);
                    }} >
                      <path d="M281.602,195.204l-256-192C20.802-0.444,14.274-1.02,8.866,1.7c-5.44,2.72-8.864,8.256-8.864,14.304v384
                        c0,6.048,3.424,11.584,8.832,14.304c2.272,1.12,4.736,1.696,7.168,1.696c3.392,0,6.784-1.088,9.6-3.2l256-192
                        c4.032-3.008,6.4-7.776,6.4-12.8S285.634,198.212,281.602,195.204z"/>
                      <path d="M400.002,0.004h-32c-8.832,0-16,7.168-16,16v384c0,8.832,7.168,16,16,16h32c8.832,0,16-7.168,16-16v-384
                        C416.002,7.172,408.834,0.004,400.002,0.004z"/>
                    </svg>
                  </div>
                </>
              ) 
            }
          </div>
        </div>
      </aside>
      <main>

        { generated && sortSelected === "bubbleSort" && (
          <BubbleSort
            nbElement={nbElement}
            step={step}
            end={end}
            setEnd={setEnd}
          />
        )}
      </main>
    </>
  );
}

export default App;
