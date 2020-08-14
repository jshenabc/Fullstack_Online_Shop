const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const apiPort = 3000;

app.options('*', cors());

// to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// module
// const courses = require('./courses');

// Enable CORS for each request

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routing
var routes = require('./routes/index');
// app.use('/', routes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routes)

app.use((req, res) => {
	res.type('text/html');
	res.status(404);
	res.send("<b>404 - Not Found</b>");
});


// app.get('/api/courses', (req, res) => {
// 	res.json(courses.getAllCourses())
// });

// app.get('/api/course/:cid', (req, res) => {
// 	res.json(courses.getCourse(req.params.cid))
// });

// app.delete('/api/course/:cid', (req, res) => {
// 	courses.removeCourse(req.params.cid);
// 	res.json(courses.getAllCourses());
// });

// app.post('/api/course', (req, res) => {
// 	courses.addCourse(req.body.cid, req.body.cname);
// 	res.json(courses.getAllCourses());
// });



app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

/*
curl -X GET "http://localhost:3333/api/courses"

curl -X GET "http://localhost:3333/api/course/cs602"

curl -X DELETE "http://localhost:3333/api/course/cs602"

curl -X POST -H "Content-type: application/json" \
    "http://localhost:3333/api/course" \
    -d '{"cid":"cs520", "cname":"Info Structures"}'

*/
