import React from 'react';

export default class Overlay extends React.Component {
    removeMessageOnClick() {
        const removeMessage = () => {
            
            document.querySelector(".message").style.display = "none";
            setTimeout(()=>{
                const content = "All Systems - Online";
                const animation = "blink 1s steps(2, jump-none) 3 normal backwards";
                const cursor = "default";

                this.displayMessage(content, animation, cursor);
            }, this.props.displaySystemsOnlineTime);

            setTimeout(()=> {
                document.querySelector(".message").style.display = "none";
            }, (this.props.displaySystemsOnlineTime + this.props.systemsOnlineDuration));

            document.querySelector(".message").removeEventListener("click", removeMessage);
            window.removeEventListener("keyup", removeMessage);
        };

        document.querySelector(".message").addEventListener("click", removeMessage);
        window.addEventListener("keyup", removeMessage);
    }
    
    displayMessage(content, animation, cursor) {
        const message = document.querySelector(".message");
        message.innerHTML = content;
        message.style.animation = animation;
        message.style.cursor = cursor;
        message.style.display = "flex"; 
    }
    
    componentDidMount() {
        setTimeout(() => {
            const content = "Start Undock Procedure";
            const animation = "blink 1s steps(2, jump-none) infinite";

            this.displayMessage(content, animation);
            this.removeMessageOnClick();
        }, this.props.startTime)
    }
    
    render() {
		return <div className= "overlay-container">
            <div className = "message">

            </div>
		</div>
	}
}