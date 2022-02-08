import React from 'react';

export default class Background extends React.Component {
	addStarsToBackground(amount, limit, easeoutStars, defaultEndStars) { //adding stars to the background and preparing them for their animation (we add them to the "left" of the screen and animate them to the right). amount is the amount of stars to add, limit is the number for which we will change the style of star, easeOutStars if set to true defines if the star will slowdown and stop on user input, defaultEndStars are the stars that will restart.		

		const css = "";
		for (let i = 0; i < amount ; i ++) {
			const star = document.createElement("div");
			star.classList.add("star");

			const starShade = document.createElement("div");
			starShade.classList.add("star-shade");
			star.appendChild(starShade);

			star.style.top = `${(this.randomNumber(0, 100)).toFixed(2)}vh`;
			star.style.left = `${this.randomNumber(0, 300) + 100}vw`;
			star.style.height = `${this.randomNumber(2, 4).toFixed(0)}px`;
			this.addTypeToStar(star, i, limit);

			if (easeoutStars === true) { //initializing ease out stars by setting their width and xtranslation.
				star.classList.add("ease-out-star");
				const xTranslation = this.randomNumber(99, 230);
				star.style.width = `${this.starWidth(undefined, xTranslation, 450, 10)}vw`;
				star.setAttribute("xTranslation", xTranslation);
				star.setAttribute("i", i);
				const starEaseOutStyle = this.createEaseOutStyle(star, i, xTranslation);
				css = css.concat(' ', starEaseOutStyle)
				
			} else if (defaultEndStars === true) { // initializing slow scrolling stars for the end of the animation when background starts to move again
				star.classList.add("default-end");
				star.style.width = `${this.randomNumber(2, 4)}px`;
				star.style.height = star.style.width;
				star.children[0].style.opacity = 0; 
			} else {
				star.classList.add("default");
			}
			document.querySelector(".background-container").appendChild(star);
		}
		if (easeoutStars === true) {	
			console.log(css)
		
    		const head = document.head || document.getElementsByTagName('head')[0];
    		const style = document.createElement('style');

			head.appendChild(style);

			style.type = 'text/css';
			if (style.styleSheet){
			// This is required for IE8 and below.
			style.styleSheet.cssText = css;
			} else {
			style.appendChild(document.createTextNode(css));
			}
		}

	}

	addTypeToStar(star, i, limit) { // Star is dwarf or giant or classic
		if (i>= limit && i<(2*limit)) {
			star.classList.add("dwarf");
		} else if (i>=(2*limit)) {
			star.classList.add("giant");
		}
	}

	startStarScrolling(starSelector, minDuration, maxDuration) {
		document.querySelectorAll(starSelector).forEach(star => {
			const animationDuration = this.randomNumber(minDuration, maxDuration);
			star.style.animation= "0s linear 0s infinite running slide";
			star.style.animationDuration = `${animationDuration}s`;
			star.style.animationDelay = `${this.randomNumber(0, 2)}s`;
			if (starSelector === "div.star.default") {
				const width = this.starWidth(animationDuration);
				star.style.width = `${width}vw`;
			}

			width >= 16 ? star.style.zIndex = 5 : star.style.zIndex = 0;
		})	
	}

	randomNumber(min, max) {
		return Number(Math.random() * (max - min + 1) + min);
	}
	
	starWidth(duration, translation, maxTranslation, maxDuration) { 
		return (translation !== undefined) ? ((maxDuration - ((this.props.screenClearedTime * maxTranslation)/translation))*2) + 6 : ((( 10 - Number(duration)) * 2) + 6);
	}


	stopDefaultStarScrolling() {
		if (this.props.animationTimer === 0) {
			document.querySelectorAll("div.star.default").forEach(star => {
				(this.isOnRightSideScreen(star)) ?  star.remove() :  star.addEventListener("animationiteration", () => {star.remove()});
			});
		}
	}

	isOnRightSideScreen = (star) => {
		return (Number(star.getBoundingClientRect().x) > window.innerWidth + Number((star.style.width).substring(0, star.style.width.length - 2))*10);
	}

	createEaseOutStyle(star, i, xTranslation) {
		console.log(document.head)
		let starEaseOutStyle = " "

			if (window.matchMedia("(min-width: 1200px)").matches === true) {
				starEaseOutStyle = `.star-ease-out-${i} {transition-timing-function: ease-out; transition-duration: ${2*this.props.screenClearedTime}s !important; transition-delay: ${this.props.screenClearedTime} !important; transform: translate(${-xTranslation -xTranslation/2}vw) rotateY(89.2deg) !important}`;
			} else if (window.matchMedia("(min-width: 992px)").matches === true) {
				starEaseOutStyle = `.star-ease-out-${i} {transition-timing-function: ease-out; transition-duration: ${2*this.props.screenClearedTime}s !important; transition-delay: ${this.props.screenClearedTime} !important; transform: translate(${-xTranslation -xTranslation/2}vw) rotateY(89deg) !important}`;
			} else if (window.matchMedia("(min-width: 480px)").matches === true) {
				starEaseOutStyle = `.star-ease-out-${i} {transition-timing-function: ease-out; transition-duration: ${2*this.props.screenClearedTime}s !important; transition-delay: ${this.props.screenClearedTime} !important; transform: translate(${-xTranslation -xTranslation/2}vw) rotateY(88.4deg) !important}`;
			} else if (window.matchMedia("(min-width: 320px)").matches === true) {
				starEaseOutStyle = `.star-ease-out-${i} {transition-timing-function: ease-out; transition-duration: ${2*this.props.screenClearedTime}s !important; transition-delay: ${this.props.screenClearedTime} !important; transform: translate(${-xTranslation -xTranslation/2}vw) rotateY(85deg) !important}`;			
			} 

		return starEaseOutStyle
	}

	async startStarEaseOut(timer) { // this will be split in two transitions. The first transition will mimic the default stars animation until the default stars are cleared from the screen. The second one will be the ease out stars.
		if (Number(timer) === 0) {
			document.querySelectorAll("div.star.ease-out-star").forEach((star) => {
				const xTranslation = star.attributes.xTranslation.value;
				// star.classList.add(`star-ease-out-${star.attributes.i.value}`);
				star.style.transitionDuration = `${this.props.screenClearedTime}s`;
				star.style.transform = `translateX(-${xTranslation}vw)`;
				star.children[0].style.transitionDelay = `${this.props.screenClearedTime}s`;
				star.children[0].style.transitionDuration = `${this.props.screenClearedTime}s`;
				star.children[0].style.opacity = 0; 
			
				
				star.classList.toggle(`star-ease-out-${star.attributes.i.value}`)
				// console.log(star.classList)
			});

		// } else if (Number(timer) === Number((this.props.screenClearedTime*10).toFixed(0))) {
		// 	document.querySelectorAll("div.star.ease-out-star").forEach((star) => {
		// 		const xTranslation = star.attributes.xTranslation.value;
		// 		star.style.transitionTimingFunction = "ease-out";
		// 		star.style.transitionDuration = `${2*(this.props.screenClearedTime/2)}s`;
		// 		if (window.matchMedia("(min-width: 1200px)").matches === true) {
		// 			star.style.transform = `translate(${-xTranslation -xTranslation/2}vw) rotateY(89.2deg) `;
		// 		} else if (window.matchMedia("(min-width: 992px)").matches === true) {
		// 			star.style.transform = `translateX(${-xTranslation -xTranslation/2}vw) rotateY(89deg)`;
		// 		} else if (window.matchMedia("(min-width: 480px)").matches === true) {
		// 			star.style.transform = `translateX(${-xTranslation -xTranslation/2}vw) rotateY(88.2deg)`;
		// 		} else if (window.matchMedia("(min-width: 320px)").matches === true) {
		// 			star.style.transform = `translateX(${-xTranslation -xTranslation/2}vw) rotateY(85deg)`;
		// 		} 
				
				
		// 	})

		} else if (Number(timer) === Number(((2*this.props.screenClearedTime)*10).toFixed(0))) {
			document.querySelectorAll("div.star.ease-out-star").forEach((star) => {
				star.classList.remove(`star-ease-out-${star.attributes.i.value}`)
				const xTranslation = star.attributes.xTranslation.value;
				star.style.transitionDuration = "0s";
				star.style.width = star.style.height;
				star.style.transform = `translateX(${-xTranslation -xTranslation/2}vw) rotateY(0deg)`;
			})
		}
	}

	restartStarScroll() {
		if (this.props.animationTimer*100 === this.props.restartStarScrollTime) {
			console.log("restart star scroll")
			document.querySelectorAll("div.star.ease-out-star").forEach(star => {
				this.isOnRightSideScreen(star) ? star.remove() : false;
				const xTranslation = star.attributes.xTranslation.value;
				star.style.transform = `translateX(-${2.5*xTranslation}vw)`;
				star.style.transitionDuration = `${15*this.props.screenClearedTime}s`;
				star.style.transitionTimingFunction = "ease-in";			
			});

			this.startStarScrolling("div.star.default-end", 90, 180);
		}
	}

	async componentDidMount() { // We add here all the necessary stars for the animation.
		await this.addStarsToBackground(300, 100, false, false); // We add the default stars to the background. (default animation)
		await this.addStarsToBackground(270, 90, true, false); // We have to create the easing out stars right at the beginning of page load (these stars, when user gives input, will slow down on screen). Creating them later causes the default stars animation to lag. The creation of elements with a css width forces the container to recalculate its size and it makes the default running animation lag.
		await this.addStarsToBackground(300, 100, false, true); // we also need to create the star that we ease in when the small ship will start again.
		await this.startStarScrolling("div.star.default", 3, 10); // We make the default stars animate themselves (the default animation).
	}

	componentDidUpdate(prevProps) { // We create two animations here, one for the default behavior with the repeating stars scrolling from right to left giving an impression of fast space travel and then an animation with the stars easing out on screen, giving the impression of the fast space travel stopping. (ease out cannot be done with css property animation, the animation either pause or stops, we wait for the default animation stars to clear out and then we start a star ease out on screen with the "transition" css property)
		if (prevProps.animationTimer !== this.props.animationTimer) {
			this.stopDefaultStarScrolling(); // default stars are stopping
			this.restartStarScroll(); // stars that will ease out on the screen start
			this.startStarEaseOut(this.props.animationTimer);  // after animation ends, new stars are scrolling slowly
		}
	}

	render() {
		return <div className= "background-container">
		</div>
	}
}