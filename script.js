'use strict';

///////////////////////////////////////
// 1). open Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
// closing 
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// opening up form
 btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
 btnCloseModal.addEventListener('click', closeModal);
 overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// 2). Implemeting smooth scrolling on button
const btnScrollTo = document.querySelector('.btn--scroll-to');
 // section1 is where it will be scrolled
 const section1 = document.querySelector('#section--1');
 //Adding event listener to button
 btnScrollTo.addEventListener('click', function(e){
   // implementing scrolling
   section1.scrollIntoView({ behavior: 'smooth' });
 });

//  3). Implementing event delegation in NavBar Links
  
 document.querySelector('.nav__links').addEventListener
 ('click', function(e){
   e.preventDefault();
   console.log(e);
  // Matching 
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
 });
 

//  4). Nav links fade animation on cursor
 const nav = document.querySelector('.nav');

 //  creating a Fading function
 const handleHover = function (e) {
 if(e.target.classList.contains('nav__link')){
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');

  siblings.forEach(el => {
    if (el != link)el.style.opacity = this;
   });
   logo.style.opacity = this;
  }
 }

 //  adding animation on mouseover
 // bind creates an new function by using this keyword in upper function 
 nav.addEventListener('mouseover',handleHover.bind(0.5));
 //  removing fading animation while mouse moves out
 nav.addEventListener('mouseout', handleHover.bind(1));



// 5 sticky Navbar: with Intersection observer API
 const header =  document.querySelector('.header');
 const navHeight = nav.getBoundingClientRect().height;
 //sticky nav and in secondline we are destructuring Array
 const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
 };

 const headerObserver = new IntersectionObserver
 (stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
 });
 headerObserver.observe(header);
 console.log(headerObserver);


//  6). Implementing a tabbed on a btn
 const tabs = document.querySelectorAll('.operations__tab');
  const tabsContainer = document.querySelector('.operations__tab-container');
  const tabsContent = document.querySelectorAll('.operations__content');

  // functionality
 tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // handling no click rather then btn (guard clause)
  if(!clicked) return;
  // btn clicked functionality

  // non active btn
  tabs.forEach(t => t.classList.remove
    ('operations__tab--active'));
   tabsContent.forEach(c => c.classList.remove
  ('operations__content--active'));

  // active btn
  clicked.classList.add('operations__tab--active');

  // activating content area as per btn click
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
});

// operations content active are mentioned in css we are using those in able no 4 functionality

// 7). Adding animination to the all containers
 const allSections = document.querySelectorAll('.section');
 const revelSection = function (entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting)return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
 };

 const sectionObserver = new IntersectionObserver(revelSection, {
  root: null,
  threshold: 0.15,
 });

 allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
});

// 8). Implementing lazy loading images
 const imgTargets = document.querySelectorAll('img[data-src]');
 const loadImg = function(entries, observer) {
  const [entry] = entries;
  
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (){
    console.log('image load ')
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
 };
 const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
 });
 imgTargets.forEach(img => imgObserver.observe(img));


//  9). slider
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Right slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };
   //  left slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  // keyboard button arrow slider function
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
 //  dots for slider
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
