import "./css/style.scss";

import {Project} from "./js/Project";

let inputTask = document.getElementById('inputTask');
let button = document.getElementById('projectCreate');
let projectContainer = document.getElementById('projectContainer');

button.addEventListener('click', function () {

    projectContainer.append(new Project(inputTask.value).div);
    inputTask.value = '';
})