function escapeHtml(unsafe) {
    return unsafe
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
 }

class Terminal {
  constructor(user_name, machine_name) {
    this.user_name = user_name;
    this.machine_name = machine_name;
    this.prompt = `${this.user_name}@<red>${this.machine_name}</red> ~ $ `;
  }

  executeCommand(command) {

  }

  print(output) {
    const pElement = document.createElement('p');
    pElement.innerHTML = output;
    this._outputElement.appendChild(pElement);
  }

  initialize(input, output, prompt) {
    this._inputElement = input;
    this._outputElement = output;
    this._promptElement = prompt;

    let t = this;
    this._inputElement.addEventListener('keydown', function(e) {
      if (e.key !== 'Enter') return;

      e.preventDefault();

      const command = this.value;
      this.value = '';

      t.print(t.prompt + escapeHtml(command));
      t.executeCommand(command);
    });

    this._promptElement.innerHTML = this.prompt;
  }
}

let terminal = new Terminal("jarvis", "blue-hawk");

window.addEventListener('DOMContentLoaded', () => {
  terminal.initialize(
    document.querySelector('#input'), 
    document.querySelector('#output'),
    document.querySelector('#input-line .prompt'),
  );
});
