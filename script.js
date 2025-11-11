document.addEventListener("DOMContentLoaded", () => {
    const id = x => document.getElementById(x);
    const screenEnter = id('screen-enter');
    const screenCongrats = id('screen-congrats');
    const screenIntro = id('screen-intro');
    const screenGift = id('screen-gift');
    const screenFinal = id('screen-final');
    const startBtn = id('startBtn');
    const toIntroBtn = id('toIntroBtn');
    const beginGiftsBtn = id('beginGiftsBtn');
    const finalName = id('finalName');
    const congratsTitle = id('congratsTitle');
    const fireworksCanvas = id('fireworksCanvas');
    const F = fireworksCanvas.getContext('2d');
    const starCanvas = id('starCanvas');
    const S = starCanvas.getContext('2d');
    const giftTitle = id('giftTitle');
    const giftCounter = id('giftCounter');
    const giftImage = id('giftImage');
    const typewriter = id('typewriter');
    const prevBtn = id('prevBtn');
    const nextBtn = id('nextBtn');
    const celebrateBtn = id('celebrateBtn');
    const replayBtn = id('replayBtn');
    const voiceWish = id('voiceWish');
    const cheer = id('cheer');
    const bgMusic = id('bgMusic');

    // --- Gifts Array ---
    const gifts = [
        {title:"Trust  —  Signature Personalised Birthday Gift Hamper",img:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS7GgRi52JnjSggvaeHmHf8kvSHikZhTB0Hdfrf1MdcE5qjQ2Qo5nYNQUrQ5jvHd8LdHfSwzXX76YBdYhGu4t6idEExStwOCg_kyF80EL84rIUrAHb_eexD&usqp=CAc",msg:"Here's a safe space wrapped in something you can hold - Because all my secrets and trust are with you."},
        {title:"Joy  —  Mixed Roses Bouquet ",img:"https://www.fnp.com/images/pr/l/v20240426181219/colourful-12-mixed-roses-bouquet_3.jpg",msg:"These petals bloom for our laughter — may our joy always smell like this spring."},
        {title:"Comfort — Cream Best Friend Teddy Bear",img:"https://thumbs.dreamstime.com/b/best-friends-8289326.jpg",msg:"When the world feels heavy, let this hug remind you you’re never alone."},
        {title:"Loyalty — Best Friend Quote Mug",img:"https://www.onlinedelivery.in/images/detailed/34/5912e261e84cdb2738bb445d-large.jpg",msg:"Every morning this cup will whisper: I’m with you, and I will always be."},
        {title:"Inspiration — Perssonalized Motivational Book - Atomic Habits",img:"https://5.imimg.com/data5/SELLER/Default/2022/3/DS/FC/QN/148839554/atomic-habits.jpg",msg:"For every dream you chase, may this light guide you — just like you light up my world."},
        {title:"Empathy — A handwritten letter",img:"https://raghuharshi121.github.io/my-photo-page/myphoto.jpg",msg:"In the quiet of these pages you’ll find my heart listening — even without words."},
        {title:"Adventure — Travel journal",img:"https://m.media-amazon.com/images/I/81BbZ5LMSUL._AC_UF1000,1000_QL80_.jpg",msg:"For paths we’ve yet to wander and skies we’ve yet to see — let’s keep exploring, side by side."},
        {title:"Support — A skin care Kit",img:"https://m.media-amazon.com/images/I/71PSAJkaGtL.jpg",msg:"Here’s a little kit for when you’re weary — know that I’ve got your back, always."},
        {title:"Gratitude — A 'Thank you' Special Glass Jar",img:"https://thumbs.dreamstime.com/b/floral-arrangement-glass-jar-thank-you-message-soft-light-muted-tones-clear-holds-delicate-featuring-pink-roses-409314846.jpg",msg:"When you look, see what I see — a strong, beautiful soul."},
        {title:"Forgiveness — Cyanbamboo Engraved Inspirational Gift Stones-Words Natural Stones",img:"https://m.media-amazon.com/images/I/71xljfrkivL._AC_UY1100_.jpg",msg:"Let this stone hold all the forgives, the what‑ifs, and the new beginnings of us."},
        {title:"Wonder — A Star Map ",img:"https://i.etsystatic.com/23339379/r/il/414ffe/7179471574/il_fullxfull.7179471574_ic9f.jpg",msg:"Look up — the universe holds our story in its stars, and so do I."},
        {title:"Unconditional Love — A Small Photo Graph of you and me 💗",img:"https://raghuharshi121.github.io/my-photo-page/myphoto1.jpg",msg:"No matter the miles, the years, the ups or downs — my love for you has no conditions, no end ❤️"}
    ];

    let current=0,typing=false;
    fireworksCanvas.width = starCanvas.width = innerWidth;
    fireworksCanvas.height = starCanvas.height = innerHeight;

    // --- Starfield (70% screen) ---
    const stars = [];
    const starCount = 150; // fewer stars
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random()*innerWidth,
            y: Math.random()*innerHeight*0.7,
            r: Math.random()*4+1.5,   // slightly bigger
            a: Math.random()*Math.PI*2,
            rad: Math.random()*120+70,
            sp: 0.01+Math.random()*0.04
        });
    }
    function drawStars() {
        S.clearRect(0,0,starCanvas.width,starCanvas.height);
        stars.forEach(s=>{
            s.a += s.sp;
            const x = innerWidth/2 + Math.cos(s.a)*s.rad;
            const y = innerHeight/2 + Math.sin(s.a)*s.rad;
            S.fillStyle = "#d8d8d8ff";
            S.globalAlpha = 0.15;
            S.beginPath();
            S.arc(x,y,s.r,0,Math.PI*2);
            S.fill();
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();

    // --- Fireworks ---
    let particles = [];
    function createExplosion(x,y){
        for(let i=0;i<300;i++){
            const a = Math.random()*Math.PI*2, s = 3+Math.random()*6;
            particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,life:100+Math.random()*50,hue:Math.random()*360});
        }
    }
    function loopFireworks(){
        F.clearRect(0,0,fireworksCanvas.width,fireworksCanvas.height);
        for(let i=particles.length-1;i>=0;i--){
            const p = particles[i];
            p.x+=p.vx; p.y+=p.vy; p.vy+=0.05; p.life--;
            F.fillStyle=`hsla(${p.hue},100%,65%,${p.life/120})`;
            F.beginPath(); F.arc(p.x,p.y,2,0,Math.PI*2); F.fill();
            if(p.life<=0) particles.splice(i,1);
        }
        requestAnimationFrame(loopFireworks);
    }
    loopFireworks();

    // --- Start Journey Button ---
    startBtn.onclick = () => {
        const name = id('nameInput').value.trim();
        const dob = id('dobInput').value;
        if(!name || !dob){alert("Please fill name and date of birth"); return;}
        finalName.textContent = name;
        const age = Math.floor((Date.now()-new Date(dob))/(365.25*24*60*60*1000));
        congratsTitle.textContent = `Congratulations ${name}! 🎉 You’ve completed ${age} beautiful years!`;

        screenEnter.classList.add('hidden');
        screenCongrats.classList.remove('hidden');

        // --- Play background music ---
        bgMusic.volume = 0.3;
        bgMusic.loop = true;
        bgMusic.play().catch(err=>console.log("Autoplay blocked:", err));
    };

    toIntroBtn.onclick = ()=>{ screenCongrats.classList.add('hidden'); screenIntro.classList.remove('hidden'); };
    beginGiftsBtn.onclick = ()=>{ screenIntro.classList.add('hidden'); screenGift.classList.remove('hidden'); showGift(0); };

    function showGift(i){
        current = i;
        const g = gifts[i];
        giftTitle.textContent = g.title;
        giftCounter.textContent = `${i+1}/12`;
        giftImage.src = g.img;
        typewriter.textContent = '';
        nextBtn.disabled = true;
        typeWrite(g.msg);
    }

    async function typeWrite(text){
        typing = true;
        for(let ch of text){
            typewriter.textContent += ch;
            await new Promise(r=>setTimeout(r,40));
        }
        typing = false;
        nextBtn.disabled = false;
        createExplosion(innerWidth/2,innerHeight*0.4);
    }

    prevBtn.onclick = ()=>{ if(current>0) showGift(current-1); }
    nextBtn.onclick = ()=>{
        if(current<gifts.length-1) showGift(current+1);
        else {
            screenGift.classList.add('hidden');
            screenFinal.classList.remove('hidden');
            createExplosion(innerWidth/2,innerHeight/2);
        }
    };

    // --- Celebrate & Cake ---
    celebrateBtn.onclick = () => {
        voiceWish.volume = 1.0;
        voiceWish.play();
        cheer.play();

        // reduce bg music a bit while voice plays
        bgMusic.volume = 0.2;
        voiceWish.onended = () => { bgMusic.volume = 0.3; }; 

        const fireInterval = setInterval(() => {
            createExplosion(Math.random()*innerWidth, Math.random()*innerHeight*0.5);
        }, 300);

        createCake();

        // stop fireworks after 60 sec
        setTimeout(()=>{ clearInterval(fireInterval); },60000);

        cheer.onended = ()=>{ clearInterval(fireInterval); };
    };

    replayBtn.onclick = () => {
        screenFinal.classList.add('hidden');
        screenEnter.classList.remove('hidden');
        bgMusic.pause(); 
        bgMusic.currentTime = 0;
    };

    // --- Cake Animation ---
    function createCake(){
        if(document.querySelector('#cake')) return;
        const cake = document.createElement('div');
        cake.id = 'cake';
        cake.innerHTML = `<div class="cake-base"></div><div class="candles">
            <div class="candle"></div><div class="candle"></div><div class="candle"></div>
        </div>`;
        document.body.appendChild(cake);
        setTimeout(()=>{ cake.remove(); }, 60000);
    }
});

/* 
  document.addEventListener("DOMContentLoaded", () => {
    const id=x=>document.getElementById(x);
    const screenEnter=id('screen-enter');
    const screenCongrats=id('screen-congrats');
    const screenIntro=id('screen-intro');
    const screenGift=id('screen-gift');
    const screenFinal=id('screen-final');
    const startBtn=id('startBtn');
    const toIntroBtn=id('toIntroBtn');
    const beginGiftsBtn=id('beginGiftsBtn');
    const finalName=id('finalName');
    const congratsTitle=id('congratsTitle');
    const fireworksCanvas=id('fireworksCanvas');
    const F=fireworksCanvas.getContext('2d');
    const starCanvas=id('starCanvas');
    const S=starCanvas.getContext('2d');
    const giftTitle=id('giftTitle');
    const giftCounter=id('giftCounter');
    const giftImage=id('giftImage');
    const typewriter=id('typewriter');
    const prevBtn=id('prevBtn');
    const nextBtn=id('nextBtn');
    const celebrateBtn=id('celebrateBtn');
    const replayBtn=id('replayBtn');
    const voiceWish=id('voiceWish');
    const cheer=id('cheer');
    const bgMusic=id('bgMusic');

    const gifts=[
      {title:"Trust  —  Signature Personalised Birthday Gift Hamper",img:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS7GgRi52JnjSggvaeHmHf8kvSHikZhTB0Hdfrf1MdcE5qjQ2Qo5nYNQUrQ5jvHd8LdHfSwzXX76YBdYhGu4t6idEExStwOCg_kyF80EL84rIUrAHb_eexD&usqp=CAc",msg:"Here's a safe space wrapped in something you can hold - Because all my secrets and trust are with you."},
      {title:"Joy  —  Mixed Roses Bouquet ",img:"https://www.fnp.com/images/pr/l/v20240426181219/colourful-12-mixed-roses-bouquet_3.jpg",msg:"These petals bloom for our laughter — may our joy always smell like this spring."},
      {title:"Comfort — Cream Best Friend Teddy Bear",img:"https://thumbs.dreamstime.com/b/best-friends-8289326.jpg",msg:"When the world feels heavy, let this hug remind you you’re never alone."},
      {title:"Loyalty — Best Friend Quote Mug",img:"https://www.onlinedelivery.in/images/detailed/34/5912e261e84cdb2738bb445d-large.jpg",msg:"Every morning this cup will whisper: I’m with you, and I will always be."},
      {title:"Inspiration — Perssonalized Motivational Book - Atomic Habits",img:"https://5.imimg.com/data5/SELLER/Default/2022/3/DS/FC/QN/148839554/atomic-habits.jpg",msg:"For every dream you chase, may this light guide you — just like you light up my world."},
      {title:"Empathy — A handwritten letter",img:"https://raghuharshi121.github.io/my-photo-page/myphoto.jpg",msg:"In the quiet of these pages you’ll find my heart listening — even without words."},
      {title:"Adventure — Travel journal",img:"https://m.media-amazon.com/images/I/81BbZ5LMSUL._AC_UF1000,1000_QL80_.jpg",msg:"For paths we’ve yet to wander and skies we’ve yet to see — let’s keep exploring, side by side."},
      {title:"Support — A skin care Kit",img:"https://m.media-amazon.com/images/I/71PSAJkaGtL.jpg",msg:"Here’s a little kit for when you’re weary — know that I’ve got your back, always."},
      {title:"Gratitude — A 'Thank you' Special Glass Jar",img:"https://thumbs.dreamstime.com/b/floral-arrangement-glass-jar-thank-you-message-soft-light-muted-tones-clear-holds-delicate-featuring-pink-roses-409314846.jpg",msg:"When you look, see what I see — a strong, beautiful soul."},
      {title:"Forgiveness — Cyanbamboo Engraved Inspirational Gift Stones-Words Natural Stones",img:"https://m.media-amazon.com/images/I/71xljfrkivL._AC_UY1100_.jpg",msg:"Let this stone hold all the forgives, the what‑ifs, and the new beginnings of us.”."},
      {title:"Wonder — A Star Map ",img:"https://i.etsystatic.com/23339379/r/il/414ffe/7179471574/il_fullxfull.7179471574_ic9f.jpg",msg:"Look up — the universe holds our story in its stars, and so do I."},
      {title:"Unconditional Love — A Small Photo Graph of you and me 💗",img:"https://raghuharshi121.github.io/my-photo-page/myphoto1.jpg",msg:"No matter the miles, the years, the ups or downs — my love for you has no conditions, no end ❤️"}
    ];

    let current=0,typing=false;
    fireworksCanvas.width=starCanvas.width=innerWidth;
    fireworksCanvas.height=starCanvas.height=innerHeight;

    // --- Starfield ---
    const stars=[];
    for(let i=0;i<300;i++){
        stars.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+0.2,a:Math.random()*Math.PI*2,rad:Math.random()*120+70,sp:0.01+Math.random()*0.04});
    }
    function drawStars(){
        S.clearRect(0,0,starCanvas.width,starCanvas.height);
        stars.forEach(s=>{
            s.a+=s.sp;
            const x=innerWidth/2 + Math.cos(s.a)*s.rad;
            const y=innerHeight/2 + Math.sin(s.a)*s.rad;
            S.fillStyle="pink";
            S.globalAlpha=0.10;
            S.beginPath();S.arc(x,y,s.r,2,Math.PI*5);S.fill();
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();

    // --- Fireworks ---
    let particles=[];
    function createExplosion(x,y){
        for(let i=0;i<300;i++){
            const a=Math.random()*Math.PI*2,s=3+Math.random()*8;
            particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,life:100+Math.random()*60,hue:Math.random()*360});
        }
    }
    function loopFireworks(){
        F.clearRect(0,0,fireworksCanvas.width,fireworksCanvas.height);
        for(let i=particles.length-1;i>=0;i--){
            const p=particles[i];
            p.x+=p.vx; p.y+=p.vy; p.vy+=0.05; p.life--;
            F.fillStyle=`hsla(${p.hue},100%,65%,${p.life/120})`;
            F.beginPath(); F.arc(p.x,p.y,2,0,Math.PI*2); F.fill();
            if(p.life<=0) particles.splice(i,1);
        }
        requestAnimationFrame(loopFireworks);
    }
    loopFireworks();

    // --- Journey Buttons ---
    startBtn.onclick=()=>{
        const name=id('nameInput').value.trim();
        const dob=id('dobInput').value;
        if(!name || !dob){alert("Please fill name and date of birth");return;}
        finalName.textContent=name;
        const age=Math.floor((Date.now()-new Date(dob))/(365.25*24*60*60*1000));
        congratsTitle.textContent=`Congratulations ${name}! 🎉 You’ve completed ${age} beautiful years!`;
        screenEnter.classList.add('hidden');
        screenCongrats.classList.remove('hidden');

        // Start background music
        bgMusic.volume=0.2; // soft music
        bgMusic.play();
    };

    toIntroBtn.onclick=()=>{screenCongrats.classList.add('hidden');screenIntro.classList.remove('hidden');};
    beginGiftsBtn.onclick=()=>{screenIntro.classList.add('hidden');screenGift.classList.remove('hidden'); showGift(0);};

    function showGift(i){
        current=i;
        const g=gifts[i];
        giftTitle.textContent=g.title;
        giftCounter.textContent=`${i+1}/12`;
        giftImage.src=g.img;
        typewriter.textContent='';
        nextBtn.disabled=true;
        typeWrite(g.msg);
    }

    async function typeWrite(text){
        typing=true;
        for(let ch of text){
            typewriter.textContent+=ch;
            await new Promise(r=>setTimeout(r,40));
        }
        typing=false;
        nextBtn.disabled=false;
        createExplosion(innerWidth/2,innerHeight*0.4);
    }

    prevBtn.onclick=()=>{if(current>0)showGift(current-1);}
    nextBtn.onclick=()=>{
        if(current<gifts.length-1)showGift(current+1);
        else {
            screenGift.classList.add('hidden');
            screenFinal.classList.remove('hidden');
            createExplosion(innerWidth/2,innerHeight/2);
        }
    };

    // --- Celebrate ---
    celebrateBtn.onclick = () => {
    // Lower background music while voice plays
    bgMusic.volume = 0.1; // softer during voice

    voiceWish.volume = 1.0; // make voice loud
    voiceWish.play();
    cheer.volume = 0.7; // optional: cheer a bit lower than voice
    cheer.play();

    const fireInterval = setInterval(() => {
        createExplosion(Math.random() * innerWidth, Math.random() * innerHeight * 0.5);
    }, 300);

    createCake();

    // Restore bg music after voice ends
    voiceWish.onended = () => {
        bgMusic.volume = 0.3; // back to normal
        clearInterval(fireInterval);
    };
    cheer.onended = () => {
        clearInterval(fireInterval);
    };

    // Safety stop after 40 sec
    setTimeout(() => { clearInterval(fireInterval) }, 30000);
};


    // --- Cake Animation ---
    function createCake(){
        if(document.querySelector('#cake')) return;
        const cake=document.createElement('div');
        cake.id='cake';
        cake.innerHTML=`<div class="cake-base"></div><div class="candles">
            <div class="candle"></div><div class="candle"></div><div class="candle"></div>
        </div>`;
        document.body.appendChild(cake);
        setTimeout(()=>{cake.remove();},50000);
    }
}); */
