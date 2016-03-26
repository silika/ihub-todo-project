/**
 * Created by silika on 23.03.16.
 */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var projects = [
        {
            "id": 1,
            "name": "My project",
            "tasks": [
                {
                "id": 1,
                "projectID": 1,
                "name": "My task",
                "deadline": 1457529375881,
                "done": false
                }
            ]
        }
    ];

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

function getTasksFromProject(projects, request) {
    if (request.params.project_id === ':project_id') request.params.project_id = 1;
    var currentProject = projects.find((project) => {
        return project.id === Number(request.params.project_id)
    });
    console.log(currentProject);
    return currentProject.tasks;
}

// tasks

app.get('/api/projects/:project_id/tasks/', (req, res) => {
    console.log(getTasksFromProject(projects, req));
    var tasks = getTasksFromProject(projects, req) || [];

    res.json(tasks)
});

app.post('/api/projects/:project_id/tasks/', (req, res) => {

    var tasks = getTasksFromProject(projects, req) || [];
    console.log(tasks);

    tasks.push({
        id:Number((Math.random()*100).toFixed(0)),
        "projectID": req.params.project_id,
        'name':req.body.name,
        "deadline": 1457529375881,
        "done": true
    });
    res.json(tasks)
});

app.get('/api/projects/:project_id/tasks/:task_id', (req, res) => {
    console.log(req.params);

    var tasks = getTasksFromProject(projects, req) || [];

    var task = tasks.find((task) => task.id === Number(req.params.task_id));
    res.json(task)
});

app.put('/api/projects/:project_id/tasks/:task_id', (req, res) => {

    var tasks = getTasksFromProject(projects, req) || [];

    tasks.forEach((task, idx) => {
        if(task.id === Number(req.params.task_id)) {
            tasks[idx] = Object.assign(tasks[idx], req.body);
        }
    });
   res.json(tasks)
});

app.delete('/api/projects/:project_id/tasks/:task_id', (req, res) => {
    var tasks = getTasksFromProject(projects, req) || [];
    var task = tasks.filter((task) => task.id !== Number(req.params.task_id));

   res.json(task)
});

// projects
app.get('/api/projects', (req, res) => res.json(projects));

app.post('/api/projects', (req, res) => {
    var projectID = Number((Math.random()*100).toFixed(0));
    projects.push({
        id: projectID,
        name:req.body.name,
        tasks:[
            {
                "id": Number((Math.random()*100).toFixed(0)),
                "projectID": projectID,
                "name": "My task",
                "deadline": 1457529375881,
                "done": false
            }
        ]
    });
    res.json(projects)
});

app.get('/api/projects/:project_id/', (req, res) => {
    var project = projects.find((project) => {
        console.log(typeof project.id , typeof Number(req.params.project_id));
        return project.id === Number(req.params.project_id);
});
     console.log(req.params);
     console.log(project);
     res.json(project)
});

app.put('/api/projects/:project_id/', (req, res) => {
    projects.forEach((project, idx) => {
        if(project.id === Number(req.params.project_id)) {
            projects[idx] = Object.assign(projects[idx], req.body);
        }
    });
   res.json(projects)
});

app.delete('/api/projects/:project_id', (req, res) => {
    projects = projects.filter((project) => project.id !== Number(req.params.project_id));

   res.json(projects)
});


app.listen(3000, '0.0.0.0', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('eXPRESS SERVER IS LISTENING ON PORT 3000')
    }
});
