// Create a Note class
class Note {
  constructor(id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;
  }
}

// Define app class to manage notes
class App {
  constructor() {
    this.notes = []; // Initialise an empty array to store the notes
    this.$activeForm = document.querySelector(".active-form");
    this.$inactiveForm = document.querySelector(".inactive-form");
    this.$noteTitle = document.querySelector(".note-title");
    this.$noteText = document.querySelector(".note-text");
    this.$notes = document.querySelector(".notes");
    this.$form = document.querySelector("#modal-form");
    this.$modal = document.querySelector(".modal");

    this.addEventListeners();
    this.displayNotes();
  }

  addEventListeners(){
    // add a click event listener to the body of the document
    document.body.addEventListener("click", (event) => {
            // when a click event occurs, call the handleFormClick method
            this.handleFormClick(event); 
            this.openModal(event);
    })

    this.$form.addEventListener("submit", (event) => {
        event.preventDefault(); // pevents the page/browser from refreshing
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;
        this.addNote({ title, text })
        this.closeActiveForm();
    })
  }

  handleFormClick(event){
    const isActiveFormClickedOn = this.$activeForm.contains(event.target);
    const isInactiveFormClickedOn = this.$inactiveForm.contains(event.target);

    const title = this.$noteTitle.value;
    const text = this.$noteText.value;

    if(isActiveFormClickedOn){
    // calling the function to open active form
    this.openActiveForm();
    }else if(!isInactiveFormClickedOn && !isActiveFormClickedOn){
        // calling the functon to add new note
        this.addNote({title});
        // calling the function to close the active form
        this.closeActiveForm();
    };
  };

  openModal(event){
    if(event.target.closest(".note")){
        this.$modal.classList.add("open-modal")
    };
  };

  openActiveForm(){
    this.$activeForm.style.display = "block";
    this.$inactiveForm.style.display = "none";
    this.$noteText.focus();
  };

  closeActiveForm(){
    this.$activeForm.style.display = "none";
    this.$inactiveForm.style.display = "block";
    
  }

  // method to add a new note to the notes
  addNote({ title, text }) {
    if (text != "") {
      const newNote = new Note(cuid(), title, text);
      this.notes = [...this.notes, newNote]; // Add the note to the notes array

      this.displayNotes();
    };
  };

  // method to edit existing note to the notes
  editNote(id, { title, text }) {
    this.notes = this.notes.map((note) => {
      if (note.id === id) {
        note.title = title;
        note.text = text;
      }
      return note;
    });
  };

  // method to delete note
  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id); // Remove note from array
  };

  displayNotes() {
    this.$notes.innerHTML = this.notes.map(
      (note) =>
        `
          <div class="note" id="${note.id}">
            <div class="note-content">
              <div class="note-header">
                <p>${note.title}</p>
                <span class="material-symbols-outlined note-pin"> keep </span>
              </div>
  
              <p>${note.text}</p>
            </div>

            <div class="note-footer-icons">
              <span class="material-symbols-outlined footer-icon">
                add_alert
              </span>
              <span class="material-symbols-outlined footer-icon">
                person_add
              </span>
              <span class="material-symbols-outlined footer-icon">
                palette
              </span>
              <span class="material-symbols-outlined footer-icon"> image </span>
              <span class="material-symbols-outlined footer-icon">
                archive
              </span>
              <span class="material-symbols-outlined footer-icon">
                more_vert
              </span>
            </div>
          </div>
        `
    ).join(" "); //display each notes details
  }
}

const app = new App();
