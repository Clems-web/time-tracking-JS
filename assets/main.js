import "./css/style.scss";
import {Project} from "./js/Project";

let inputTask = document.getElementById('inputTask');
let button = document.getElementById('projectCreate');
let projectContainer = document.getElementById('projectContainer');

// Init a storage var
let storage = window.localStorage;

// For each Project stocked in localStorage (JSON)
for (let project of Object.keys(storage)) {

    // Parse JSON to use it
    project = JSON.parse(storage[project]);

    // Create Project stocked in localStorage
    new Project(project.title, project.clocks);

}

// Create new Project
button.addEventListener('click', function () {

    projectContainer.append(new Project(inputTask.value).div);
    inputTask.value = '';
})

