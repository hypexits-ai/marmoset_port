let studioImages = [];
function openStudio(id, count, index) {
    studioImages = Array.from({length:count}, (_,i) => `images/p${id}_${i+1}.webp`);
    cW = 'studio';
    cI = index;
    showLB(studioImages[index]);
    lb.style.display = 'flex';
}
const studioGrid = document.querySelector('.studio-grid');
for (const [id, name, count] of [
    [13, 'Bottle', 4],
    [14, 'Carpet', 12],
    [15, 'Case', 7],
    [16, 'Converter', 5],
]) {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.innerHTML = `<img loading="lazy" decoding="async" src="images/thumbs/p${id}_1.webp" alt="">
        <span>${name}<span aria-hidden="true">↗</span></span>`;
    tile.onclick = () => openStudio(id, count, 0);
    studioGrid.append(tile);
}
for(let i=0;i<11;i++) {
    const button=document.createElement('button');
    button.innerHTML=`<img loading="lazy" src="images/thumbs/p17_${i+1}.webp" alt="Cubik.One · ${i+1}">`;
    button.onclick=()=>openStudio(17,11,i);
    document.querySelector('.cubic-works').append(button);
}
document.addEventListener('keydown',event=>{
    if(lb.style.display!=='flex') return;
    if(event.key==='Escape') lb.style.display='none';
    if(event.key==='ArrowRight'||event.key==='ArrowLeft') changeLBImg(event.key==='ArrowRight'?1:-1,event);
});


