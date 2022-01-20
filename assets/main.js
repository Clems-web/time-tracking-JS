import "./css/style.scss";

import {Project} from "./js/Project";
import {Clock} from "./js/Clock";

let inputTask = document.getElementById('inputTask');
let button = document.getElementById('projectCreate');
let projectContainer = document.getElementById('projectContainer');

let storage = window.localStorage;

for (let projet of Object.keys(storage)) {
    /*console.log(JSON.parse(storage[projet]));*/
    projet = JSON.parse(storage[projet]);

    new Project(projet.title, projet.clocks);
}

button.addEventListener('click', function () {

    projectContainer.append(new Project(inputTask.value).div);
    inputTask.value = '';
})