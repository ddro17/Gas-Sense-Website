import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// The AVP used procedural geometry rather than a distributable CAD model.
// This reconstruction follows its enclosure, four-cell platform, and external valve layout.
export function createExhibit(container, options = {}) {
  const hero = !!options.hero;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = new THREE.Scene();
  const background = hero ? 0xe7e9df : 0x202925;
  scene.background = new THREE.Color(background);
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:false, powerPreference:'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.style.touchAction = 'pan-y';
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = .07;
  controls.enablePan = false;
  controls.enableZoom = !hero;
  controls.minDistance = 10;
  controls.maxDistance = 24;
  controls.minPolarAngle = .28;
  controls.maxPolarAngle = Math.PI * .49;
  controls.autoRotate = hero && !reducedMotion;
  controls.autoRotateSpeed = .35;
  controls.touches.ONE = THREE.TOUCH.ROTATE;
  controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
  controls.addEventListener('start', () => { controls.autoRotate = false; });

  const ambient = new THREE.HemisphereLight(0xffffff, hero ? 0x798279 : 0x3d5c4c, 2.7);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xfff6e9, 4.2);
  key.position.set(-5, 9, 7); key.castShadow = true;
  key.shadow.mapSize.set(2048,2048);
  Object.assign(key.shadow.camera, { left:-8, right:8, top:8, bottom:-8, near:1, far:30 });
  key.shadow.normalBias = .04;
  key.shadow.bias = -.0002;
  key.shadow.radius = 4;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xc8e5ff, 1.5);
  fill.position.set(5,4,-5); scene.add(fill);

  const world = new THREE.Group(); scene.add(world);
  const meshes = [];
  const groups = {};
  const moving = [];
  function material(color, metalness=0, roughness=.7) { return new THREE.MeshStandardMaterial({color,metalness,roughness}); }
  const white = material(0xe3e5dc), edge = material(0xbfc5ba), tankPaint = material(0x50786e,.25,.53), brass = material(0xc8994b,.7,.35), dark = material(0x263c37,.2), pcb = material(0x215e4c,.15), chip = material(0x172420,.1), silver = material(0xbac8c5,.7,.38), orange = material(0xef643b), blue = material(0x426d8d), black = material(0x192b26);
  function group(name, parent=world) { const g = new THREE.Group(); g.userData.part = name; parent.add(g); if(!groups[name]) groups[name]=[]; groups[name].push(g); return g; }
  function mesh(geo,mat,parent,x,y,z) { const m = new THREE.Mesh(geo, mat.clone()); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; parent.add(m); meshes.push(m); return m; }
  function box(g,x,y,z,w,h,d,mat=white) { return mesh(new THREE.BoxGeometry(w,h,d),mat,g,x,y,z); }
  function cyl(g,x,y,z,r,h,mat=white,axis='y',rTop=r) { const m=mesh(new THREE.CylinderGeometry(rTop,r,h,40),mat,g,x,y,z); if(axis==='x')m.rotation.z=Math.PI/2; if(axis==='z')m.rotation.x=Math.PI/2; return m; }
  function torus(g,x,y,z,r,t,mat=brass,axis='y') { const m=mesh(new THREE.TorusGeometry(r,t,10,40),mat,g,x,y,z); if(axis==='y')m.rotation.x=Math.PI/2; if(axis==='x')m.rotation.y=Math.PI/2; return m; }
  function wire(g, points, color=0x617f72, radius=.025) { const curve = new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))); return mesh(new THREE.TubeGeometry(curve,36,radius,6,false),material(color),g,0,0,0); }
  function explode(g, delta) { moving.push({g,home:g.position.clone(),delta:new THREE.Vector3(...delta)}); }
  function screws(g,x,y,z,w,h) { for(const dx of [-1,1])for(const dy of [-1,1]) { cyl(g,x+dx*w/2,y+dy*h/2,z,.036,.025,silver,'z'); box(g,x+dx*w/2,y+dy*h/2,z+.015,.04,.007,.003,dark); } }

  const enclosure=group('enclosure'); enclosure.position.set(-2.05,.92,0);
  box(enclosure,0,0,-.4,2.3,2.95,.12);
  box(enclosure,-1.1,0,0,.12,2.95,.85); box(enclosure,1.1,0,0,.12,2.95,.85);
  box(enclosure,0,1.415,0,2.3,.12,.85); box(enclosure,0,-1.415,0,2.3,.12,.85);
  for(const x of [-.98,.98])for(const y of [-1.27,1.27])cyl(enclosure,x,y,-.15,.06,.4,edge,'z');
  const internals=group('sensing'); internals.position.copy(enclosure.position);
  function board(g,x,y,w,h) { box(g,x,y,-.12,w,h,.06,pcb); screws(g,x,y,-.075,w-.12,h-.12); }
  board(internals,-.55,.23,.65,1.1);
  box(internals,-.55,.33,.03,.43,.5,.2,silver);
  box(internals,-.55,-.25,.04,.24,.18,.16,dark);
  for(let i=0;i<9;i++)for(const x of [-.94,-.16])box(internals,x,-.17+i*.09,-.06,.16,.03,.05,silver);
  for(let i=0;i<4;i++){box(internals,-.76+i*.13,.7,-.07,.07,.11,.018,brass);}
  board(internals,.38,.25,.72,.6); box(internals,.38,.25,.05,.47,.35,.28,blue);
  for(let i=0;i<3;i++)cyl(internals,.16+i*.22,-.01,.02,.045,.06,brass,'z');
  board(internals,-.6,-.73,.48,.55); cyl(internals,-.6,-.73,.12,.19,.32,silver,'z');
  // Small perforations preserve the sensor's mesh-like face without a raster texture.
  for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++)if(i*i+j*j<7)cyl(internals,-.6+i*.06,-.73+j*.06,.285,.013,.008,dark,'z');
  box(internals,.7,-.27,.0,.28,.5,.24,white);
  for(let i=0;i<5;i++)box(internals,.7,-.43+i*.08,.13,.2,.025,.01,dark);
  cyl(internals,.05,-.73,.07,.16,.24,black,'z'); cyl(internals,.05,-.73,.2,.035,.01,silver,'z');
  board(internals,.68,-.78,.4,.5); box(internals,.68,-.78,-.04,.21,.22,.08,chip);
  const converters=group('power'); converters.position.copy(enclosure.position);
  for(let i=0;i<3;i++){ const x=-.73+i*.73; board(converters,x,1,.54,.57); box(converters,x-.07,1.02,.02,.22,.22,.2,dark); cyl(converters,x+.13,.86,.0,.055,.16,silver,'z'); }
  box(converters,0,-1.22,-.08,1.8,.15,.12,brass);
  for(let i=0;i<8;i++)cyl(converters,-.78+i*.22,-1.22,0,.037,.06,silver,'z');
  for(const x of [-.73,0,.73])wire(converters,[[x,.75,-.08],[x,.6,-.05],[.05,.55,-.03],[.05,-1.12,-.02]],0xb78e4c,.013);
  explode(internals,[0,.05,1.05]); explode(converters,[0,.8,.65]);

  const cover=group('enclosure'); cover.position.set(-2.05,.92,.51);
  box(cover,0,0,0,2.34,2.99,.16,white);
  screws(cover,0,0,.095,2.08,2.71);
  const panelCanvas=document.createElement('canvas'); panelCanvas.width=768; panelCanvas.height=1024;
  const ctx=panelCanvas.getContext('2d');
  ctx.fillStyle='#e3e5dc';ctx.fillRect(0,0,768,1024);
  ctx.fillStyle='#254039';ctx.font='bold 67px Arial';ctx.fillText('GAS SENSE',62,130);
  ctx.font='19px Arial';ctx.fillText('HOME MONITORING SYSTEM',66,170);
  ctx.fillStyle='#243a31';ctx.fillRect(58,244,650,230);
  ctx.fillStyle='#a7ba85';ctx.fillRect(80,267,605,182);
  ctx.fillStyle='#21342b';ctx.font='bold 46px monospace';ctx.fillText('MONITORING',111,345);
  ctx.font='24px monospace';ctx.fillText('SYSTEM STATUS',111,400);
  ctx.fillStyle='#41554a';
  for(let i=0;i<7;i++)ctx.fillRect(76,570+i*24,270,8);
  for(let i=0;i<5;i++)ctx.fillRect(488,570+i*24,166,8);
  ctx.font='20px Arial';ctx.fillText('GAS SENSOR',77,794);ctx.fillText('ALARM',488,752);
  ctx.fillStyle='#e56038';ctx.fillRect(76,878,36,5);
  ctx.fillStyle='#41554a';ctx.font='19px Arial';ctx.fillText('SENSE  /  MONITOR  /  ALERT',76,942);
  const panelTexture=new THREE.CanvasTexture(panelCanvas);panelTexture.colorSpace=THREE.SRGBColorSpace;panelTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  const face=new THREE.Mesh(new THREE.PlaneGeometry(2.08,2.76), new THREE.MeshStandardMaterial({map:panelTexture,roughness:.8})); face.position.z=.085;cover.add(face);meshes.push(face);
  explode(cover,[-1.05,.25,2.5]);

  const weight=group('weight'); weight.position.set(1.85,-.6,0);
  box(weight,0,0,0,2.7,.15,2.35,dark);
  for(const x of [-1.04,1.04])for(const z of [-.86,.86]) { box(weight,x,.18,z,.42,.18,.38,silver);box(weight,x,.3,z,.2,.08,.2,orange);box(weight,x,-.13,z,.3,.15,.3,black); }
  const plate=group('weight');plate.position.set(1.85,-.15,0);box(plate,0,0,0,2.75,.15,2.4,white);explode(plate,[0,.55,0]);
  const tank=group('weight');tank.position.set(1.85,-.03,0);
  cyl(tank,0,.15,0,.83,.3,tankPaint);
  torus(tank,0,.1,0,.84,.05,tankPaint);
  cyl(tank,0,1.35,0,1,2.45,tankPaint);
  cyl(tank,0,2.76,0,1,.38,tankPaint,'y',.5);
  cyl(tank,0,2.99,0,.5,.1,tankPaint);
  torus(tank,0,.3,0,.998,.018,edge);
  // Collar and an open handle around the tank valve.
  for(const x of [-.49,.49])box(tank,x,3.25,-.15,.1,.55,.12,tankPaint);
  box(tank,0,3.51,-.15,1.08,.13,.12,tankPaint);
  const labelCanvas=document.createElement('canvas');labelCanvas.width=256;labelCanvas.height=256;
  const lc=labelCanvas.getContext('2d');lc.fillStyle='#d6ddd1';lc.fillRect(0,0,256,256);lc.fillStyle='#3a594e';lc.font='bold 56px Arial';lc.textAlign='center';lc.fillText('LPG',128,123);lc.font='20px Arial';lc.fillText('GAS SENSE',128,171);
  const labelTexture=new THREE.CanvasTexture(labelCanvas);labelTexture.colorSpace=THREE.SRGBColorSpace;
  const tankLabel=new THREE.Mesh(new THREE.PlaneGeometry(.62,.62),new THREE.MeshStandardMaterial({map:labelTexture,roughness:.8}));tankLabel.position.set(0,1.4,1.005);tank.add(tankLabel);meshes.push(tankLabel);
  explode(tank,[0,1.2,0]);

  const valve=group('valve');valve.position.set(1.85,3.15,0);
  box(valve,0,0,0,.22,.25,.25,brass);cyl(valve,0,.2,0,.11,.2,brass);cyl(valve,0,.31,0,.22,.07,dark);
  cyl(valve,-.7,0,.0,.08,1.45,brass,'x');
  cyl(valve,-.23,0,0,.14,.16,silver,'x');
  box(valve,-.58,0,0,.32,.24,.3,brass);cyl(valve,-.58,.28,0,.18,.4,black);
  box(valve,-.58,.48,0,.18,.1,.18,dark);
  cyl(valve,-1.03,.18,0,.08,.35,silver);cyl(valve,-1.03,.4,0,.13,.15,blue);
  cyl(valve,-1.43,0,0,.27,.13,brass);cyl(valve,-1.43,.12,0,.11,.16,black);
  wire(valve,[[-1.65,0,0],[-1.9,-.05,0],[-2.02,-.8,0],[-1.8,-1.8,.1]],0x273e32,.06);
  explode(valve,[0,1.65,0]);

  const power=group('power');power.position.set(-3.9,-.31,.15);
  box(power,0,0,0,.8,.5,1.02,silver);
  for(let i=0;i<5;i++)for(let j=0;j<4;j++)box(power,-.28+i*.14,.255,-.35+j*.23,.07,.01,.13,black);
  box(power,.32,-.02,.55,.23,.24,.1,pcb);
  for(let i=0;i<3;i++)cyl(power,.32,-.09+i*.07,.61,.025,.02,brass,'z');
  wire(power,[[.45,0,.2],[.75,0,.2],[.8,.07,-.1],[1.05,.1,-.1]],0x263a2f,.03);
  const wiring=group('overview');
  wire(wiring,[[-.92,-.28,.0],[-.5,-.42,.0],[.15,-.55,.1],[.5,-.4,.1]],0x456554,.025);
  wire(wiring,[[-.92,.25,0],[-.56,.32,0],[-.4,2.7,-.25],[.8,3.55,0]],0xb08c49,.018);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(200,200), new THREE.MeshBasicMaterial({color:background,toneMapped:false}));floor.rotation.x=-Math.PI/2;floor.position.y=-.83;scene.add(floor);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:hero?.13:.3}));shadow.rotation.x=-Math.PI/2;shadow.position.y=-.825;shadow.receiveShadow=true;scene.add(shadow);
  if(!hero) { const grid=new THREE.GridHelper(24,48,0x344b3d,0x2b3931);grid.position.y=-.82;scene.add(grid); }

  const anchors=[];
  if(!hero) {
    const anchorData=[['enclosure','01',cover,[0,1.3,.15]],['sensing','02',internals,[-.55,.3,.3]],['valve','03',valve,[-.65,.5,.2]],['weight','04',plate,[1.2,0,1.1]],['power','05',power,[-.35,.3,.4]]];
    for(const [id,num,parent,position]of anchorData) {
      const point=new THREE.Object3D();point.position.set(...position);parent.add(point);
      const button=document.createElement('button');button.className='model-pin';button.textContent=num;button.setAttribute('aria-label',`Explore ${id === 'sensing'?'sensors and processor':id === 'valve'?'pressure and shut-off':id === 'weight'?'weighing platform':id}`);button.addEventListener('click',()=>options.onSelect?.(id));container.appendChild(button);anchors.push({id,point,button});
    }
  }
  const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();let startX=0,startY=0;
  renderer.domElement.addEventListener('pointerdown',e=>{startX=e.clientX;startY=e.clientY;});
  renderer.domElement.addEventListener('pointerup',e=>{
    if(hero||Math.hypot(e.clientX-startX,e.clientY-startY)>6)return;
    const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);
    const hit=raycaster.intersectObjects(meshes,false)[0];if(!hit)return;
    let current=hit.object;while(current&&!current.userData.part)current=current.parent;
    if(current?.userData.part&&current.userData.part!=='overview')options.onSelect?.(current.userData.part,true);
  });
  let width=1,height=1;
  const baseTarget=new THREE.Vector3(-.25,1.25,0);
  function reset(){controls.target.copy(baseTarget);camera.position.set(hero?8.5:7.5,hero?6.3:6.5,hero?14.8:15.5);controls.update();}
  function resize(){width=container.clientWidth;height=container.clientHeight;if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.fov=width<500?43:34;camera.updateProjectionMatrix();}
  reset();new ResizeObserver(resize).observe(container);resize();
  let expanded=0,targetExpanded=0,visible=true,selected='overview';
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{rootMargin:'150px'}).observe(container);
  const projected=new THREE.Vector3();let previous=performance.now();
  function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-previous)/1000,.05);previous=now;if(!visible||document.hidden)return;
    expanded=THREE.MathUtils.lerp(expanded,targetExpanded,reducedMotion?1:1-Math.exp(-dt*6));
    for(const {g,home,delta}of moving)g.position.copy(home).addScaledVector(delta,expanded);
    if(!hero){controls.target.y=1.25+expanded*.65;}
    controls.update(dt);
    renderer.render(scene,camera);
    for(const a of anchors){a.point.getWorldPosition(projected);projected.project(camera);const onScreen=projected.z<1&&Math.abs(projected.x)<.96&&Math.abs(projected.y)<.95;const occluded=a.id==='sensing'&&expanded<.5;a.button.hidden=!onScreen||occluded;a.button.style.left=`${(projected.x*.5+.5)*width}px`;a.button.style.top=`${(-projected.y*.5+.5)*height}px`;}
  }
  requestAnimationFrame(animate);
  return {
    setExploded(value){targetExpanded=value?1:0;},
    select(id){selected=id;for(const m of meshes){let p=m;while(p&&!p.userData.part)p=p.parent;const active=p?.userData.part===selected&&selected!=='overview';if(m.material.emissive){m.material.emissive.set(active?0xb66a28:0);m.material.emissiveIntensity=active?.2:0;}}for(const a of anchors)a.button.classList.toggle('selected',a.id===id);},
    reset(){reset();}
  };
}
