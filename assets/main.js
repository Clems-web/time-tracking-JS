import "./css/style.scss";
import {Project} from "./js/Project";

let inputTask = document.getElementById('inputTask');
let button = document.getElementById('projectCreate');
let projectContainer = document.getElementById('projectContainer');

let storage = window.localStorage;

for (let projet of Object.keys(storage)) {

    projet = JSON.parse(storage[projet]);
    let essai = new Project(projet.title, projet.clocks);

    const reducer = (previousValue, currentValue) => previousValue + currentValue;

    let tabHours = [];
    let tabMinutes = [];
    let tabSeconds = [];


    for (let clock of projet.clocks) {
        tabHours.push(clock.hours);
        tabMinutes.push(clock.minutes);
        tabSeconds.push(clock.seconds);
    }

    let hours = tabHours.reduce(reducer);
    let minutes = tabMinutes.reduce(reducer);
    let seconds = tabSeconds.reduce(reducer);


    if (tabSeconds.reduce(reducer) > 59) {
        seconds = seconds % 60;
        minutes++;
    }

    if (tabMinutes.reduce(reducer) > 59) {
        minutes = minutes % 60;
        hours++;
    }

    essai.div.addEventListener('mouseenter', function () {

        tabHours = [];
        tabMinutes = [];
        tabSeconds = [];


        for (let clock of essai.clocks) {
            tabHours.push(clock.hours);
            tabMinutes.push(clock.minutes);
            tabSeconds.push(clock.seconds);
        }

        hours = tabHours.reduce(reducer);
        minutes = tabMinutes.reduce(reducer);
        seconds = tabSeconds.reduce(reducer);


        if (tabSeconds.reduce(reducer) > 59) {
            seconds = seconds % 60;
            minutes++;
        }

        if (tabMinutes.reduce(reducer) > 59) {
            minutes = minutes % 60;
            hours++;
        }

        this.querySelector('h2').innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';

    });

    essai.div.addEventListener('mouseleave', function () {
        this.querySelector('h2').innerHTML = projet.title;
    });

    let trashCan = document.createElement('i');
    trashCan.classList.add('far', 'fa-trash-alt');

    trashCan.addEventListener('click', function () {
        storage.removeItem(essai.title);
        this.parentElement.remove();
    });

    essai.div.append(trashCan);
    
}

button.addEventListener('click', function () {

    projectContainer.append(new Project(inputTask.value).div);
    inputTask.value = '';
})

