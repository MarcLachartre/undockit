import React from 'react';
import Image from 'next/image';
import spaceship from '../../images/spaceship.png';
import upperCargo from '../../images/upper-cargo.png';
import underCargo from '../../images/under-cargo.png';
import flame1 from '../../images/flame-sprite-1.png';
import flame2 from '../../images/flame-sprite-2.png';
import flame3 from '../../images/flame-sprite-3.png';

export default class Spaceship extends React.PureComponent {  
    constructor(props) {
        super(props);
        this.state = {timer: 0}
    }
    
    nextSprite(beforeSprites, afterSprites) {
        beforeSprites.forEach(f => {f.style.opacity = "0"});
        afterSprites.forEach(f => {f.style.opacity = "1"});
    }

    restartSpaceshipBoosters(boosters, start, end) {
        start = Math.floor(start/150);
        end = Math.floor(end/150);
        const endStartDifference = end - start;

        boosters.querySelectorAll("div.flame-sprite-1, div.flame-sprite-2, div.flame-sprite-3").forEach(flame=>{  
            if (this.props.spriteTimer >= start && this.props.spriteTimer < end) {
                let i = this.props.spriteTimer - start;
                flame.style.display = "flex"; // We repeat this line of code to make sure that when the user gets back on the screen, he will see the boosters flammes
                flame.style.transform = `scale(${(1.5 - (0.5/endStartDifference)*i)})`;
            } else if (this.props.spriteTimer >= end) { 
                flame.style.display = "flex"; // We repeat this line of code to make sure that when the user gets back on the screen, he will see the boosters flammes
                flame.style.transform = "scale(1)";
            }
        })
    }

    stopBoosters(boosters, start, end) {
        start = Math.floor(start/150);
        end = Math.floor(end/150);
        const endStartDifference = end - start;

        boosters.querySelectorAll("div.flame-sprite-1, div.flame-sprite-2, div.flame-sprite-3").forEach(flame => {    
            if (this.props.spriteTimer > start && this.props.spriteTimer < end - 2) {
                let i = this.props.spriteTimer - start;
                flame.style.transform = `scale(${1 - (1/endStartDifference)*i})`;           
            } else if (this.props.spriteTimer >= end - 2) {
                flame.style.display = "none";
            }
        })
    }

    defaultBoostersSequence(boosters) { // boosters needs to be a array
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
        })
    }

    startAnimationBoostersSequence(boosters) {
        this.stopBoosters(boosters[0], this.props.spaceshipBoostersSeq.start, this.props.spaceshipBoostersSeq.end); // spaceship boosters
        this.stopBoosters(boosters[1], this.props.cargoBoostersSeq.start, this.props.cargoBoostersSeq.end); // cargo boosters
        this.restartSpaceshipBoosters(boosters[0], this.props.restartSpaceshipBoosters.start, this.props.restartSpaceshipBoosters.end); // restart spaceship boosters
    }

    shipTranslateIn() {
        window.addEventListener("load", ()=> {
            document.querySelector(".spaceship-container").style.transform = "translateX(0px)";
            document.querySelector(".spaceship-container").style.transition = `transform ${this.props.shipTranslateInDuration/1000}s ease-out ${this.props.shipTranslateInDelay/1000}s`
        })
    }

    shipUndock() {
        const spaceship = document.querySelector(".spaceship");
        const cargo = document.querySelector(".cargo");
        
        const shipBacking = () => {
            spaceship.classList.toggle("ship-split-transformation");
            spaceship.style.transition = `transform ${this.props.shipBackingDuration}ms ease-in-out`;
        }

        const shipUp = () => {   
            spaceship.classList.toggle("ship-split-transformation");             
            spaceship.classList.toggle("ship-up-transformation");             
            spaceship.style.transition = `transform ${this.props.shipUpDuration}ms ease-in-out`;
            spaceship.style.zIndex = "5";
            cargo.style.transition = `transform ${this.props.shipUpDuration}ms ease-in-out`;
            cargo.style.transform = "scale(0.8)";
        }
        
        const shipRestart = () => {
            spaceship.classList.toggle("ship-up-transformation");  
            spaceship.classList.toggle("ship-restart-transformation");  
            spaceship.style.transition = `transform ${this.props.shipRestartDuration}ms cubic-bezier(1.000, 0.005, 0.745, 0.995)`;
            cargo.style.transition = `transform ${this.props.shipRestartDuration}ms cubic-bezier(1.000, 0.005, 0.745, 0.995)`;
            cargo.style.transform = "scale(0.8) translateX(-110vw)";
        }

        if (this.props.animationTimer*100 === this.props.shipBackingTime) {
            console.log("ship back")
            shipBacking();
        } else if (this.props.animationTimer*100 === this.props.shipUpTime) {
            console.log("ship up")
            shipUp();
        } else if (this.props.animationTimer*100 === this.props.shipRestartTime) {
            console.log("ship restart")
            shipRestart();
        }
    }

    componentDidUpdate(prevProps) {
        const spaceshipBoosters = document.querySelector(".spaceship-boosters");
        const cargoBoosters = document.querySelector(".cargo-boosters");
        if (this.props.animationTimer !== prevProps.animationTimer) {
            this.shipUndock();
        }

        if (this.props.spriteTimer !== prevProps.spriteTimer) {
            this.defaultBoostersSequence([spaceshipBoosters, cargoBoosters]);
            if (this.props.startAnimation === true) {
                this.startAnimationBoostersSequence([spaceshipBoosters, cargoBoosters]);
            }
        }
    }

    componentDidMount() {
        this.shipTranslateIn();
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