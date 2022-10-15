/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Suraj Khanal  Student ID: 044435113  Date: 14/10/2022
*
* Online (Cyclic) Link: https://drab-cyan-armadillo-tie.cyclic.app/
*
********************************************************************************/

const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

const dataService = require('./data-service.js')

const app = express()

const PORT = process.env.PORT || 8080

const storage = multer.diskStorage({
	destination: "./public/images/uploaded",
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({ storage: storage })

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
	res.sendFile(__dirname + '/views/home.html')
})

app.get('/about', (_, res) => {
	res.sendFile(__dirname + '/views/about.html')
})

app.get('/students', (req, res) => {
	const { status, program, credential } = req.query
	if (status !== undefined) {
		dataService.getStudentsByStatus(status).then((data) => {
			res.json(data)
		}).catch((err) => {
			res.json({ message: err })
		})
	} else if (program !== undefined) {
		dataService.getStudentsByProgramCode(program).then((data) => {
			res.json(data)
		}).catch((err) => {
			res.json({ message: err })
		})
	} else if (credential !== undefined) {
		dataService.getStudentsByExpectedCredential(credential).then((data) => {
			res.json(data)
		}).catch((err) => {
			res.json({ message: err })
		})
	} else {
		dataService.getAllStudents().then((data) => {
			res.json(data)
		}).catch((err) => {
			res.json({ message: err })
		})
	}
})

app.get('/student/:value', (req, res) => {
	const { value } = req.params
	dataService.getStudentById(value).then((data) => {
		res.json(data)
	}).catch((err) => {
		res.json({ message: err })
	})
})

app.get('/intlstudents', (_, res) => {
	dataService.getInternationalStudents().then((data) => {
		res.json(data)
	}).catch((err) => {
		res.json({ message: err })
	})
})

app.get('/programs', (_, res) => {
	dataService.getPrograms().then((data) => {
		res.json(data)
	}).catch((err) => {
		res.json({ message: err })
	})
})

app.get('/students/add', (_, res) => {
	res.sendFile(__dirname + '/views/addStudent.html')
})

app.post('/students/add', (req, res) => {
	dataService.addStudent(req.body).then(() => {
		res.redirect('/students')
	}).catch((err) => {
		res.json({ message: err })
	})
})

app.get('/images/add', (_, res) => {
	res.sendFile(__dirname + '/views/addImage.html')
})

app.post('/images/add', upload.single("imageFile"), (_, res) => {
	res.redirect('/images')
})

app.get('/images', (_, res) => {
	const images = []
	fs.readdir('./public/images/uploaded', function (err, items) {
		images.push(items)
		res.json({ images })
	});
})

app.get('*', (_, res) => {
	res.status(404).send('Page Not Found')
})

dataService.initialize().then(() => {
	app.listen(PORT, () => {
		console.log(`Express http server listening on ${PORT}`)
	})
})
.catch((err) => {
	console.log(err)
})
