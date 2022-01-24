class Clock {

    /**
     * Create a Clock Object
     * @param title
     * @param hours
     * @param minutes
     * @param seconds
     */
    constructor(title, hours = null, minutes = null, seconds = null) {

        this.flagClock = false;
        this.timerInit = false;

        // If params has been given then it's a task stored In LocalStorage
        if (hours !== null && minutes !== null && seconds !== null) {
            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;
        }

        // Else it's a new task
        else {
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
        }

        this.para = document.createElement('p');
        this.task = document.createElement('p');
        this.title = title;

        this.initDom();

    }


    // Init Clock Object
    initDom() {
        this.task.classList.add('task');
        this.task.innerHTML = this.title;

        this.para.classList.add('clock');
        this.para.innerHTML = `<i class="fas fa-clock"></i>`;
        this.para.setAttribute('time', 'false');
        this.para.querySelector("i").addEventListener('click', () => {

            // If we start to track time on a task then others task's time tracking stop
            if (!this.flagClock) {
                const paras = document.querySelectorAll('.clock');

                for (const para of paras) {
                    para.setAttribute('time', 'false');
                    para.style.color = 'rgba(236, 152, 46, 0.96)';
                }

                this.flagClock = true;

                this.para.setAttribute('time', 'true');
                this.para.style.color = 'green';

                // Start tracking time by calling Object Clock's method "time" every 60 seconds
                if (!this.timerInit) {

                    this.timerInit = true;
                    setInterval(this.time.bind(this), 1000);
                }
            }
            // Else we stop time tracking for this task
            else {
                this.flagClock = false;

                this.para.setAttribute('time', 'false');
                this.para.style.color = 'rgba(236, 152, 46, 0.96)';
            }
        });
    }

    // Function to track time
    time() {

        if (this.flagClock && (this.para.getAttribute('time') === 'true')) {

            this.seconds++;

            if (this.seconds > 59) {
                this.seconds = 0;
                this.minutes++;
            }

            if (this.minutes > 59) {
                this.minutes = 0;
                this.hours++;
            }
        }
    }


}

export {Clock};