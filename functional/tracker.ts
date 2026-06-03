import { gsap } from "gsap/gsap-core"

export function tracker(){
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  if(isTouchDevice)return

  if(document.getElementById('tracker'))return
    const tracker = document.createElement('div')
    tracker.className="tracker"
    tracker.id='tracker'

    document.addEventListener('mousemove',(e:MouseEvent)=>{
      tracker.style.left = `${e.clientX - 20}px`
      tracker.style.top = `${e.clientY - 20}px`

    },{once:true})

    document.body.appendChild(tracker)

    let halfSize = 20

    function onMove(e:MouseEvent){
      gsap.to(tracker,{left:e.clientX-halfSize,top:e.clientY-halfSize,duration:0.2,ease:'power2.out'})
    }

    document.addEventListener('mousemove',onMove)

    const btn =  document.querySelectorAll('button')

    function buttonHover(){
      halfSize=30
      gsap.to(tracker,{width:60,height:60,left:'-=10',top:'-=10',duration:0.1,ease:'power1.inOut'})
    }
    function buttonHoverLeave(){
      halfSize=20
      gsap.to(tracker,{width:40,height:40,left:'+=10',top:'+=10',duration:0.3,ease:'power1.inOut'})
    }

    btn.forEach(element => {
      element.addEventListener('mouseenter',buttonHover)
      element.addEventListener('mouseleave',buttonHoverLeave)
    });

    const Buy = document.querySelector('.Cleat-canvas')

    function buyHover(enter:boolean){
      if(enter){
      tracker.innerHTML = "Move"
      }else{
        tracker.innerHTML = ""
      }
    }

    Buy?.addEventListener('mouseenter',()=>buyHover(true))
    Buy?.addEventListener('mouseleave',()=>buyHover(false))

    return()=>{
      document.removeEventListener('mousemove',onMove)
    btn.forEach(element => {
      element.removeEventListener('mouseenter',buttonHover)
      element.removeEventListener('mouseleave',buttonHoverLeave)
      Buy?.removeEventListener('mouseenter',()=>buyHover(true))
      Buy?.removeEventListener('mouseleave',()=>buyHover(false))
    });

    }
}