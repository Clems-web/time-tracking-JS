import {Clock} from "./Clock";

class Project {

    constructor(title, clocks = null) {

        this.div = document.createElement('div');
        this.title = title;
        this.clocks = [];

        this.initDom();

        if (clocks) {
            for (const clock of clocks) {
                this.addTask(clock.hours, clock.minutes, clock.seconds, clock.title);
            }
        }
    }

    initDom() {
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

        button.addEventListener('click', () => {
            if (input.value) {
                this.addTask();
            }
        });
    }

    addTask(hours = null, minutes = null, seconds = null, title = null) {

        let $this = this;
        const taskContainer = document.createElement('div');
        this.div.querySelector('.taskList').append(taskContainer);
        taskContainer.classList.add('taskContainer');
        let clockObject = null;

        if (hours !== null && minutes !== null && seconds !== null && title !== null) {
            clockObject = new Clock(title, hours, minutes, seconds);
        }
        else {
            clockObject = new Clock(this.div.querySelector('input').value);
        }

        clockObject.para.addEventListener('click', function () {

            window.localStorage.setItem($this.title, JSON.stringify($this));
        })

        this.clocks.push(clockObject);

        taskContainer.append(clockObject.task);
        taskContainer.append(clockObject.para);

        let hr = document.createElement('hr')
        taskContainer.append(hr);

        this.div.querySelector('input').value = '';

    }

}

export {Project};