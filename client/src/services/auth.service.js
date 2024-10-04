import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth/';

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + 'login', { email, password })
      .then((response) => {
        if (response.data.token) {
          console.log(response.data);

          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  google_login = async (code) => {
    // Send the credential (ID token) to your backend for verification
    return axios.post('http://localhost:8081/api/auth/google-login', {
      token: code,
    })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('user', JSON.stringify(res.data));
        }

        return res.data;
      });
  };

  logout() {
    localStorage.removeItem('user');
  }

  register(fullname, email, password) {
    return axios.post(API_URL + 'signup', {
      fullname,
      email,
      password,
    });
  }
}

export default new AuthService();
