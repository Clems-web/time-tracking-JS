import {Clock} from "./Clock";

class Project {

    /**
     * Create a Project Object
     * @param title
     * @param clocks, could be given or null
     */
    constructor(title, clocks = null) {

        this.div = document.createElement('div');
        this.title = title;
        this.clocks = [];

        this.initDom();

        // If an array of Clock Object has been given then we use it to re-create tasks stored
        if (clocks) {
            for (const clock of clocks) {
                this.addTask(clock.hours, clock.minutes, clock.seconds, clock.title);
            }
        }
    }

    // Init our Project

    initDom() {

        // To use Project's method in other methods
        let $this = this;
        let projectContainer = document.getElementById('projectContainer');
        projectContainer.append(this.div);
        this.div.classList.add('project');
        this.div.innerHTML =
            `   
                <h2>${this.title}</h2>
                <input type="text" placeholder="Tâche">
                <button>Ajouter</button>
                <div class="taskList"></div>
            `

        const input = this.div.querySelector('input');
        const button = this.div.querySelector('button');

        // Add new task
        button.addEventListener('click', () => {
            if (input.value) {
                this.addTask();
            }
        });

        // Create an icon to delete Project from DOM and LocalStorage using FontAwesome
        let trashCan = document.createElement('i');
        trashCan.classList.add('far', 'fa-trash-alt');

        trashCan.addEventListener('click', function () {
            window.localStorage.removeItem($this.title);
            $this.div.remove();
        });

        this.div.append(trashCan);

        // Refresh time tracking on H2 innerHTML each time we enter
        this.div.addEventListener('mouseenter', function () {

            let tabHours = [];
            let tabMinutes = [];
            let tabSeconds = [];


            for (let clock of $this.clocks) {
                tabHours.push(clock.hours);
                tabMinutes.push(clock.minutes);
                tabSeconds.push(clock.seconds);
            }

            // Reduce many entries in array to one (ex : task1 = 20s, task2 = 30s, task3 = 50s, result for project = 100s)
            // I use this to calculate global time on Project
            const reducer = (previousValue, currentValue) => previousValue + currentValue;

            let hours = tabHours.reduce(reducer);
            let minutes = tabMinutes.reduce(reducer);
            let seconds = tabSeconds.reduce(reducer);

            // Increment minutes by result of trunc (ex : 3 tasks at 50s = 2m30s; 2 goes to minutes and modulo of seconds goes to seconds)
            if (tabSeconds.reduce(reducer) > 59) {
                let incrementMins = Math.trunc(seconds / 60);
                seconds = seconds % 60;
                minutes = minutes + incrementMins;
            }

            // Same from above but for minutes
            if (tabMinutes.reduce(reducer) > 59) {
                let incrementHours = Math.trunc(minutes / 60);
                minutes = minutes % 60;
                hours = hours + incrementHours;
            }

            // Make appears global time on Project
            $this.div.querySelector('h2').innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';

        });

        // Go back to title
        $this.div.addEventListener('mouseleave', function () {
            this.querySelector('h2').innerHTML = $this.title;
        });
    }

    /**
     * Add a task with a Clock object for our project
     * @param hours
     * @param minutes
     * @param seconds
     * @param title
     */

    addTask(hours = null, minutes = null, seconds = null, title = null) {

        // To use Project's method in other methods
        let $this = this;

        const taskContainer = document.createElement('div');
        this.div.querySelector('.taskList').append(taskContainer);
        taskContainer.classList.add('taskContainer');
        let clockObject = null;

        // Create Clock Object stored in localStorage
        if (hours !== null && minutes !== null && seconds !== null && title !== null) {
            clockObject = new Clock(title, hours, minutes, seconds);
        }

        // Create new Clock Object if not
        else {
            clockObject = new Clock(this.div.querySelector('input').value);
        }

        // Each time we click on the clock icon it saves our project in JSON on localStorage
        clockObject.para.addEventListener('click', function () {
            window.localStorage.setItem($this.title, JSON.stringify($this));
        })

        // Add our task on our Clock array
        this.clocks.push(clockObject);

        taskContainer.append(clockObject.task);
        taskContainer.append(clockObject.para);

        let hr = document.createElement('hr')
        taskContainer.append(hr);

        this.div.querySelector('input').value = '';

    }

}

export {Project};