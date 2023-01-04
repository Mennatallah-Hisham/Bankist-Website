'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const allSections = document.querySelectorAll('.section');

const openModal = function (e) {
  //a href="#"  3shan 2l page mtg3sh ll 2wl tani
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelectorAll('.nav__link');

// navLinks.forEach(function (link) {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const sectionId = link.getAttribute('href');
//     const sectionEl = document.querySelector(sectionId);

//     sectionEl.scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// btnScrollTo.addEventListener('click', () => {
//   section1.scrollIntoView({
//     behavior: 'smooth',
//   });
// });



///bdl m7ot eventhandler 3ala kol link 27otha 3l parent
// w lma y7sl bubble up h catch 2l event w handle it in the pparent
//event delegation

//1. add eventlistener to common parent element
//2.  determine what element originated the event
// matc elements you are interested in

document.querySelector('.nav__links').addEventListener
('click',function(e){
  e.preventDefault();
 if(e.target.classList.contains('nav__link')){
    const Id=e.target.getAttribute('href');

    const section =document.querySelector(Id);
  
    section.scrollIntoView({
          behavior: 'smooth',
      });
  
}
})



//////////////////////////////////////////////////////////////////////////////////////


///tabs

const tabs =document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");


tabsContainer.addEventListener("click",(e)=>{
  //3shan lw dost 3l txt / span /icon 2geb 2l button
  const clicked = e.target.closest("button");
  if(!clicked) return;
tabs.forEach((tab)=>{
  tab.classList.remove("operations__tab--active");
})
  clicked.classList.add("operations__tab--active");


 tabsContent.forEach(content => {
    content.classList.remove("operations__content--active");
    
  });

  const tabNumber=Number(clicked.getAttribute('data-tab'));
  
  document.querySelector(`.operations__content--${tabNumber}`).classList.add("operations__content--active");


  
})

//////////////////////////////////////////////////////////////////////////////////////


// menu fade animation

const nav = document.querySelector(".nav");
const [logo ,nav_ul]=[...nav.children];


function navFade (clicked,val){
  if(clicked.classList.contains('nav__link')){
    logo.style.opacity=val;
 [...nav_ul.children].forEach((child)=>{
 
  if(child !== clicked.closest("li"))  child.style.opacity=val;
   });



  }

}
nav.addEventListener('mouseover', function(e){navFade(e.target,"0.3")});

nav.addEventListener('mouseout', function(e){navFade(e.target,"1")});












// const obsOptions={
 
//   //element that the traget element intersects
//    // observe viewport (null)
//   root:null,

//   //percentage of interseting
//   threshold:[0,0.2],
//   //20%
//   //0  callback will trigger each time the traget element will move completely
//   // out if the view also as soon as it enters the view

// }
// const observer=new IntersectionObserver(obsCallback,obsOptions);

// //section 1 is the target element
// observer.observe(section1);





//////////////////////////////////////////////////////////////////////////////////////

////////////// Intersection observer API


// sticky nav


const header = document.querySelector(".header");

const stickyNav =function(entries){
  const[entry]=entries;
  if(!entry.isIntersecting){
    nav.classList.add('sticky');
  }else{
    nav.classList.remove('sticky');
  }


}

const headerObserver = new IntersectionObserver(
  stickyNav,{root:null,
  threshold:0,
rootMargin:'-90px',}
);


headerObserver.observe(header);




///// revealing elements on scroll

const allSection = document.querySelectorAll(".section");
const revealSection = function (enteries, observer){
  console.log(enteries);
  const [entery]=enteries;

  console.log(entery)
  console.log(entery.target)
  if(!entery.isIntersecting) return;

    entery.target.classList.remove("section--hidden");

    observer.unobserve(entery.target);

}

const sectionObserver = 
new IntersectionObserver(revealSection
  ,{root:null,
    threshold:0.1
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
})







/// lazyloading img
// src=>low resoltion imag  data-src=>high resolution img
// remove blur filter


const allImgs = document.querySelectorAll(".features__img");

const loadImage= function(enteries, observe){
  const [entry]=enteries;
if(!entry.isIntersecting) return;
const img =entry.target;
img.src=img.getAttribute("data-src");

// msh hshel 2l blur 8er lma 2l sora t load
img.addEventListener("load",()=>{
  img.classList.remove("lazy-img");
})

observe.unobserve(img);

}

const ImgObserver = new IntersectionObserver( loadImage,{
  root:null,
  threshold:0.13
})

 allImgs.forEach(function(img){
ImgObserver.observe(img);
 })



















// const alertH1=()=>{

//   alert(" h1  mouseenter eventlistner");
//   h1.removeEventListener('mouseenter',alertH1);
// };

// const h1=document.querySelector("h1");
// h1.addEventListener("mouseenter",alertH1);

// h1.addEventListener("mouseleave",()=>{

//   alert("leaving h1");
// })
// h1.addEventListener("mousemove",()=>{

//   alert("leaving h1");
// })

// console.log(document.getElementsByClassName('btn'));
// console.log(document.getElementById);

// //creating and inserting elements

// //.insetAdjacentHtml
// //.createElement('div')

// const headerEl =document.querySelector("header");
// const msg =document.createElement('div');
// msg.innerHTML=' we use cookies for better functionality<button class="btn btn--close-cookies" > got it <button/>';
// console.log(headerEl);

// headerEl.append(msg);

// const btnDelete=document.querySelector(".btn--close-cookies");
// console.log(btnDelete);

// btnDelete.addEventListener('click',()=>{
//   console.log("delete");
//   msg.remove();
//   // headerEl.removeChild(msg);
// });

// console.log(headerEl.className)






//slider

const slides =document.querySelectorAll(".slide");
const slider=document.querySelector(".slider");
const slideRight =document.querySelector(".slider__btn--right");
const slideLeft =document.querySelector(".slider__btn--left");
const dotContainer =document.querySelector(".dots");


let currentSlide=0;
const maxslide=slides.length;





const createDots=function(){
  
slides.forEach((s,i)=>{
  const button=` <button class="dots__dot" data-slide="${i}"></button>`;
  dotContainer.insertAdjacentHTML("beforeend",button);
})
 
 
}
const activateDot=function(slide){
  const dots=document.querySelectorAll(".dots__dot");
  dots.forEach((dot)=>dot.classList.remove("dots__dot--active"));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
  
}

const nextSlide= function(){
  if(currentSlide===maxslide-1){
    currentSlide=0;
  }else{
    currentSlide++;
  }
 
  // -100%,0%, 100%  200 %  300%
goToSlide(currentSlide);
activateDot(currentSlide);
}

const prevSlide=function(){
  if(currentSlide===0){
    currentSlide=maxslide-1
  }else{
    currentSlide--;
  }

goToSlide(currentSlide);
activateDot(currentSlide);


}

const goToSlide =function(slide){
  slides.forEach((s,i)=>s.style.transform=`translateX(${(i-slide)*100}%)`);

}




const initSilder=function(){
//put slides side by side
// 0 100%  200%  300%
createDots();
goToSlide(0);
activateDot(0);
}

initSilder();
slideRight.addEventListener("click",nextSlide);
slideLeft.addEventListener("click",prevSlide);
document.addEventListener("keydown",function(e){
  if(e.key==='ArrowLeft')
  prevSlide();
});

document.addEventListener("keydown",function(e){
  if(e.key==='ArrowRight')
  nextSlide();
  
});



dotContainer.addEventListener("click",function(e){
  const targetEl=e.target;
 if(targetEl.classList.contains("dots__dot")
 ){
  const slide=targetEl.getAttribute("data-slide")
  activateDot(slide);
  goToSlide(slide);
 }

})