const studioProjects = [
    {id:13,count:4,ru:'Бутылка',en:'Bottle'},
    {id:14,count:12,ru:'Ковёр',en:'Carpet'},
    {id:15,count:7,ru:'Кейс',en:'Case'},
    {id:16,count:5,ru:'Конвертер',en:'Converter'}
];
const drum = document.querySelector('.studio-drum');
const arc = document.querySelector('.arc');
const marker = arc.querySelector('circle');
let selectedStudio = 0;
let studioImages = [];
function openStudio(id, count, index) {
    studioImages = Array.from({length:count}, (_,i) => `images/p${id}_${i+1}.webp`);
    cW = 'studio';
    cI = index;
    showLB(studioImages[index]);
    lb.style.display = 'flex';
}
function renderStudio() {
    const project = studioProjects[selectedStudio];
    drum.querySelectorAll('button').forEach((button,i) => {
        const offset = (i-selectedStudio+5)%4-1;
        button.style.transform = `translateX(${offset*81}%) rotateY(${-offset*27}deg) scale(${offset ? .82 : 1})`;
        button.style.filter = offset ? 'blur(3px)' : 'none';
        button.style.opacity = Math.abs(offset)>1 ? 0 : offset ? .48 : 1;
        button.style.zIndex = offset ? 1 : 2;
        button.tabIndex = offset ? -1 : 0;
        button.setAttribute('aria-label',studioProjects[i][currentLang]);
    });
    document.querySelector('.studio-caption').textContent = project[currentLang];
    const t = selectedStudio/3;
    marker.setAttribute('cx', 10+280*t);
    marker.setAttribute('cy', 34-80*t*(1-t));
    arc.setAttribute('aria-valuenow',selectedStudio+1);
    arc.setAttribute('aria-valuetext',project[currentLang]);
    arc.setAttribute('aria-label',currentLang==='ru'?'Выбор проекта':'Select project');
}
function stepStudio(delta) {
    selectedStudio = (selectedStudio+delta+4)%4;
    renderStudio();
}
studioProjects.forEach((project,i) => {
    const button = document.createElement('button');
    button.innerHTML = `<img loading="lazy" alt="" src="images/thumbs/p${project.id}_1.webp">`;
    button.onclick = () => {
        if(i===selectedStudio) openStudio(project.id,project.count,0);
        else { selectedStudio=i; renderStudio(); }
    };
    button.className = 'studio-card';
    drum.append(button);
});
for(let i=0;i<11;i++) {
    const button=document.createElement('button');
    button.innerHTML=`<img loading="lazy" src="images/thumbs/p17_${i+1}.webp" alt="Cubik.One · ${i+1}">`;
    button.onclick=()=>openStudio(17,11,i);
    document.querySelector('.cubic-works').append(button);
}
let lastStep=-Infinity;
drum.addEventListener('wheel',event=>{
    if(event.ctrlKey) return;
    event.preventDefault();
    if(performance.now()-lastStep<280) return;
    stepStudio(Math.sign(Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY));
    lastStep=performance.now();
},{passive:false});
function dragArc(event) {
    const box=arc.getBoundingClientRect();
    selectedStudio=Math.max(0,Math.min(3,Math.round(((event.clientX-box.left)/box.width*300-10)/280*3)));
    renderStudio();
}
arc.onpointerdown=event=>{arc.setPointerCapture(event.pointerId);dragArc(event)};
arc.onpointermove=event=>{if(arc.hasPointerCapture(event.pointerId)) dragArc(event)};
arc.onkeydown=event=>{
    if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();stepStudio(event.key==='ArrowRight'?1:-1)}
};
document.addEventListener('keydown',event=>{
    if(lb.style.display!=='flex') return;
    if(event.key==='Escape') lb.style.display='none';
    if(event.key==='ArrowRight'||event.key==='ArrowLeft') changeLBImg(event.key==='ArrowRight'?1:-1,event);
});

