import {Clock} from "./Clock";

class Project {

    constructor(title) {
        this.clocks = [];

        this.div = document.createElement('div');
        this.title = title;


        this.initDom();


    }

    initDom() {
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

    addTask() {

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');

        const para = document.createElement('p');
        para.classList.add('task');
        para.innerHTML = this.div.querySelector('input').value;

        const clockObject = new Clock();
        this.clocks.push(clockObject);


        taskContainer.append(para);
        taskContainer.append(clockObject.para);

        let hr = document.createElement('hr')
        taskContainer.append(hr);

        this.div.querySelector('input').value = '';

        this.div.querySelector('.taskList').append(taskContainer);


    }

}

export {Project};