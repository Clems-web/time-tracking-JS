(()=>{"use strict";class t{constructor(t){return this.div=`<div class="project">\n                <h2>${t}</h2>\n                <input type="text" placeholder="Tâche">\n                <button>Ajouter</button>\n                <div class="taskList"></div>\n            </div>`,this.div}}let e=document.getElementById("inputTask"),n=document.getElementById("projectCreate"),c=document.getElementById("projectContainer");n.addEventListener("click",(function(){c.append(new t(e.value))}))})();