const fs = require('fs')

var students = []
var programs = []

const initialize = () =>
	new Promise((resolve, reject) => {
		try {
			fs.readFile('./data/students.json', 'utf8', (err, data) => {
				if (err) throw err;
				students = JSON.parse(data)
			});

			fs.readFile('./data/programs.json', 'utf8', (err, data) => {
				if (err) throw err;
				programs = JSON.parse(data)
			});
		} catch (err) {
			reject('Unable to read file')
		}

		resolve()
	})

const getAllStudents = () =>
	new Promise((resolve, reject) => {
		if (!students || students.length === 0) reject('no results returned')
		resolve(students)
	})

const getInternationalStudents = () =>
	new Promise((resolve, reject) => {
		const interStudents = students.filter((s) => s.isInternationalStudent === true)
		if (!interStudents || interStudents.length === 0) reject('no results returned')
		resolve(interStudents)
	})

const getPrograms = () =>
	new Promise((resolve, reject) => {
		if (!programs || programs.length === 0) reject('no results returned')
		resolve(programs)
	})

module.exports = {
	initialize,
	getAllStudents,
	getInternationalStudents,
	getPrograms,
}