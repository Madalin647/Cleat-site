import gsap from "gsap";

export function barAnimation(){
  const bar = document.getElementsByClassName('Nav')[0] as HTMLElement;
  let prev = 1;
  let prevH = 1;
  let mouseY=0;

  function getMouseY(e:MouseEvent){
    mouseY = e.clientY;
  }

  document.addEventListener('mousemove',getMouseY)

  function animateScroll(){
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop>150 && prev === 1 && mouseY>82){
      gsap.to(bar,{y:-82,duration:1.5,ease:'power2.out',overwrite:true})
      prev = 0;
    }else if(scrollTop>150 && prev ===1){
      prev = 0;
    } 
      
      if(prev === 0 && scrollTop<150){
      gsap.to(bar,{y:+82,duration:1,ease:'power2.out', fill:'forwards',overwrite:true})
      prev = 1;
    }
  }
  

  document.addEventListener('scroll',animateScroll)

  function animateHover(e:MouseEvent){
    const scrollHeight= e.pageY -document.documentElement.scrollTop
   if(scrollHeight<=82 &&  prev === 0 && prevH === 1){
    gsap.to(bar,{y:+82,duration:1, fill:'forwards'})
    prevH = 0;
   }
   else if(scrollHeight>82 && prev === 0 && prevH === 0 && sessionStorage.getItem('scrollTop') === '0'){
    gsap.to(bar,{y:-82,duration:1, fill:'forwards'})
    prevH = 1;
   }
  }

  document.addEventListener('mousemove',animateHover)

  return ()=>{
    document.removeEventListener('scroll',animateScroll)
    document.removeEventListener('mousemove',animateHover)
    document.removeEventListener('mousemove',getMouseY)
  }

}