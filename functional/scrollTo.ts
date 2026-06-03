import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollToPlugin);

export function scrollTo(val:number){
  const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  const timeToScroll = Math.abs(scrollPosition-val)/window.innerHeight/2;
  if(scrollPosition-val<100 && scrollPosition-val>-100)return
  gsap.to(window,{scrollTo:{y:val},duration:timeToScroll,ease:'none',onComplete:()=>sessionStorage.setItem('scrollTop','0')})
}