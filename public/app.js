const API_URL = 'http://127.0.0.1:3000';
const userBlock = document.querySelector('.usersBlock');
const form = document.forms.user;
const submitButton = document.getElementById('submit');

getUsers();

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = this.name.value.trim();
  const age = this.age.value;
  const id = this.id.value;

  if (name == false || age == false) {
    alert('Can"t submit empty fields');
    return;
  }

  if (id) {
    updateUser(API_URL, name, age, id);
    const userDom = document.querySelector(`[data-id="${id}"]`);
    userDom
      .querySelectorAll('[data-action]')
      .forEach((item) => (item.disabled = false));
    submitButton.textContent = 'Add';
  } else {
    postUser(API_URL, name, age);
  }

  form.reset();
});

userBlock.addEventListener('click', function (e) {
  if (e.target.getAttribute('data-action') === 'delete') {
    const id = e.target.closest('[data-id]').getAttribute('data-id');

    fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => getUsers())
      .catch((error) => console.log(error.message));
  }

  if (e.target.getAttribute('data-action') === 'edit') {
    form.id.value = e.target.closest('[data-id]').getAttribute('data-id');

    form.name.value = e.target
      .closest('[data-id]')
      .querySelector('.user-name').textContent;

    form.age.value = e.target
      .closest('[data-id]')
      .querySelector('.user-age').textContent;

    e.target.disabled = true;
    e.target
      .closest('[data-id]')
      .querySelector('[data-action="delete"]').disabled = true;

    submitButton.textContent = 'Save';
  }
});
