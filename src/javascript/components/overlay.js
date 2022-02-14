import React from 'react';

export default class Overlay extends React.Component {
    startMessageSequence(timer) {
        if (timer === 0) { // timer === 0 means user gives input and starts timer, we the remove the "start undock procedure" message.
            // document.querySelector(".message").style.display = "none";
        } else if (timer === Number(this.props.displaySystemsOnlineMsgTime.toString().slice(0,-2))) { //Then once the ship is ready to restart booster, we display the "all systems online message".
            const content = "All Systems - Online";
            const animation = `blink 1s steps(2, jump-none) ${Number(this.props.displaySystemsOnlineMsgDuration/1000)} normal backwards`;
            const cursor = "default";
            this.displayMessage(content, animation, cursor);
        } else if (timer === Number((this.props.displaySystemsOnlineMsgTime + this.props.displaySystemsOnlineMsgDuration).toString().slice(0,-2))) { //Finally when boosters are restarting, we remove the "all systems online" message.
            document.querySelector(".message").style.display = "none";
        }
    }
    
    displayMessage(content, animation, cursor) {
        const message = document.querySelector(".message");
        message.innerHTML = content;
        message.style.animation = animation;
        message.style.cursor = cursor;
        message.style.display = "flex"; 
    }
    
    initUndockMessage() { // when the ship ends its entry on the screen, we display the "start undock procedure" message
        setTimeout(() => { 
            const content = "Start Undock Procedure";
            const animation = "blink 1s steps(2, jump-none) infinite";
            this.displayMessage(content, animation);
        }, this.props.undockMessageTime)
    }

    componentDidMount() {
        this.initUndockMessage();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.animationTimer !== this.props.animationTimer) {
            this.startMessageSequence(this.props.animationTimer);
        }
    }
    
    render() {
		return <div className= "overlay-container">
            <div className = "message">

            </div>
		</div>
	}
}
