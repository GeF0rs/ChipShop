import axios from 'axios';

class AuthService {
  login(user) {
    return axios
      .post('Account/Login', {
        email: user.email,
        pass: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post( 'Account/Register', {
      name: user.name,
      surname: user.surname,
      email: user.email,
      pass: user.password
    });
  }
}

export default new AuthService();
