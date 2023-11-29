"use strict";

import {ru, fr, en} from '../js/languages.js'

function translate(){
	if(this.innerHTML.toLowerCase() === "рус"){
		let count = 0;
		ru[5] = currentLang.innerHTML;
		for(let i = 0; i < allText.length; i++){
			if(i === 12){
				for(let j of allText[i].childNodes){
					if(j.nodeType === 3){
						j.data = ru[count]
						count++;
					}
				} 
			}
			else{
				allText[i].innerHTML = ru[count];
				count++
			}
		}
		[this.innerHTML,currentLang.innerHTML] = [currentLang.innerHTML, this.innerHTML]
		currentLang.innerHTML = "рус";
		document.querySelector(".newsletter__sup-title").style.marginTop = "20px";
		document.querySelector(".feature__create").style.letterSpacing = "";
		for(let i of document.querySelectorAll(".menu__item")){
			i.style = "";
			if(i.classList.contains("for-fr")){
				i.classList.remove("for-fr");
			}
		}
		switchPlace.style.display = "none";
		hasOpened = false;
	}
	else if(this.innerHTML.toLowerCase() === "eng"){
		let count = 0;
		en[5] = currentLang.innerHTML;
		for(let i = 0; i < allText.length; i++){
			if(i === 12){
				for(let j of allText[i].childNodes){
					if(j.nodeType === 3){
						j.data = en[count]
						count++;
					}
				} 
			}else{
				allText[i].innerHTML = en[count];
				count++
			}
		}
		[this.innerHTML,currentLang.innerHTML] = [currentLang.innerHTML, this.innerHTML]
		currentLang.innerHTML = "eng";
		document.querySelector(".newsletter__sup-title").style.marginTop = "";
		document.querySelector(".feature__create").style.letterSpacing = "";
		for(let i of document.querySelectorAll(".menu__item")){
			i.style = "";
			if(i.classList.contains("for-fr")){
				i.classList.remove("for-fr");
			}
		}
		switchPlace.style.display = "none";
		hasOpened = false;

	}

	else if(this.innerHTML.toLowerCase() === "fra"){
		let count = 0;
		fr[5] = currentLang.innerHTML;
		for(let i = 0; i < allText.length; i++){
			if(i === 12){
				for(let j of allText[i].childNodes){
					if(j.nodeType === 3){
						j.data = fr[count]
						count++;
					}
				} 
			}else{
				allText[i].innerHTML = fr[count];
				count++
			}
		}
		[this.innerHTML,currentLang.innerHTML] = [currentLang.innerHTML, this.innerHTML]
		currentLang.innerHTML = "fra";
		document.querySelector(".newsletter__sup-title").style.marginTop = "20px";
		document.querySelector(".feature__create").style.letterSpacing = "0px";
		for(let i of document.querySelectorAll(".menu__item")){
			i.classList.toggle("for-fr")
		}
		switchPlace.style.display = "none";
		hasOpened = false;
	}		
}

const toStory = document.querySelector(".arr-down");
const html = document.documentElement; 
const body = document.body;
const switcher = document.querySelector(".switcher");
const switchPlace = document.querySelector(".place-for-choose");
const joystick = document.querySelector('.joystick');
const burger = document.querySelector('.burger');
let  mobileMenu = document.querySelector(".menu-mobile")
mobileMenu = mobileMenu.getElementsByTagName("a");

let imgWrapper = document.querySelector(".img__wrapper");


let hasOpened = false;
let anoterLang = document.querySelectorAll(".another");
let currentLang = document.querySelector(".current-lang");	
let allText = document.querySelectorAll(".text");

let sliderButtons = document.querySelectorAll(".gallery__switcher");
let sliderImages = document.querySelector(".gallery__img").children;
let sliderPoints = document.querySelector(".gallery__points").children;
let features = document.querySelectorAll(".feature")


let currentPosImg = 0;

let multiMenu = [
	["main", "about", "game features", "system requirements", "quotes"],
	["Главая", "О нас",	"Особенности игры", "Системные требования","Отзывы",],
	["Maison", "À propos de nous", "Caractéristiques de jeu","Configuration requise","Commentaires"],
]


/* to STORY button arrow down*/
toStory.addEventListener("click", ()=>{
	let currentPosY = window.scrollY;
	body.style.transition = "2s";
	body.style.transform = "translateY(" + -(1000 - (+currentPosY)) +"px )";
	body.style.overflow = "hidden";
	body.addEventListener("transitionend", function clearStyle(){
		body.style = "";
		html.scrollTop = 1000;
		body.removeEventListener("transitionend", clearStyle)
	});
})



/* to open/close arrow to choose another language */ 
switcher.addEventListener("click", ()=>{
	if(!hasOpened){
		switchPlace.style.display = "flex";
		hasOpened = true;
	}
	else{
		switchPlace.style.display = "none";
		hasOpened = false;
	}
})



/* click for another language */
for(let i of anoterLang){
	i.addEventListener("click", translate);
}



/* slider */
sliderButtons[0].addEventListener("click", ()=>{
	let frontImg = document.querySelector(".gallery__img-first");
	let currentFrontPoint = +frontImg.getAttribute("value")
	

	if(currentFrontPoint === 3){
		let nextImg = document.querySelector('[value="1"]')

		frontImg.classList.remove("gallery__img-first")
		frontImg.classList.add(nextImg.classList[0])

		nextImg.classList.remove(nextImg.classList[0])
		nextImg.classList.add("gallery__img-first")

		document.querySelector('button[value="3"]').classList.remove("rightmost")
		document.querySelector('button[value="1"]').classList.add("leftmost")
	}else{
		let currentActivePoint = document.querySelector('button[value="' + currentFrontPoint + '"]');
		let nextImg = document.querySelector('[value="' + (++currentFrontPoint) + '"]')
	
		frontImg.classList.remove("gallery__img-first")
		frontImg.classList.add(nextImg.classList[0])

		nextImg.classList.remove(nextImg.classList[0])
		nextImg.classList.add("gallery__img-first")

		currentActivePoint.classList.remove(currentActivePoint.classList[0])
		if(+currentActivePoint.nextElementSibling.getAttribute("value") === 3){
			currentActivePoint.nextElementSibling.classList.add("rightmost")
		}else{
			currentActivePoint.nextElementSibling.classList.add("current")
		}
	}




})


for(let i of sliderPoints){
	i.addEventListener("click", function(){
		let pointVal = this.getAttribute("value");
		let imgSuchPoint = document.querySelector('[value ="'  + pointVal +'"]')
		let currentImg = document.querySelector(".gallery__img-first");

		let currentClass = currentImg.classList[0]
		let selectedClass = imgSuchPoint.classList[0];
		currentPosImg = +pointVal - 1

		for(let i of sliderPoints){
			i.classList.remove(i.classList[0])
		}

		imgSuchPoint.classList.remove(selectedClass)
		imgSuchPoint.classList.add(currentClass)

		currentImg.classList.remove(currentClass)
		currentImg.classList.add(selectedClass)

		if(+pointVal === 1){
			this.classList.add("leftmost")
		}else if(+pointVal === sliderImages.length){
			this.classList.add("rightmost")
		}else{
			this.classList.add("current")
		}
	})
}

/* dinamic lists*/


for(let i of features){
	i.addEventListener("click", function(){
		i.classList.toggle("nextVis");
		i.classList.toggle("feature_active");
		if(i.classList.contains("nextVis") && i !== features[features.length-1]){
			i.nextElementSibling.style.display = "block";
			i.nextElementSibling.nextElementSibling.style.marginTop = "0px";
		}else{
			i.nextElementSibling.style.display = "none";
		}

		if(i.nextElementSibling.style.display === "none"){
			i.style.marginBottom = "36px";

		}
		else if(i.nextElementSibling.style.display !== "none"){
			i.style.marginBottom = "";
		}

		if(i === features[features.length-1] && i.classList.contains("nextVis")){
			i.style.marginBottom = "0px";
			i.nextElementSibling.style.display = "block";
			i.nextElementSibling.classList.add("survive__text_last");
		}else if(i === features[features.length-1] && !i.classList.contains("nextVis")){
			i.nextElementSibling.style.display = "none";
		}
	})
}



/* joystick  */

joystick.addEventListener("click", ()=>{
	document.querySelector(".mobile-links__wrapper").classList.toggle("platform_vis")
})

burger.addEventListener("click", ()=>{
	document.querySelector(".burger__svg").classList.toggle("burger__svg-hide");
	document.querySelector(".burger__close").classList.toggle("burger__close-vis");
	document.querySelector(".mobile-menu-open").classList.toggle("mobile-menu-open_v");
	document.querySelector(".main").classList.toggle("hidden");
	body.classList.toggle("hidden");



	if(currentLang.innerHTML.toLowerCase() === "eng"){
		for(let i = 0; i < mobileMenu.length; i++){
			mobileMenu[i].innerHTML =  multiMenu[0][i];
		}
	}
	else if(currentLang.innerHTML.toLowerCase() === "рус"){
		for(let i = 0; i < mobileMenu.length; i++){
			mobileMenu[i].innerHTML =  multiMenu[1][i];
		}
	}
	else if(currentLang.innerHTML.toLowerCase() === "fra"){
		for(let i = 0; i < mobileMenu.length; i++){
			mobileMenu[i].innerHTML =  multiMenu[2][i];
		}
	}
})

for(let i of document.querySelector(".menu-mobile").children){
	i.addEventListener("click", ()=>{
		document.querySelector(".burger__svg").classList.toggle("burger__svg-hide");
		document.querySelector(".burger__close").classList.toggle("burger__close-vis");
		document.querySelector(".mobile-menu-open").classList.toggle("mobile-menu-open_v");
		document.querySelector(".main").classList.toggle("hidden");
		body.classList.toggle("hidden");
	})
}
for(let i of document.querySelector(".mobile-links-platform").children){
	i.addEventListener("click", ()=>{
		document.querySelector(".burger__svg").classList.toggle("burger__svg-hide");
		document.querySelector(".burger__close").classList.toggle("burger__close-vis");
		document.querySelector(".mobile-menu-open").classList.toggle("mobile-menu-open_v");
		document.querySelector(".main").classList.toggle("hidden");
		body.classList.toggle("hidden");
	})
}

window.addEventListener("resize", ()=>{
	if(document.querySelector(".mobile-menu-open").offsetWidth > 600){
		document.querySelector(".mobile-menu-open").classList.toggle("mobile-menu-open_v");
		document.querySelector(".burger__svg").classList.toggle("burger__svg-hide");
		document.querySelector(".burger__close").classList.toggle("burger__close-vis");
	}
})
