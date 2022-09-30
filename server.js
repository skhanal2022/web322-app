/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Suraj Khanal
* Student ID: 044435113  Date: 30/09/2022
*
* Online (Cyclic) Link: 
*
********************************************************************************/

const express = require('express')
const path = require('path')

const dataService = require('./data-service.js')

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (_, res) => {
	res.sendFile(__dirname + '/views/home.html')
})

app.get('/about', (_, res) => {
	res.sendFile(__dirname + '/views/about.html')
})

app.get('/students', (_, res) => {
	dataService.getAllStudents().then((data) => {
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
