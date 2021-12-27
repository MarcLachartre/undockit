import React from "react"

import Background from '../src/javascript/components/space-background.js';
import Spaceship from '../src/javascript/components/spaceship.js';
import Overlay from '../src/javascript/components/overlay.js';
import '../public/undock-worker.js';

class HomePage extends React.Component {

    screenCleared(maxAnimationDuration, maxXTranslation) { //maximum time a star will spend on screen with the default scrolling animation
		return (maxAnimationDuration * 100 / maxXTranslation)
	}

    render() { //Important: all timings need to be done as a MULTIPLE OF 150. Flamme stripes have an interval of 150.
        const shipSplitTime = 5100;
        const shipSplitDuration = 3000;
        const shipRestartDuration = 450;

        const shipUpDuration = 1950; 
        const systemsOnlineDuration = 3000;

        const startTime = 7000;

        return(
            <div className = "homepage">
                <Background 
                    startTime = {startTime}
                    screenClearedTime= {this.screenCleared(10, 450)}
                    restartStarScrollTime = {13500}
                />
                <Spaceship 
                    startTime = {startTime}
                    shipSplitTime = {shipSplitTime} 
                    shipSplitDuration = {shipSplitDuration} 
                    shipUpTime = {shipSplitTime + shipSplitDuration} 
                    shipUpDuration = {shipUpDuration} 
                    shipStartTime = {shipSplitTime + shipSplitDuration + shipUpDuration + systemsOnlineDuration + shipRestartDuration} 
                    spaceshipBoostersSeq = {{start:3000, end: 4050}} 
                    cargoBoostersSeq = {{start:2550, end:4050}} 
                    restartSpaceshipBoosters = {{start:12750, intermediate: 3900, end:16800}}
                />
                <Overlay 
                    startTime={startTime} 
                    displaySystemsOnlineTime = {10500} 
                    systemsOnlineDuration = {systemsOnlineDuration}
                />
            </div>
        )
    }
}
  
export default HomePage

