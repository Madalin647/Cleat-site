import * as THREE from "three/webgpu"
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import { cleatAnimation } from "../functional/cleatAnimation";
import {tracker} from '../functional/tracker'
import { OrbitControls } from "three/examples/jsm/Addons.js";

let camera1:THREE.Camera
let cameraZ:number

  let g:THREE.Group | null = null
  let r:THREE.Group | null = null
  let b:THREE.Group | null = null

function wait(ms:number){
  return new Promise((resolve)=>setTimeout(resolve,ms))
}

export function cleat(container:HTMLElement){
  let disposed = false;
  document.body.style.overflow = 'hidden'

  const w = window.innerWidth;
  const h = window.innerHeight
  cameraZ = 6*(1000/w)
  
  //scene
  const scene = new THREE.Scene();

  //camera 
  const camera = new THREE.PerspectiveCamera(75,w/h,0.1,1000);
  camera.position.z=cameraZ;

  camera1 = camera

  //renderer
 
  const renderer = new THREE.WebGPURenderer({antialias:true});
  renderer.setSize(w,h)
  renderer.setPixelRatio(devicePixelRatio);

  renderer.domElement.className='Cleat-canvas'
  container.appendChild(renderer.domElement)

  //controls
      const controls = new OrbitControls(camera,renderer.domElement)
    // Lock vertical (polar) angle to prevent up/down rotation
    controls.minPolarAngle = Math.PI / 2; // 90 degrees
    controls.maxPolarAngle = Math.PI / 2; // 90 degrees

   // Disable panning and zooming if you want pure Y-axis rotation
   controls.enablePan = false;
   controls.enableZoom = false;
   controls.zoomSpeed = 0;
   controls.update()

  //light
  
  const ambientLight = new THREE.AmbientLight(0xffffff,1)
  ambientLight.position.y = 60;
  
  const spotLight = new THREE.SpotLight(0xffffff,5000)
  spotLight.position.y = 40;
  spotLight.angle=0.5

  const dLight = new THREE.DirectionalLight(0xffffff,1)
  dLight.position.y = -20;

  scene.add(ambientLight)

  scene.add(spotLight)
  scene.add(dLight)

  //model


      //manager
  const manager = new THREE.LoadingManager()


  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

  const modelLoader = new GLTFLoader(manager);
  modelLoader.setDRACOLoader(dracoLoader)

 

  LoaderBody()



  modelLoader.load('/cleat-red.glb',(gltf)=>{
    if (disposed) return;

    r = gltf.scene as THREE.Group

    r.position.set(0,-1.3,1000)
       r.rotateX(Math.PI/5)
       r.rotateY(Math.PI/3)
       r.rotateZ(-Math.PI/6)

      scene.add(r)
  },undefined,(error)=>{
    console.log(error)
  })

    modelLoader.load('/cleat-blue.glb',(gltf)=>{
    if (disposed) return;
     b = gltf.scene as THREE.Group

    b.position.set(0,-1.3,1000)
       b.rotateX(Math.PI/5)
       b.rotateY(Math.PI/3)
       b.rotateZ(-Math.PI/6)

      scene.add(b)
  },undefined,(error)=>{
    console.log(error)
  })



  modelLoader.load('/cleat-green.glb',(gltf)=>{
    if (disposed) return;
    g = gltf.scene as THREE.Group


    g.position.set(-3,6,-1)

       g.rotateX(Math.PI/5)
       g.rotateY(Math.PI/3)
       g.rotateZ(-Math.PI/6)

      scene.add(g)
  },undefined,(error)=>{
    console.log(error)
  })

 
 manager.onProgress=(__url,itemsLoaded,itemsTotal)=>{
  LoaderAnimation(Math.floor((itemsLoaded/itemsTotal)*100))
 }
 manager.onLoad=async ()=>{
  const ball =document.getElementById('Ball')
  if(!ball) return
  ball.style.animation="end 5s forwards"
  
  const text = document.getElementById('ProgressText')
  if(!text)return
  text.innerHTML="FT"
  text.style.animation="end 5s forwards"
  text.style.left = 'calc(50vw - 20px)'

  const maskGreen = document.getElementById('MaskGreen')
  const maskBlue = document.getElementById('MaskBlue')
  const page = document.querySelector('.Nav')
  const cleatDes = document.getElementById('cleat-text-container')
  const tl = gsap.timeline()


  if( !g) return
  tracker()
  tl.addLabel('fillGreen')
    .to(maskGreen,{height:'300vh',duration:0.7,ease:'power2.out',delay:2}, 'fillGreen+=0')
    .addLabel('fillBlue')
    .to(maskBlue,{height:'300vh',duration:0.7,ease:'power2.out',}, 'fillBlue-=0.2')
    .addLabel('content')
    .to(g.position,{
        y:-1,
        ease:'power2.out',
        duration:2,
        fill:'forwards',
        overwrite:true
      },'content+=0')
    .to(cleatDes,{right:0,scale:1,duration:1.5,ease:'power2.out'},'content+=0.5')
    .to(page,{y:+82,duration:2,ease:'power2.out',onComplete:()=>{if(g){ cleatAnimation(g)}}}, 'content+=0.5')
  await wait(8000)
    document.body.removeChild(text)
    document.body.removeChild(ball)
    document.body.style.overflowY = 'visible'
 }

 //hdri
   renderer.outputColorSpace= THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.7
   


  //animate
  function animate(){
    renderer.render(scene,camera)
  }
  renderer.setAnimationLoop(animate)

  

  //resize

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if(!isTouchDevice){
   const Buy = document.getElementById('Buy')?.getBoundingClientRect()

   window.addEventListener('scroll',elementInView)

   function elementInView(){

   const canvas = document.querySelector('.Cleat-canvas')as HTMLElement
   if((Buy?.top as number) - window.scrollY < 0 && window.innerWidth > 768){
    camera.aspect =((window.innerWidth/10) * 6)/h;
    camera.position.z=cameraZ;
    camera.updateProjectionMatrix();
    renderer.setSize((window.innerWidth/10)*6,h)
    window.removeEventListener('resize',resize)

   }else{
    window.addEventListener('resize',resize)
    resize()
    canvas.style.left='0'
   }
  }
  }

  function resize(){
    const w = window.innerWidth;
    const h = window.innerHeight;
    cameraZ = 6*(1000/w)

    camera.aspect =w/h;
    camera.position.z=cameraZ;
    camera.updateProjectionMatrix();
    renderer.setSize(w,h)
  }
  window.addEventListener('resize',resize)

  return()=>{
    const mask = document.getElementById("Mask")
    const ball = document.getElementById('Ball')
    const text = document.getElementById("ProgressText")
    if(!ball || !mask || !text)return
    window.removeEventListener('resize',resize)
    disposed =true;
    renderer.setAnimationLoop(null);
    renderer.dispose();
    container.removeChild(renderer.domElement)
    document.body.removeChild(ball)
    document.body.removeChild(mask)
    document.body.removeChild(text)
  }


}

function LoaderBody(){
  const mask = document.createElement('div')
  mask.id="Mask"
  document.body.appendChild(mask)

  const ball=document.createElement('img')
  ball.src="/footBall.svg"
  ball.id="Ball"
  document.body.appendChild(ball)
  const text=document.createElement('p')
  text.id="ProgressText"
  text.innerHTML="0'"
  document.body.appendChild(text)
}
let previousP=0;
function LoaderAnimation(progress:number){
  const mask = document.getElementById('Mask')
  const text = document.getElementById('ProgressText')
  if(progress>previousP){
  gsap.to(mask,{width:`${progress}vw`,ease:'power2.out', duration:1})
  previousP = progress;
  if(!text) return
  text.innerHTML=`${Math.floor((progress/100)*90)}'`
  }
}

export function reverseCamera(){
  if (camera1){
    gsap.to(camera1.rotation,{x:0,y:0,z:0,duration:0.4, ease:'power1.out'})
    gsap.to(camera1.position,{x:0,y:0,z:cameraZ,duration:0.4, ease:'power1.out'})
  }
}

export function changeModel(color:string){


  if(color === 'r' && r && b && g){
    r.position.z = 0
    cleatAnimation(r as THREE.Group)
    r.position.z = 0
      
  }else if(color === 'b' && r && b && g){
    b.position.z = 0
    cleatAnimation(b as THREE.Group)
    b.position.z = 0
   
  }else if(color === 'g' && r && b && g){
    g.position.z = 0
    cleatAnimation(g as THREE.Group)
    g.position.z = 0
   }
  
}


