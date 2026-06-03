import {cleat} from "../../components/scene" 
import {barAnimation} from "../../functional/barAnimation"
import { useEffect, useState, useRef } from "react"
import {scrollTo} from "../../functional/scrollTo"
import {textAnimations} from "../../functional/textAnimations"
import {changeModel} from "../../components/scene"
import Lenis from "lenis"

export default function MainPage() {
  sessionStorage.setItem('scrollTop','0')
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(()=>{

    const lenis = new Lenis()

    function raf(time:number){
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)


    const cleanup = cleat(containerRef.current as HTMLElement)
    const cleanupBar = barAnimation()
    textAnimations()
    document.documentElement.scrollTop = 0;

    return ()=>{
      cleanup()
      cleanupBar()
    }
   
  },[])

 

  const [selectedColor , setSelectedColor] = useState('g')

  const [size,setSize] = useState(40)

  const [orderCounter,setOrderCounter] = useState(1)


  return (
  <>
    <div className="MaskBlue" id="MaskBlue">
    </div>
    <div className="MaskGreen" id="MaskGreen">
    </div>
 
    <main className="Page-body" id="Page-body">



      <div className='Canvas-wrapper' ref={containerRef}>

      </div>

      <nav className="Nav">
        <h2 className="Title">Daisto</h2>
        <div className="Nav-buttons">
          <button onClick={()=>{scrollTo(0); sessionStorage.setItem('scrollTop','1')}}>Top</button>
          <button onClick={()=>{scrollTo(document.getElementById("Buy")?.getBoundingClientRect().top as number + window.scrollY + window.innerHeight*3 || 0); sessionStorage.setItem('scrollTop','1')}}>Order</button>
          <button>Play</button>
        </div>
        <h2 className="Balancer">Daisto</h2>
      </nav>
       <section className="animation-page">
         <div className="Start" id="Start">

         <div className="start-text-container" id="cleat-text-container">
          <h1 className="Cleat-name">Amber One</h1>
          <p className="Cleat-description">The next gen of cleats - Made for performance on the field - Best in every position.</p>
          </div>

          <p id="Start-d1">Go beyond expectations</p>
          <p id="Start-d2">With our newest cleat</p>
          <p id="Start-d3">Designed to last</p>
         </div>
         <div className="Specs" id="Specs">
          <section className="Specs-Sheet1" id="Ssheet1">
           <div className="sheet" id="sheet1">
            <p>Adaptive Fit Shell — A thermoresponsive outer layer that molds to your exact foot shape within 60 seconds of putting the cleat on, giving you a locked-in feel every time.</p>

            <p>Graphene Strike Zone — An ultra-thin graphene-infused pad across the instep that transfers maximum energy into the ball, boosting shot power and pass precision.</p>

            <p>Bio-Spring Soleplate — A carbon-fiber soleplate with embedded micro-springs that store ground energy and release it            explosively with every stride, improving sprint acceleration.</p>

            <p>Nano-Grip Stud System — Titanium studs coated in nano-ceramic texture, engineered for multi-directional grip so you            can cut, stop, and accelerate without slipping.</p>

            <p>Smart Pressure Insole — A sensor-embedded insole that tracks your foot pressure in real time and sends biomechanics            data to your phone, helping you train smarter.</p>

            <p>Featherlight Upper — A hollow-core 3D knit construction that keeps the entire boot under 150g, reducing leg fatigue            over 90 minutes.</p>

            <p>Hydro-Repel Membrane — A nano-coating that repels water and mud, keeping the cleat's feel consistent whether you're            playing on a dry pitch or in heavy rain.</p>

            <p>Dynamic Heel Counter — An articulating heel cup that adapts to your heel strike angle in real time, reducing Achilles            strain by up to 28% and lowering injury risk.</p>
           </div>
          </section>
          <section className="Specs-Sheet2" id="Ssheet2">
            <div className="sheet" id="sheet2">
              <p>Micro-Stud Ground Intelligence — Studs that automatically extend or retract by up to 3mm based on pitch hardness,               giving you optimal grip on any surface without changing boots.</p>
              
              <p>Laceless Tension Web — An internal Dyneema cord harness replaces traditional laces entirely, leaving a completely               clean strike surface across the instep.</p>
              
              <p>Energy Return Midsole — A nitrogen lattice foam layer that absorbs impact and returns 92% of that energy upward,               keeping your legs fresher deeper into the game.</p>
              
              <p>Thermal Regulation Liner — A phase-change material lining that absorbs excess heat from your foot and maintains an               ideal interior temperature of 32°C throughout the match.</p>
              
              <p>Anti-Slip Toe Box — A bio-silicone grip lining inside the toe box that eliminates internal foot movement, so your foot               never slides forward during explosive sprints.</p>
              
              <p>Lateral Burst Chassis — A reinforced carbon-fiber rib running along the midfoot that channels lateral force directly               into forward movement, making sideways cuts more explosive.</p>
              
              <p>UV-Active Colorshift Finish — A photochromic surface coating that shifts color under UV light, keeping the cleat               highly visible in all lighting conditions while adding a striking visual identity.</p>
              
              <p>Self-Cleaning Stud Base — Microfluidic channels molded around each stud wick and expel mud automatically with every               step, so traction stays consistent even on waterlogged pitches.</p>
            </div>
          </section>
         </div>
         <div className="Sizes" id="Sizes"> 
          <div className="sizes-text-wrapper" id="sizes-text-wrapper">

            <div className="s-t-div" id="all-but">
              <p id="Sizes-text" className="spacer">. </p>
              <p id="Sizes-text" className="all">All</p>
              <p id="Sizes-text" className="but">But</p>
            </div>

            <p id="Sizes-text" className="men">Men</p>

            <div className="s-t-div" id="love-are">
              <p id="Sizes-text" className="spacer">. </p>
              <p id="Sizes-text" className="love">love</p>
              <p id="Sizes-text" className="are">are</p>
            </div>

            <div className="s-t-div" id="diff-foot">
              <p id="Sizes-text" className="diff">different</p>
              <p id="Sizes-text" className="football">Football</p>
              <p id="Sizes-text" className="spacer">. </p>
            </div>
          </div>
          <div className="Sizes-pretext-wrapper">
          <p className="Sizes-pretext" id="Sizes-pretext">
           Our company respects the love for football, so our cleats sizes are for everyone, even for younger players.
          </p>
          </div>
         </div>
         <div className="positions" id="positions">
           <span className="line midline" id="midline"></span>
           <span className="line upline" id="upline"></span>
          <div className="posSpecs-wrapper">
           <div className="posSpecs">
            <h1>Defense</h1>
            <p>Maximum stability and grip for confident defending and powerful challenges</p>
           </div>

           <div className="posSpecs">
            <h1>Midfield</h1>
            <p>All-game comfort and precise control for players who influence every phase of play</p>
           </div>

           <div className="posSpecs">
            <h1>Attack</h1>
            <p>Lightweight speed and agility designed to create and finish scoring opportunities</p>
           </div>

           <div className="posSpecs">
            <h1>Goalkeeper</h1>
            <p>Reliable traction and balanced support for quick reactions and confident distribution</p>
           </div>

          </div>
         </div>

         <div className="Buy" id="Buy">
          <div className="Buy-cover"></div>
          <div className="Buy-content" id="Buy-content">
            <h2 className="Cleat-name2">Amber One</h2>
            <h1>150 &euro;</h1>
            <div className="Buy-options">

             <div className="color-select-wrapper">
              <label htmlFor="" className="Select-label">
               <input type="radio" value="g" name="color-select" className="Color-select "
               checked={selectedColor === "g"}
               onChange={(e)=>{
                setSelectedColor((e.target as HTMLInputElement).value)
                changeModel((e.target as HTMLInputElement).value)
               }}
               />
               <span className="Color-select-style green"></span>
              </label>
  
              <label htmlFor="" className="Select-label">
               <input type="radio" value="r" name="color-select" className="Color-select " 
               checked={selectedColor === "r"}
               onChange={(e)=>{
                setSelectedColor((e.target as HTMLInputElement).value)
                changeModel((e.target as HTMLInputElement).value)
               }}
               />
               <span className="Color-select-style red"></span>
              </label>
  
              <label htmlFor="" className="Select-label">
               <input type="radio"value="b"  name="color-select" className="Color-select "
               checked={selectedColor === "b"}
               onChange={(e)=>{
                setSelectedColor((e.target as HTMLInputElement).value)
                changeModel((e.target as HTMLInputElement).value)
               }}
               />
               <span className="Color-select-style blue"></span>
              </label>
             </div>

              <div className="number-input">
                <button className="number-down" onClick={() => setSize(Math.max(30, size - 1))}>
                  -
                </button>
                <input type="number" min="30" max="49" value={size} className="Size-input" />
                <button className="number-up" onClick={() => setSize(Math.min(49, size + 1))}>
                  +
                </button>
               </div>
          </div>
          <div className="Buy-button-wrapper">
              <button className="Buy-button" onClick={
                ()=>{
                  setOrderCounter(orderCounter + 1)
                  if(orderCounter === 10){
                    alert("Congratulations! You've unlocked the secret 10th order bonus: a lifetime supply of virtual high-fives and bragging rights as the ultimate Daisto superfan! Keep going, you're on fire!")
                  }
                  if(orderCounter === 100){
                    alert("You're a persistent one aren't you :)")
                  }
                }
              }>Order</button>
          </div>

          </div>
         </div>
       </section>
    </main>
    <main className="Credits">
      <div className="Credit-transition"></div>
      <section className="credit-game">
      <div className="Moto"></div>
      <div className="Game"></div>
    </section>
    </main>
  </>
  )
}
