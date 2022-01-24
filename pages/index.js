import React from "react"

import Background from '../src/javascript/components/space-background.js';
import Spaceship from '../src/javascript/components/spaceship.js';
import Overlay from '../src/javascript/components/overlay.js';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.startTime = 7050;
        this.timer = this.timer.bind(this);
        this.state = {timer: 0};
    }

    screenCleared(maxAnimationDuration, maxXTranslation) { //maximum time a star will spend on screen with the default scrolling animation
		return (maxAnimationDuration * 100 / maxXTranslation)
	}

    timer() {
        const timer = new Worker("timer-worker.js");
        timer.postMessage("")
        timer.addEventListener("message", (event) => {
            this.setState({
                timer: event.data
            });
        })
    }

    componentDidMount() {
        const startUndockTimer = () => {
            this.timer();
            // Following code prevents user to fire the animation several times;
            document.querySelector(".message").removeEventListener("click", startUndockTimer);
            document.querySelector(".message").removeEventListener("touchstart", startUndockTimer);
            window.removeEventListener("keyup", startUndockTimer);
        }

        setTimeout(()=>{
            document.querySelector(".message").addEventListener("click", startUndockTimer);
            document.querySelector(".message").addEventListener("touchstart", startUndockTimer);
            window.addEventListener("keyup", startUndockTimer);
        }, this.startTime)
    }

    render() { // Important: all timings need to be picked as a MULTIPLE OF 150 except for the Background stars js. Flamme stripes have an interval of 150.
        const startTime = this.startTime; // -> undock message appears and is clickable to start the undocking sequence
        const systemsOnlineMsgDuration = 3000; // -> all systems online message duration

        const shipMinBackingTime = Math.ceil(Number((2*this.screenCleared(10, 450)*1000).toFixed(0))/150)*150;

        const shipBackingDelay = 0; // -> delay before ship backs after user input
        const shipBackingTime = shipMinBackingTime + shipBackingDelay; // -> time when ship starts to split after user input
        const shipBackingDuration = 3000; // -> duration of the ship backing from cargo

        const shipUpDelay = 0 // -> delay before ship goes up after backing
        const shipUpTime = shipBackingTime + shipBackingDuration + shipBackingDelay + shipUpDelay; // -> time when ship starts to go up after backing
        const shipUpDuration = 2000; // -> duration of the ship going up
        
        const shipRestartDelay = 0; // -> delay before ship restarts after going up
        const shipRestartTime = shipBackingTime + shipBackingDuration + shipUpDuration + systemsOnlineMsgDuration + shipRestartDelay
        const shipRestartDuration = 4000; // -> duration of the ship restarting

        const displaySystemsOnlineDelay = 0 // -> delay before the all systems online appears after the timer starts(in other words after user input)
        const displaySystemsOnlineTime = shipUpTime + shipUpDuration + displaySystemsOnlineDelay// -> time when the all systems online appears after the timer starts(in other words after user input)
        const displaySystemsOnlineduration = 3000 // -> duration of the all systems online message

        const restartStarScrollTime = displaySystemsOnlineTime + displaySystemsOnlineduration;
        const spaceshipBoostersSeq = {start: (shipBackingTime-1050), end: shipBackingTime};
        const cargoBoostersSeq = {start:(shipBackingTime-1050), end: shipBackingTime};
        const restartSpaceshipBoosters = {start: restartStarScrollTime-50, intermediate: 3900, end:16800};

        return(
            <div className = "homepage">
                <Background 
                    timer = {this.state.timer}
                    screenClearedTime= {this.screenCleared(10, 450)}
                    restartStarScrollTime = {restartStarScrollTime}
                />{

                <Spaceship 
                    timer = {this.state.timer}
                    startTime = {startTime}
                    shipBackingTime = {shipBackingTime} 
                    shipBackingDuration = {shipBackingDuration} 
                    shipUpTime = {shipUpTime} 
                    shipUpDuration = {shipUpDuration} 
                    shipRestartTime = {shipRestartTime} 
                    shipRestartDuration = {shipRestartDuration}
                    spaceshipBoostersSeq = {spaceshipBoostersSeq} 
                    cargoBoostersSeq = {cargoBoostersSeq} 
                    restartSpaceshipBoosters = {restartSpaceshipBoosters}
                />
                }
                
                <Overlay 
                    timer = {this.state.timer}
                    startTime= {startTime} 
                    displaySystemsOnlineTime = {displaySystemsOnlineTime} 
                    systemsOnlineMsgDuration = {systemsOnlineMsgDuration}
                />
            </div>
        )
    }
}
  
export default HomePage

