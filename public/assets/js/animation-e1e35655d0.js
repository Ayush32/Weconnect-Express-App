/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
var textWrapper=document.querySelector(".ml2");textWrapper.innerHTML=textWrapper.textContent.replace(/\S/g,"<span class='letter'>$&</span>"),anime.timeline({loop:!0}).add({targets:".ml2 .letter",scale:[4,1],opacity:[0,1],translateZ:0,easing:"easeOutExpo",duration:950,delay:(e,t)=>70*t}).add({targets:".ml2",opacity:0,duration:1e3,easing:"easeOutExpo",delay:1500});