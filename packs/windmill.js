// Live Portrait scene pack: windmill
(()=>{
/* ---------- Scene: Windmill Hill ---------- */
const Windmill={
  init(){
    const r=rng(77); this.clouds=makeClouds(r,5); this.ang=0;
    this.sheep=[];for(let i=0;i<6;i++)this.sheep.push({x:0.55+r()*0.4,d:r(),ph:r()*6,dir:r()<0.5?-1:1,v:0.003+r()*0.004});
    this.flowers=[];for(let i=0;i<180;i++)this.flowers.push({x:r(),y:r(),c:r(),ph:r()*6});
  },
  hill(x){return H*0.64+Math.sin(x/W*2.2+0.9)*H*0.06},
  draw(env,dt){
    drawSky(env,H*0.76); drawClouds(this.clouds,env,dt);
    // distant hills
    ctx.fillStyle=rgb(mix(lit(sw(env,[120,160,110],[96,136,96],[150,130,95],[205,212,222]),env),env.skyBot,0.5));
    ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W+1;x+=W/40)ctx.lineTo(x,H*0.7-Math.sin(x/W*5+2)*H*0.03);ctx.lineTo(W,H);ctx.fill();
    // main hill
    const gc=lit(sw(env,[122,170,80],[92,142,60],[160,136,66],[228,233,240]),env);
    const g=ctx.createLinearGradient(0,H*0.6,0,H);g.addColorStop(0,rgb(gc));g.addColorStop(1,rgb(mix(gc,[20,22,14],0.35)));
    ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W+1;x+=W/50)ctx.lineTo(x,this.hill(x));ctx.lineTo(W,H);ctx.fill();
    // tulips in spring, daisies in summer, a few late blooms in autumn
    const fa=env.sp+env.su*0.8+env.au*0.3;
    if(fa>0.02)for(const f of this.flowers){const x=f.x*W,top=this.hill(x),y=top+H*0.02+f.y*(H-top);
      const sp=f.c<0.33?[226,64,70]:f.c<0.66?[246,206,64]:[240,140,180], su=f.c<0.5?[250,248,238]:[250,214,80];
      const c=[0,1,2].map(i=>sp[i]*env.sp+su[i]*env.su+[226,130,60][i]*(env.au+env.wi));
      disk(x+Math.sin(env.t*2+f.ph)*env.wind*H*0.003,y,H*0.0035*(0.6+f.y),lit(c,env),fa)}
    // the windmill
    const mx=W*0.36,base=this.hill(mx)+H*0.012,th=H*0.25,bw=H*0.075,tw=H*0.045,top=base-th;
    ctx.fillStyle=rgb(lit([236,228,212],env));ctx.beginPath();ctx.moveTo(mx-bw/2,base);ctx.lineTo(mx-tw/2,top);ctx.lineTo(mx+tw/2,top);ctx.lineTo(mx+bw/2,base);ctx.fill();
    ctx.fillStyle=rgb(lit([92,64,46],env));ctx.fillRect(mx-H*0.01,base-H*0.035,H*0.02,H*0.035);
    const win=1-env.light;ctx.fillStyle=rgb(mix(lit([80,70,62],env),[255,200,120],win*0.9));ctx.fillRect(mx-H*0.007,top+th*0.35,H*0.014,H*0.018);
    if(win>0.3)glow(mx,top+th*0.35+H*0.009,H*0.04,[255,190,100],0.35*win);
    ctx.fillStyle=rgb(lit([96,62,44],env));ctx.beginPath();ctx.moveTo(mx-tw*0.75,top+2);ctx.quadraticCurveTo(mx,top-H*0.07,mx+tw*0.75,top+2);ctx.fill();
    if(env.wi>0){ctx.fillStyle=rgb(lit([240,244,250],env),env.wi);ctx.beginPath();ctx.moveTo(mx-tw*0.6,top-H*0.01);ctx.quadraticCurveTo(mx,top-H*0.066,mx+tw*0.6,top-H*0.01);ctx.fill()}
    // sails turn with the wind
    this.ang+=dt*(0.25+env.wind*0.9)*motion;
    const hx=mx,hy=top-H*0.01,L=H*0.19,sw2=H*0.032;
    for(let i=0;i<4;i++){const a=this.ang+i*Math.PI/2,dx=Math.cos(a),dy=Math.sin(a),nx=-dy,ny=dx;
      const p1=[hx+dx*L*0.18,hy+dy*L*0.18],p2=[hx+dx*L,hy+dy*L];
      ctx.fillStyle=rgb(lit([238,230,212],env),0.88);ctx.beginPath();ctx.moveTo(p1[0],p1[1]);ctx.lineTo(p2[0],p2[1]);ctx.lineTo(p2[0]+nx*sw2,p2[1]+ny*sw2);ctx.lineTo(p1[0]+nx*sw2,p1[1]+ny*sw2);ctx.fill();
      ctx.strokeStyle=rgb(lit([70,50,40],env));ctx.lineWidth=H*0.004;ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(p2[0],p2[1]);
      for(let k=1;k<5;k++){const t=0.18+k*0.82/5,q=[hx+dx*L*t,hy+dy*L*t];ctx.moveTo(q[0],q[1]);ctx.lineTo(q[0]+nx*sw2,q[1]+ny*sw2)}ctx.stroke()}
    disk(hx,hy,H*0.008,lit([60,42,34],env));
    // grazing sheep
    for(const s of this.sheep){s.x+=s.dir*s.v*dt*0.3*motion;if(s.x<0.5||s.x>0.97)s.dir*=-1;
      const x=s.x*W,y=this.hill(x)+H*0.04+s.d*H*0.16,k=0.7+s.d*0.6,bob=Math.abs(Math.sin(env.t*1.5+s.ph))*H*0.002;
      ctx.fillStyle=rgb(lit([238,236,228],env));ctx.beginPath();ctx.ellipse(x,y-H*0.012*k-bob,H*0.018*k,H*0.011*k,0,0,6.283);ctx.fill();
      ctx.fillStyle=rgb(lit([40,34,32],env));ctx.beginPath();ctx.ellipse(x+s.dir*H*0.017*k,y-H*0.014*k-bob,H*0.006*k,H*0.005*k,0,0,6.283);ctx.fill();
      ctx.fillRect(x-H*0.01*k,y-H*0.004*k,H*0.003*k,H*0.006*k);ctx.fillRect(x+H*0.008*k,y-H*0.004*k,H*0.003*k,H*0.006*k)}
    snow(env,dt,env.wi*50,()=>this.hill(W/2)+Math.random()*H*0.3);
    flies(env.su*(1-env.light)*16,0,W,H*0.66,H*0.95);
  }
};
registerScene('windmill',Windmill);
})();
