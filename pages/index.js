import React from "react"

import Background from '../src/javascript/components/space-background.js';
import Spaceship from '../src/javascript/components/spaceship.js';
import Overlay from '../src/javascript/components/overlay.js';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.timer = this.timer.bind(this);
        this.state = {spriteTimer:-1, animationTimer: -1, startAnimation: false};
    }

    screenCleared(maxAnimationDuration, maxXTranslation) { //maximum time a star will spend on screen with the default scrolling animation
		return (maxAnimationDuration * 100 / maxXTranslation)
	}

    timer() { // timer creates a worker which contains a set interval (50ms interval). On page load sprite timer starts, and every 150ms, it updates the sprite timer. On animation start, every 100ms, the worker updates the animation timer
        const timer = new Worker("timer-worker.js");
        timer.postMessage("start sprite timer");
        timer.addEventListener("message", (event) => {
            if (event.data["spriteTimer"] !== undefined && event.data["animationTimer"] !== undefined){
                this.setState({
                    spriteTimer: event.data["spriteTimer"],
                    animationTimer: event.data["animationTimer"]
                });
            } else if (event.data["spriteTimer"] !== undefined ) {
                this.setState({
                    spriteTimer: event.data["spriteTimer"]
                });
            } else {
                this.setState({
                    animationTimer: event.data["animationTimer"]
                })
            }
        });
        return timer
    }

    timings() {
        // All the variables below can be modified if there are " ** " commented next to it. 
        // The other variables cannot really as their timings (delay and duration) are dependant from the other variables.
        // Below, for each stage of the animation, you can modify duration and delay.

        const shipTranslateInDelay = 1500; // ** -> delay before ship starts translating in the screen
        const shipTranslateInDuration = 7000; // ** -> duration of the ship translating in at the center of the screen
       
        const undockMessageDelay = 1000; // ** -> delay before undock message appears
        const undockMessageTime = shipTranslateInDelay + shipTranslateInDuration + undockMessageDelay; // -> undock message appears and is clickable to start the undocking sequence

        const startAnimationDelay = 0; // ** -> delay before the whole undocking animation starts after user input.

        const shipMinBackingTime = Math.ceil(Number((2*this.screenCleared(10, 450)*1000).toFixed(0))/150)*150; // -> Corresponds to the minimum time for the starts to stop.
        const shipBackingDelay = 1300; // ** -> delay before ship backs after user input
        const shipBackingTime = shipMinBackingTime + shipBackingDelay; // -> time when ship starts to split after user input
        const shipBackingDuration = 4000; // ** -> duration of the ship backing from cargo

        const shipUpDelay = 500; // ** -> delay before ship goes up after backing
        const shipUpTime = shipBackingTime + shipBackingDuration + shipBackingDelay + shipUpDelay; // -> time when ship starts to go up after backing
        const shipUpDuration = 4000; // ** -> duration of the ship going up

        const displaySystemsOnlineDelay = 1000; // ** -> delay before the all systems online appears after the timer starts(in other words after user input)
        const displaySystemsOnlineMsgTime = shipUpTime + shipUpDuration + displaySystemsOnlineDelay;// -> time when the all systems online appears after the timer starts(in other words after user input)
        const displaySystemsOnlineMsgDuration = 3000; // ** -> duration of the all systems online message
        
        const shipRestartDelay = 1000; // ** -> delay before ship restarts after the all systems online message disappears
        const shipRestartTime = displaySystemsOnlineMsgTime + displaySystemsOnlineMsgDuration + shipRestartDelay; // -> time when ship restarts its boosters after all systems online message disappears
        const shipRestartDuration = 5000; // ** -> duration of the ship restarting

        const restartStarScrollTime = shipRestartTime; // -> star scrolling animation needs to be at the same time as when the ship restarts

        const stopBoostersDuration = Math.ceil(this.screenCleared(10, 450)*1000); // -> Corresponds to the stars slowing down animation
        const spaceshipBoostersSeq = {start: (shipBackingTime - shipBackingDelay - stopBoostersDuration), end: (shipBackingTime - shipBackingDelay)}; // -> ship seq start corresponds to when the stars start to slow down, it ends at the same time as the stars stop
        const cargoBoostersSeq = {start:(shipBackingTime - shipBackingDelay - stopBoostersDuration), end: (shipBackingTime - shipBackingDelay)}; // -> booster seq start corresponds to when the stars start to slow down, it ends at the same time as the stars stop
        const restartSpaceshipBoosters = {start: shipRestartTime, end:shipRestartTime + shipRestartDuration}; // -> ship boosters restart when ship restarts (flammes will be big on restart and slowly get back to normal when ship rejoins the center of the page)

        return {
            shipTranslateInDelay: shipTranslateInDelay, 
            shipTranslateInDuration: shipTranslateInDuration, 
            undockMessageTime: undockMessageTime,
            startAnimationDelay: startAnimationDelay, 
            shipMinBackingTime: shipMinBackingTime,
            shipBackingDelay: shipBackingDelay,
            shipBackingTime: shipBackingTime,
            shipBackingDuration: shipBackingDuration,
            shipUpDelay: shipUpDelay,
            shipUpTime: shipUpTime,
            shipUpDuration: shipUpDuration,
            displaySystemsOnlineMsgTime: displaySystemsOnlineMsgTime,
            displaySystemsOnlineMsgDuration: displaySystemsOnlineMsgDuration,
            shipRestartDelay: shipRestartDelay,
            shipRestartTime: shipRestartTime,
            shipRestartDuration: shipRestartDuration,
            restartStarScrollTime: restartStarScrollTime,
            spaceshipBoostersSeq: spaceshipBoostersSeq,
            cargoBoostersSeq: cargoBoostersSeq,
            restartSpaceshipBoosters: restartSpaceshipBoosters
        }
    }


    componentDidMount() {
        const timer = this.timer(); // Sprite timer starts when component is mounted. (Interval 150ms)

        const startUndockTimer = () => { // callback for when the user starts the undock sequence, it starts the undocking sequence timer. (Interval 100ms)
            document.querySelector(".message").style.display = "none"; // timer starts, it means user gives input and starts timer, we then remove the "start undock procedure" message.
            setTimeout(()=>{
                timer.postMessage("start animation timer");
                this.setState({
                    startAnimation: true
                })
            }, this.timings().startAnimationDelay)
            
            // Following code prevents user to fire the animation several times;
            document.querySelector(".message").removeEventListener("click", startUndockTimer);
            document.querySelector(".message").removeEventListener("touchstart", startUndockTimer);
            window.removeEventListener("keyup", startUndockTimer);
        }

        setTimeout(()=>{ // when the ship is at the center of the screen, add listener to start the timer for the undocking sequence
            document.querySelector(".message").addEventListener("click", startUndockTimer);
            document.querySelector(".message").addEventListener("touchstart", startUndockTimer);
            window.addEventListener("keyup", startUndockTimer);
        }, this.timings().undockMessageTime)
    }


    render() { // Important: all timings need to be picked as a MULTIPLE OF 150 except for the Background stars js. Flamme stripes have an interval of 150.
        const timings = this.timings();
        return(
            <div className = "homepage">
                <Background 
                    animationTimer = {this.state.animationTimer}
                    screenClearedTime= {this.screenCleared(10, 450)}
                    restartStarScrollTime = {timings.restartStarScrollTime}
                />{

                <Spaceship 
                    animationTimer = {this.state.animationTimer}
                    spriteTimer = {this.state.spriteTimer}
                    startAnimation = {this.state.startAnimation}
                    undockMessageTime = {timings.undockMessageTime}
                    shipTranslateInDelay = {timings.shipTranslateInDelay}
                    shipTranslateInDuration = {timings.shipTranslateInDuration}
                    shipBackingTime = {timings.shipBackingTime} 
                    shipBackingDuration = {timings.shipBackingDuration} 
                    shipUpTime = {timings.shipUpTime} 
                    shipUpDuration = {timings.shipUpDuration} 
                    shipRestartTime = {timings.shipRestartTime} 
                    shipRestartDuration = {timings.shipRestartDuration}
                    spaceshipBoostersSeq = {timings.spaceshipBoostersSeq} 
                    cargoBoostersSeq = {timings.cargoBoostersSeq} 
                    restartSpaceshipBoosters = {timings.restartSpaceshipBoosters}
                />
                }
                
                <Overlay 
                    timer = {this.timer}
                    animationTimer = {this.state.animationTimer}
                    undockMessageTime= {timings.undockMessageTime} 
                    displaySystemsOnlineMsgTime = {timings.displaySystemsOnlineMsgTime} 
                    displaySystemsOnlineMsgDuration = {timings.displaySystemsOnlineMsgDuration}
                />
            </div>
        )
    }
}
  
export default HomePage

