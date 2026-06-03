import gsap from "gsap";
import { SplitText,ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

export function textAnimations(){
 const startD1= new SplitText('#Start-d1',{type:'chars'})
 const startD2= new SplitText('#Start-d2',{type:'words'})
 const startD3= new SplitText('#Start-d3',{type:'chars'})

 gsap.set(startD2.words[3],{color:'rgb(46, 241, 219)'})

 const start = document.getElementById('Start')

 const scrollTriggerStart1={
  trigger:start,
  start:'top top',
  end:'15% top',
  scrub:true,
 }

  const scrollTriggerStart2={
  trigger:start,
  start:'30% top',
  end:'45% top',
  scrub:true,

 }
  const scrollTriggerStart3={
  trigger:start,
  start:'50% top',
  end:'70% top',
  scrub:true,
 }

  gsap.from(startD1.chars, { x:'100vw', scrollTrigger: scrollTriggerStart1, ease: 'power4.out', stagger: 0.05 })
  gsap.from(startD2.words,{y:110,scrollTrigger:scrollTriggerStart2,ease:'power2.out',stagger:0.7})
  gsap.from(startD3.chars,{opacity:0,scale:0,scrollTrigger:scrollTriggerStart3,ease:'power4.inOut',stagger:0.04})

  const sTStartLeave={
    trigger:start,
    start:'75% top',
    end:'90% top',
    scrub:true,
  }

  const tlStart = gsap.timeline({scrollTrigger:sTStartLeave})
  
  tlStart.to(startD2.words,{y:-110,ease:'power2.in'})
         .to(startD3.chars,{opacity:0,ease:'power2.inOut'})

  gsap.to(startD1.chars,{y:110,ease: 'power2.in',scrollTrigger:sTStartLeave})


  //Specs
  const specs =document.getElementById('Specs')
  const sheet1 = document.getElementById('Ssheet1')
  const sheet2 = document.getElementById('Ssheet2')
  const s1 = gsap.utils.toArray('#sheet1 >*')
  const s2 = gsap.utils.toArray('#sheet2 >*')

  const sTSheet={
    trigger:specs,
    start:'top top',
    end:'15% top',
    scrub:true,
  }

  const sTSheetLeave = {
    trigger:specs,
    start:'15% top',
    end:'80% top',
    scrub:0.2,
    onEnter()      { gsap.ticker.add(setScale); },
    onLeave()      { gsap.ticker.remove(setScale); },
    onEnterBack()  { gsap.ticker.add(setScale); },
    onLeaveBack()  { gsap.ticker.remove(setScale); },
  }
  const tlSheet = gsap.timeline({scrollTrigger:sTSheet})
  tlSheet.addLabel('start')
         .fromTo(sheet1,{x:'-100%',ease:'power2.out',overwrite:true},{x:0},'start')
         .fromTo(sheet2,{x:'100%',ease:'power2.out',overwrite:true},{x:0},'start')
  const tlSheetLeave = gsap.timeline({scrollTrigger:sTSheetLeave})
  tlSheetLeave.addLabel('leave')
              .to(sheet1,{borderColor:'transparent'},'leave')
              .to(sheet2,{borderColor:'transparent'},'leave')
              .fromTo(s1,{y:'-100vh'},{y:'+100vh',ease:'power2.inOut',overwrite:false},'leave')
              .fromTo(s2,{y:'100vh'},{y:'-100vh',ease:'power2.inOut',overwrite:false},'leave')

  const sheetText = gsap.utils.toArray('.sheet >*')

  gsap.ticker.add(setScale)

  function setScale(){
    sheetText.forEach((el)=>{
      const progress = getDistance(el as HTMLElement)

      gsap.set(el as HTMLElement,{scale:progress})
    })
  }

  function getDistance(el:HTMLElement){

   const sheetRect = sheet1?.getBoundingClientRect() || {top:0}
   const elRect = el.getBoundingClientRect()

   const distance = elRect.top - sheetRect?.top

   const distanceFromMiddle =Math.sin(Math.PI * (0.2+ (distance / window.innerHeight)*0.6))



   return distanceFromMiddle
  }


  //Sizes
  const Sizes =document.getElementById('Sizes')
  const ab = document.querySelectorAll('#all-but >*')
  const la = document.querySelectorAll('#love-are >*')
  const df = document.querySelectorAll('#diff-foot >*')
  const men = document.getElementsByClassName('men')[0]

  const SizesText={
    trigger:Sizes,
    start:'top top',
    end:"40% bottom",
    scrub:true,
  }

  const SizesTl = gsap.timeline({scrollTrigger:SizesText})

  SizesTl.to(ab,{y:'-100%',overwrite:true})
         .fromTo(men,{ y: "-=20vh" },{ y: 0 , overwrite:true})
         .to(la,{y:'-=100%',overwrite:true})
         .fromTo(df,{y:'-=300%'},{y:'-100%',overwrite:true})

  const SizesText2={
    trigger:Sizes,
    start:"45% bottom",
    end:"65% bottom",
    scrub:true,
  }

  const SizesTl2 = gsap.timeline({scrollTrigger:SizesText2})
  
  SizesTl2.to(ab,{y:'-=100%',overwrite:false,immediateRender:false})
          .to(la,{y:'-=100%'})
          .to(df,{y:0})

  const wrapper = document.getElementById('sizes-text-wrapper')
  const sizesPretext = new SplitText('#Sizes-pretext',{type:'words'})

  const SizesText3={
    trigger:Sizes,
    start:"70% bottom",
    end:"100% bottom",
    scrub:0.2,
  }

  const SizesTl3 = gsap.timeline({scrollTrigger:SizesText3})
  SizesTl3.addLabel('Start')
          .to(wrapper,{top:'10vh'},"Start")
          .fromTo(sizesPretext.words,{y:'+300%'},{y:0,stagger:0.2},"Start")


  //positions
  const positions = document.getElementById('positions')
  const midline = document.getElementById('midline')
  const upline =document.getElementById('upline')

  const positionsLines={
   trigger:positions,
   start:'top top',
   end:'30% top',
   scrub:0.3,
  }

   const linesTl = gsap.timeline({scrollTrigger:positionsLines})

   linesTl.fromTo(midline,{left:'-104%'},{left:0,overwrite:false})
          .fromTo(upline,{top:'104%'},{top:0,overwrite:false})

  const pos = gsap.utils.toArray('.posSpecs')

   const posSpecs={
   trigger:positions,
   start:'30% top',
   end:'90% bottom',
   scrub:true,
   } 

   const posTl = gsap.timeline({scrollTrigger:posSpecs})

   posTl.fromTo(pos[0] as HTMLElement,{x:'-=100%'},{x:0})
        .fromTo(pos[1] as HTMLElement,{y:'-=100%'},{y:0})
        .fromTo(pos[3] as HTMLElement,{x:'+=100%'},{x:0})
        .fromTo(pos[2] as HTMLElement,{y:'+=100%'},{y:0})
}