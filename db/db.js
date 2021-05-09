const util = require("util")
const fs = require("fs")
const random = require("uuid")

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class db {
	readFile = () => {
		return readFileAsync("db/db.json", "utf-8")
	}
	writeFile = (notes) => {
		return writeFileAsync(
			"db/db.json",
			JSON.stringify(notes)
		)
	}

	//getAllNotes
	getNotes = () => {
		return this.readFile().then((notes) => {
			if (!notes) {
				return []
			}
			const parsedNotes = [].concat(JSON.parse(notes))
			return parsedNotes
		})
	}

	//postNote
	noteHandle = (newNote) => {
		const { title, text } = newNote
		const noteToAdd = {
			title,
			text,
			id: random.v4(),
		}

		return this.getNotes()
			.then((notes) => [...notes, noteToAdd])
			.then((newNotesArray) => {
				this.writeFile(newNotesArray)
			})
			.then(() => console.log("Successfuly added note"))
	}

	//deleteNote
	deleteNote = (id) => {
		return this.getNotes()
			.then((notes) =>
				notes.filter((note) => note.id !== id)
			)
			.then((filtered) => this.writeFile(filtered))
	}
}

module.exports = new db()
