let display_data = (data) => {
  let build_entry = (subvalue) => {
    const entry = document.createElement('div');
    entry.classList.add('entry');
    entry.classList.add(subvalue.color);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (subvalue.color == "blue") {
      checkbox.checked = true;
      checkbox.style.accentColor = '#3665d1';
    }
    entry.appendChild(checkbox);

    console.log(subvalue.prompt)
    const prompt_label = document.createElement('label');
    prompt_label.textContent = subvalue.prompt;
    entry.appendChild(prompt_label);

    const separator_label = document.createElement('label');
    separator_label.classList.add('separator');
    separator_label.textContent = "-";
    entry.appendChild(separator_label);

    const action_label = document.createElement('label');
    action_label.textContent = subvalue.action;
    entry.appendChild(action_label);

    return entry;
  }

  const targetElement = document.getElementById('app');

  for (const value of Object.values(data)) {
    const section = document.createElement('div');
    section.classList.add('section');

    const section_title = document.createElement("h2");
    section_title.classList.add("section_title");
    section_title.textContent= value["section title"];
    section.appendChild(section_title);

    for (const subvalue of value.entries) {
      switch (subvalue.type) {
        case "section_note":
          const section_note = document.createElement('p');
          section_note.classList.add("section_note");
          section_note.classList.add(subvalue.color);
          section_note.textContent = subvalue.prompt;
          section.appendChild(section_note);
          break;
        case "footnote":
          const footnote = document.createElement('p');
          footnote.classList.add("footnote");
          footnote.classList.add(subvalue.color);
          footnote.textContent = subvalue.prompt;
          section.appendChild(footnote);
          break;
        case "speed":
          let entry = build_entry(subvalue);
          const speed = document.createElement('label');
          speed.classList.add(subvalue.speed_color);
          speed.classList.add("speed");
          speed.textContent = subvalue.speed;
          entry.appendChild(speed);
          section.appendChild(entry);
          break;
        case "checkmark":
        default:

          let checkmark_entry = build_entry(subvalue);
          section.appendChild(checkmark_entry);
      }
    }
    targetElement.appendChild(section);
  }
}

fetch('./data/data.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response error');
    return response.json();
  })
  .then(data => display_data(data))
  .catch(error => console.error('Error loading JSON:', error));


const topRefresh = document.getElementById('top_refresh');
topRefresh.addEventListener('click', () => {
  window.location.reload();
});
const bottomRefresh = document.getElementById('bottom_refresh');
bottomRefresh.addEventListener('click', () => {
    window.location.reload();
});
