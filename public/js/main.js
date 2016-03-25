/**
 * Created by silika on 23.03.16.
 */
fetch('api/projects')
    .then((res) => res.json())
    .then(renderProjects);

    createProject({name:'My second project'})
        .then(() => getProjectById(1))
        .then(() => updateProjectById(1, {name:'Changed Project'}))
        //.then(() => removeProjectBYId(1))
        .catch((err) => console.log(err));

    createTask({name:'My second Task'})
        .then(() => getTaskByIdFromProject(1,1))
        .then(() => updateTaskById(1, {'name':'Updated Task'})
        )
        //.then(() => removeTaskBYId(1))
        .catch((err) => console.log(err));


//Tasks
function createTask(task) {
    return fetch('api/projects/:project_id/tasks', {
        method:'POST',
        body:JSON.stringify(task),
        headers: {
            'Content-Type':'application/json'
        }
    })
}

function getTaskById(id) {
    return fetch('/api/projects/:project_id/tasks/' + id)
        .then((res) => res.json())
        .then((json) => console.log(json));
}

function getTaskByIdFromProject(id, project_id) {
    return fetch('/api/projects/'+ project_id +'/tasks/' + id)
        .then((res) => res.json())
        .then((json) => console.log(json));
}

function updateTaskById(id, task){
    return fetch('/api/projects/:project_id/tasks/' + id, {
        method:'PUT',
        body:JSON.stringify(task),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then((res) => res.json())
    .then((json) => console.log(json));
}

function removeTaskBYId(id) {
    return fetch('/api/projects/:project_id/tasks/' + id, {
        method:'DELETE'
    })
    .then((res) => res.json())
    .then((json) => console.log(json));
}

function renderTasks(tasks){
    console.log(tasks);
}



//Projects
function createProject(project) {
    return fetch('api/projects', {
        method:'POST',
        body:JSON.stringify(project),
        headers: {
            'Content-Type':'application/json'
        }
    })
}

function getProjectById(id) {
    return fetch('/api/projects/' + id)
        .then((res) => res.json())
        .then((json) => console.log(json));
}

function updateProjectById(id, project){
    return fetch('/api/projects/' + id, {
        method:'PUT',
        body:JSON.stringify(project),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then((res) => res.json())
    .then((json) => console.log(json));
}

function removeProjectBYId(id) {
    return fetch('/api/projects/' + id, {
        method:'DELETE'
    })
}

function renderProjects(projects){
    console.log(projects);
    var app = document.getElementById('app');
    projects.forEach((projects) => {
        var list = document.createElement('ul');
        Object.keys(projects)
            .forEach((key) => {
                var item = document.createElement('li');
                item.textContent = key + '|' + projects[key];
                list.appendChild(item)
            });
        app.appendChild(list);
    });
}
