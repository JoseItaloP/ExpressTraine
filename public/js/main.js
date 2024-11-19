const uName = document.querySelector("#userName");
const Singleuser = document.querySelector("#SingleUser");
const Deleteuser = document.querySelector("#DeleteUser");
const output = document.querySelector("#output");
const newUserName = document.querySelector("#newUserName")
const id = document.querySelector("#userIdChange")

//Buttons
const submitNU = document.querySelector("#submitNU");
const SingleUserBTN = document.querySelector("#SingleUserBTN");
const DeleteUserBTN = document.querySelector("#DeleteUserBTN");
const ShowUserBTN = document.querySelector("#ShowUserBTN");
const UpdateUserBTN = document.querySelector('#UpdateUserBTN')

async function getUsers() {
  //show all users

  try {
    const data = await fetch(`http://localhost:5000/api/users`);
    if (!data.ok) {
      throw new Error("Erro fetch");
    }
    const users = await data.json();
    output.innerHTML = "";
    users.forEach((user) => {
      const div = document.createElement("div");
      div.textContent = `user: ${user.userName} id: ${user.id}`;
      output.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

async function getUser() {
  //show a user
  if (Singleuser.lenght === 0) {
    return window.alert("Coloque um valor");
  }
  try {
    const data = await fetch(
      `http://localhost:5000/api/users/${Singleuser.value}`
    );
    if (!data.ok) {
      throw new Error("Erro fetch");
    }
    const user = await data.json();
    output.innerHTML = "";
    const div = document.createElement("div");
    div.textContent = `user: ${user.userName} id: ${user.id}`;
    output.appendChild(div);
    Singleuser.value = ''
  } catch (err) {
    console.error(err);
  }
}

async function newUser() {
  const userName = uName.value
  if (userName.lenght === 0) {
    return window.alert("Coloque um valor");
  }
  try {
    const data = await fetch(`http://localhost:5000/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName }),
    });
    if (!data.ok) {
      const errorData = await data.json();
      throw new Error(`Erro fetch: ${errorData.msg || data.statusText}`);
    }
    const newUser = await data.json();
    const div = document.createElement("div");
    div.textContent = `user: ${newUser.userName} id: ${newUser.id}`;
    output.appendChild(div);
    getUsers();
    uName.value = "";
  } catch (err) {
    console.error(err);
  }
}

async function deleteUser() {
  //delete one user

  if (!Deleteuser.value.trim()) {
    console.error("User name is empty!");
    return;
  }

  try {
    const data = await fetch(
      `http://localhost:5000/api/users/${Deleteuser.value}`,
      {
        method: "DELETE",
      }
    );
    if (!data.ok) {
      const errorData = await data.json();
      throw new Error(`Erro fetch: ${errorData.msg || data.statusText}`);
    }
    const Users = await data.json();
    output.innerHTML = "";
    Users.forEach((user) => {
      const div = document.createElement("div");
      div.textContent = `user: ${user.userName} id: ${user.id}`;
      output.appendChild(div);
    });

    Deleteuser.value = "";
    
  } catch (err) {
    console.error(err);
  }
}

async function updateUserId(){
  if(newUserName.value === 0 || id.value === 0){
    return window.alert("Coloque um valor");
  }
  const userName = newUserName.value
  try{
    const data = await fetch(`http://localhost:5000/api/users/${id.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName }),
    });

    if (!data.ok) {
      const errorData = await data.json();
      throw new Error(`Erro fetch: ${errorData.msg || data.statusText}`);
    }
    const Users = await data.json();
    output.innerHTML = "";
    Users.forEach((user) => {
      const div = document.createElement("div");
      div.textContent = `user: ${user.userName} id: ${user.id}`;
      output.appendChild(div);
    });

    newUserName.value = "";
    id.value = "";

  }catch(err){
    console.error(err)
  }
}

submitNU.addEventListener("click", newUser);
SingleUserBTN.addEventListener("click", getUser);
DeleteUserBTN.addEventListener("click", deleteUser);
ShowUserBTN.addEventListener("click", getUsers);
UpdateUserBTN.addEventListener('click', updateUserId)
