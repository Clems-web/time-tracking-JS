class Clock {

    constructor() {

        this.flagClock = false;
        this.timerInit = false;

        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;

        this.para = document.createElement('p');



        this.initDom();

    }



    initDom() {
        this.para.classList.add('clock');
        this.para.innerHTML = `<span class="spanTiming">${this.timing()}</span>` + `<i class="fas fa-clock"></i>`;
        this.para.setAttribute('time', 'false');
        this.para.querySelector("i").addEventListener('click', () => {


            if (!this.flagClock) {
                const paras = document.querySelectorAll('.clock');

                for (const para of paras) {
                    para.setAttribute('time', 'false');
                    para.style.color = 'red';

                }

                this.flagClock = true;

                this.para.setAttribute('time', 'true');
                this.para.style.color = 'green';

                if (!this.timerInit) {

                    this.timerInit = true;
                    setInterval(this.time.bind(this), 1000);
                }

            }
            else {
                this.flagClock = false;

                this.para.setAttribute('time', 'false');
                this.para.style.color = 'red';
            }
        });
    }

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

            console.log(this.hours + 'h '+ this.minutes + 'm ' + this.seconds + 's');

            const span = this.para.querySelector('span');
            span.innerHTML = this.timing();
        }

    }

    timing() {
        return this.hours + 'h '+ this.minutes + 'm ' + this.seconds + 's';
    }

}

export {Clock};