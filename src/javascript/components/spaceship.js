import React from 'react';
import Image from 'next/image';
import spaceship from '../../images/spaceship.png';
import upperCargo from '../../images/upper-cargo.png';
import underCargo from '../../images/under-cargo.png';
import flame1 from '../../images/flame-sprite-1.png';
import flame2 from '../../images/flame-sprite-2.png';
import flame3 from '../../images/flame-sprite-3.png';

export default class Spaceship extends React.Component {  
    
    nextSprite(beforeSprites, afterSprites) {
        beforeSprites.forEach(f => {f.style.opacity = "0"});
        afterSprites.forEach(f => {f.style.opacity = "1"});
    }

    restartSpaceshipBoosters(boosters, i, interval, start, end) {
        boosters.querySelectorAll("div.flame-sprite-1, div.flame-sprite-2, div.flame-sprite-3").forEach(flame=>{  
            if (i === start) {
                flame.style.display = "flex";         
                flame.style.transform = `scale(${(1.3 + ((start-i)/interval)/10)})`;
            } else if (i > (start + this.props.restartSpaceshipBoosters.intermediate) && i < end) {
                flame.style.display = "flex"; // We repeat this line of code to make sure that when the user gets back on the screen, he will see the boosters flammes
                flame.style.transform = `scale(${(1.3 + ((start-i + this.props.restartSpaceshipBoosters.intermediate)/interval)/10)})`;
            } else if (i >= end) { 
                flame.style.display = "flex"; // We repeat this line of code to make sure that when the user gets back on the screen, he will see the boosters flammes
                flame.style.transform = "scale(1.1)";
            }
        })
    }

    stopBoosters(boosters, i, interval, start, end) {
        boosters.querySelectorAll("div.flame-sprite-1, div.flame-sprite-2, div.flame-sprite-3").forEach(flame=>{
            if (i > start && i < end) {
                flame.style.transform = `scale(${1-(0.1*((i/interval)-start/interval))})`;           
            } else if (i >= end) {
                flame.style.display = "none";
            }
        })
    }

    defaultFlameSequence(boosters) { // boosters need to be a array
        let last = Date.now(); // timestamp of the last sequence() call
        
        let i = 0; // i will start to increment when user starts the undock sequence
        const sequence = () => {
            if (Date.now() >= last + 150) { // if current timestamp is = or > to last timestamp, execute the following code and reset last to current timestamp
                boosters.forEach(booster => {
                    const sprite1 = booster.querySelectorAll("div.flame-sprite-1");
                    const sprite2 = booster.querySelectorAll("div.flame-sprite-2");
                    const sprite3 = booster.querySelectorAll("div.flame-sprite-3");
                    if (sprite1[0] !== undefined) {
                        if (sprite1[0].style.opacity === "") {
                            sprite1.forEach(sprite => {sprite.style.opacity = "1" });
                        }
    
                        if (sprite1[0].style.opacity === "1") {
                            this.nextSprite(sprite1, sprite2);
                        } else if (sprite2[0].style.opacity === "1") {
                            this.nextSprite(sprite2, sprite3);
                        } else if (sprite3[0].style.opacity === "1") {
                            this.nextSprite(sprite3, sprite1);
                        }
                    }
                });

                if (document.querySelector(".spaceship-container").getAttribute("undock-sequence") !== null) {
                    if (document.querySelector(".spaceship-container").getAttribute("stop-boosters")  !== null) {
                        this.stopBoosters(boosters[0], i, 150, this.props.spaceshipBoostersSeq.start, this.props.spaceshipBoostersSeq.end); // spaceship boosters
                        this.stopBoosters(boosters[1], i, 150, this.props.cargoBoostersSeq.start, this.props.cargoBoostersSeq.end); // cargo boosters
                    }

                    if (i >= this.props.restartSpaceshipBoosters.start) {
                        document.querySelector(".spaceship-container").removeAttribute("stop-boosters")
                    }

                    this.restartSpaceshipBoosters(boosters[0], i, 150, this.props.restartSpaceshipBoosters.start, this.props.restartSpaceshipBoosters.end); // restart spaceship boosters
                    
           
                    if (i === 0) {
                        const startedAt = Date.now();
                        window.addEventListener("focus", ()=>{ // user leaves and gets back to screen, i updates to the current value so that animation doesnt pause
                            i = Math.floor((Date.now() - startedAt)/150)*150
                        })
                    }

                    i+=150;
                }
                last = Date.now();
            }   
            window.requestAnimationFrame(sequence);
        }

        sequence();  
    }

    shipTranslateIn() {
        document.querySelector(".spaceship-container").style.transition = "transform 6s ease-out"
        setTimeout(() => {
            document.querySelector(".spaceship-container").style.transform = "translateX(0px)"
        }, 1);
    }

    shipUndock(spaceship, cargo) {
        const last = Date.now();
        const startedAt = Date.now();
        let i = 0;
        
        const shipSplit = () => {
            spaceship.classList.toggle("ship-split-transformation");
            spaceship.style.transition = `transform ${this.props.shipSplitDuration}ms ease-in-out`;
        }

        const shipUp = () => {   
            spaceship.classList.toggle("ship-split-transformation");             
            spaceship.classList.toggle("ship-up-transformation");             
            spaceship.style.transition = `transform ${this.props.shipUpDuration}ms ease-in-out`;
            spaceship.style.zIndex = "5";
            cargo.style.transition = "transform 1950ms ease-in-out";
            cargo.style.transform = "scale(0.8)";
        }
        
        const shipRestart = () => {
            spaceship.classList.toggle("ship-up-transformation");  
            spaceship.classList.toggle("ship-restart-transformation");  
            spaceship.style.transition = "transform 4000ms cubic-bezier(1.000, 0.005, 0.745, 0.995)";
            cargo.style.transition = "transform 5000ms cubic-bezier(1.000, 0.005, 0.745, 0.995)";
            cargo.style.transform = "scale(0.8) translateX(-110vw)";
        }

        setTimeout(() => {shipSplit()},this.props.shipSplitTime);
        setTimeout(() => {shipUp()},this.props.shipUpTime);
        setTimeout(() => {shipRestart()},this.props.shipStartTime);
    }

    componentDidMount() {
        const spaceship = document.querySelector(".spaceship");
        const cargo = document.querySelector(".cargo");

        const spaceshipBoosters = document.querySelector(".spaceship-boosters");
        const cargoBoosters = document.querySelector(".cargo-boosters");

        this.shipTranslateIn();
        this.defaultFlameSequence([spaceshipBoosters, cargoBoosters]);
        
        const undockSequence = () => {
            this.shipUndock(spaceship, cargo);
            document.querySelector(".spaceship-container").setAttribute("undock-sequence", true);
            document.querySelector(".spaceship-container").setAttribute("stop-boosters", true);
            document.querySelector(".message").removeEventListener("click", undockSequence);
            document.querySelector(".message").removeEventListener("touchstart", undockSequence);
            window.removeEventListener("keyup", undockSequence);
        }

        setTimeout(() => {
            document.querySelector(".message").addEventListener("click", undockSequence);
            document.querySelector(".message").addEventListener("touchstart", undockSequence);
            window.addEventListener("keyup", undockSequence);
        },this.props.startTime)
    }


    render() {
        const flames = <div className = "flame-container">
                <div className = "flame-sprite-1"> 
                    <Image src={flame1} alt="Flame" className="flame "/>
                </div>
                <div className = "flame-sprite-2"> 
                    <Image src={flame2} alt="Flame" className="flame"/>
                </div>
                <div className = "flame-sprite-3"> 
                    <Image src={flame3} alt="Flame" className="flame"/>
                </div>
            </div>

        return <div className="spaceship-container">
            <div className= "spaceship">
                <div className= "spaceship-boosters">
                    <div className= "spaceship-booster-up">
                        {flames}
                    </div>
                    <div className= "spaceship-booster-mid-up">
                        {flames}
                    </div>
                    <div className= "spaceship-booster-mid-down">
                        {flames}
                    </div>
                    <div className= "spaceship-booster-down">
                        {flames}
                    </div>
                </div>
                <div className= "ship">
                    <Image src={spaceship} alt="Spaceship" className="spaceship-image"/>
                </div>            
            </div>

            <div className = "cargo">
            <div className= "cargo-boosters">
                <div className= "cargo-booster-up">
                    {flames}
                </div>
                <div className= "cargo-booster-down">
                    {flames}
                </div>
            </div>
            
            <div className= "under-cargo">
                    <Image src={underCargo} alt="Under-cargo" className="under-cargo-image"/>
                </div>
                <div className= "upper-cargo">
                    <Image src={upperCargo} alt="Upper-cargo" className="upper-cargo-image"/>
                </div>
            </div>
        </div>
    }
}