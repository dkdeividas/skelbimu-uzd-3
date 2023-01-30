const createRegLoginForm = () => {
    docuemnt.querySelector('root').innerHTML = `
    <form>
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="user_email" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="user_passwd" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <button type="submit" class="btn btn-outline-secondary" id="user_register">Register</button>
    <button type="submit" class="btn btn-outline-info btn-lg" id="user_login">Login</button>
  </form>`
}

const createLogOutIcon = () => {
    docuemnt.querySelector('root').innerHTML = `
            <div class="row">
                <div class="offset-11 col-1">
                    <i class="bi bi-door-open" id="signOut"></i>
                </div>
            </div>`
}

export {createRegLoginForm, createLogOutIcon}