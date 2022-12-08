const getUsers = () => {
  fetch(`${API_URL}/users`)
    .then((response) => response.json())
    .then((data) => {
      userBlock.innerHTML = '';
      data.forEach(addUserHtml);
    })
    .catch((error) => console.log(error.message));
};

const addUserHtml = ({ id, name, age }) => {
  const div = document.createElement('div');
  div.setAttribute('data-id', id);

  div.insertAdjacentHTML(
    'beforeend',
    `
        <p>User: <span class="user-name">${name}</span></p>
        <p>Age: <span class="user-age">${age}</span></p>
        <button data-action="delete">Delete</button>
        <button data-action="edit">Edit</button>`
  );

  userBlock.append(div);
};

const updateUser = (apiURL, name, age, id) => {
  fetch(`${apiURL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, age, id }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(() => getUsers())
    .catch((error) => console.log(error.message));
};

const postUser = (apiURL, name, age) => {
  fetch(`${apiURL}/users`, {
    method: 'POST',
    body: JSON.stringify({ name, age }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => addUserHtml(data))
    .catch((erorr) => console.log(erorr.message));
};
