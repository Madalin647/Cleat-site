import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import * as THREE from 'three/webgpu'
import { reverseCamera } from '../components/scene'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({overwrite:'auto'})

let previousModel: THREE.Group | null = null;

let ctx: gsap.Context;

export function cleatAnimation(cleat:THREE.Group){

   ctx?.revert();

  ctx = gsap.context(() => {

    cleat.position.z = 0

    if(previousModel && previousModel !== cleat){
      previousModel.position.z = 1000
    }
    
    previousModel = cleat
   const tl = gsap.timeline()

  //first animation (Start)
  const start =  document.getElementsByClassName('Start')
  const MaskBlue = document.getElementById('MaskBlue') as HTMLElement
  const MaskGreen = document.getElementById('MaskGreen') as HTMLElement

  if(start && MaskBlue && MaskGreen){
    const scrollTrigger ={
      trigger:start[0],
      start:'top top',
      end:'bottom top',
      scrub:0.5,
      onLeave:()=>{
        cleat.rotation.set(0,Math.PI*2.5,0)
        cleat.position.set(0,-1,0)
      },
       onEnterBack:()=>{
        cleat.rotation.set(0,Math.PI*2.5,0)
        cleat.position.set(0,-1,0)
      }
    }
   
       tl.fromTo(cleat.position,{x:-3,y:-1,z:-1},{x:0,y:-1,z:0,overwrite:true,scrollTrigger:scrollTrigger})
         .fromTo(cleat.rotation,{x:Math.PI/5,y:Math.PI/3,z:-Math.PI/6},{x:0,y:Math.PI*2.5,z:0,scrollTrigger:scrollTrigger })
         .fromTo(MaskGreen,{rotateZ:30,left:'30%'},{rotateZ:0,left:'100%',scrollTrigger:scrollTrigger,overwrite:true})
         .fromTo(MaskBlue,{rotateZ:30,right:'30%'},{rotateZ:0,right:'100%',scrollTrigger:scrollTrigger,overwrite:true})
  }

  const sizes = document.getElementsByClassName('Sizes')

  if(sizes && MaskBlue){
     
    const scrollTrigger={
      trigger:sizes[0],
      start:'top top',
      end:'30% top',
      scrub:0.5,
    }
    tl.to(cleat.rotation,{x:Math.PI/2,y:Math.PI*3.6,z:0,scrollTrigger:scrollTrigger,immediateRender:false})
      .to(cleat.position,{y:0,z:-0.5,scrollTrigger:scrollTrigger, immediateRender:false})
      .to(MaskBlue,{right:0,scrollTrigger:scrollTrigger, immediateRender:false})
  }

  //positions
  const positions = document.getElementById('positions')

  if(positions && MaskGreen && MaskBlue){
    const ST ={
      trigger:positions,
      start:'top top',
      end:'bottom bottom',
      scrub:0.3,
    }

    const tl = gsap.timeline()
    tl.to(cleat.rotation,{x:-Math.PI/5,y:Math.PI * 5.3,z:-Math.PI/6,scrollTrigger:ST,immediateRender:false})
      .to(cleat.position,{y:-1.3,z:0.4,x:-0.5,scrollTrigger:ST,immediateRender:false})
      .to(MaskBlue,{right:'100%',scrollTrigger:ST, immediateRender:false})
      .to(MaskGreen,{left:0,scrollTrigger:ST, immediateRender:false})
  }

  //buy

  const Buy = document.getElementById('Buy')
  const canvas = document.querySelector('.Cleat-canvas')as HTMLElement
  const BuyContent = document.getElementById("Buy-content")

  if(Buy){
    const ST={
      trigger:Buy,
      start:"20% top",
      end:"80% bottom",
      scrub:true,
      onEnterBack:()=>{
        console.log('did')
        canvas.style.pointerEvents='none';
        canvas.style.zIndex='-1'
        reverseCamera()
      }
    }
    const tl =gsap.timeline({scrollTrigger:ST})

    tl.addLabel('Start')
      .fromTo(cleat.position,{y:-1.3,z:0.4,x:-0.5},{x:0,z:0,immediateRender:false},"Start")
      .fromTo(cleat.rotation,{x:-Math.PI/5,y:Math.PI * 5.3,z:-Math.PI/6},{x:1.6,y:Math.PI * 6.3,z:-1.5,immediateRender:false},"Start")
      .to(canvas,{x:"-20vw",immediateRender:false,onComplete:()=>{
        canvas.style.pointerEvents='all';
        canvas.style.zIndex='0'
      }},"Start")
              
      
      gsap.from(BuyContent,{x:"100%",duration:1,ease:'power2.out',overwrite:true,scrollTrigger:{
        trigger:Buy,
        start:"80% bottom",
        toggleActions:'restart pause resume reverse',
      }})
  }
  })
}