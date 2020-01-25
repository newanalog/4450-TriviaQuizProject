// Timer object to function as our clock, takes a number
// of minutes as its only parameter and counts down on start
class TimerService {
    create(minutes) {
        this.clear(); // clear any orphaned setIntervals

        this.minutes = minutes;
        this.remain = minutes * 60; // remain starts with total seconds
        this.timerDiv = document.getElementById("timer-wrapper");
        // create and insert our clock
        this.clock = createElement("div", { id: "clock" });

        this.timerDiv.appendChild(this.clock);
        // initialize display with starting time
        this.updateDisplay(this.remain);
    }

    clear() {
        if (this.interval) {
            // use reference received from setInterval to stop the clock
            clearInterval(this.interval);
            // remove the clock
            clearChildren(this.timerDiv);
        }
    }

    // helper function to calculate current timer value and update display
    updateDisplay(value) {
        // minutes are value (seconds) divided by 60 to get minutes remaining
        const minutes = `0${parseInt(value / 60)}`;
        // remainder mod 60 will be our seconds
        const seconds = `0${parseInt(value % 60)}`;
        // substring our zero-prepended values to keep from if-ing the 10's place
        const minuteDisplay = minutes.substring(minutes.length - 2);
        const secondDisplay = seconds.substring(seconds.length - 2);
        const display = `${minuteDisplay}:${secondDisplay}`;
        this.clock.innerText = display; // update the clock text
    }

    start() {
        this.interval = setInterval(() => {
            // decrement the remaing seconds by 1
            this.remain--;
            // set our current remaining time value
            this.updateDisplay(this.remain);

            if (this.remain <= 30) {
                // css class to turn the clock red as 30-second warning
                this.clock.classList.add("timer-warning");
            }

            if (this.remain <= 0) {
                // if the timer is done, stop the setInterval function
                clearInterval(this.interval);
                disableInputs();  // no more answers allowed now
                // clear the warning css
                this.clock.classList.remove("timer-warning");
            }
        }, 1000)
    }
}