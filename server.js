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

var tasks = [
    {
        "id": 1,
        "projectID": 1,
        "name": "My task",
        "deadline": 1457529375881,
        "done": false
    }
];


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// tasks

app.get('/api/projects/:project_id/tasks/', (req, res) => res.json(tasks));

app.post('/api/projects/:project_id/tasks/', (req, res) => {
    tasks.push({
        id:Number((Math.random()*100).toFixed(0)),
        "projectID": 1,
        'name':req.body.name,
        "deadline": 1457529375881,
        "done": true
    });
    res.json(tasks)
});

app.get('/api/projects/:project_id/tasks/:task_id', (req, res) => {
    console.log(req.params);
    var task = tasks.find((task) => task.id === Number(req.params.task_id));
    res.json(task)
});

app.put('/api/projects/:project_id/tasks/:task_id', (req, res) => {
    tasks.forEach((task, idx) => {

        if(task.id === Number(req.params.task_id)) {
            tasks[idx] = Object.assign(tasks[idx], req.body);
        }
    });
   res.json(projects)
});

app.delete('/api/projects/:project_id/tasks/:task_id', (req, res) => {
    tasks = tasks.filter((task) => task.id !== Number(req.params.task_id));

   res.json(tasks)
});

// projects
app.get('/api/projects', (req, res) => res.json(projects));

app.post('/api/projects', (req, res) => {
    projects.push({
        id: Number((Math.random()*100).toFixed(0)),
        name:req.body.name,
        tasks:[1,2,3]
    });
    res.json(projects)
});

app.get('/api/projects/:project_id/', (req, res) => {
    var project = projects.find((project) => {
        console.log(typeof project.id , typeof Number(req.params.project_id));
        return project.id === Number(req.params.project_id)
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
