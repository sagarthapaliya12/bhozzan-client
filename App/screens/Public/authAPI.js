import api from '../../helpers/axios'
import { redirectActions } from '../../redux/ui/redirectSlice'
// import { reset } from './authSlice'

const login = async (username, password) => {
  try {
    const { data } = await api.post('/user/login', {
      username,
      password,
    })

    // {id, role, accessToken, refreshToken}
    //local storage
    // localStorage.setItem('user', JSON.stringify({ ...data }))

    api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`

    return data
  } catch (err) {
    throw new Error(err.response.data.error)
  }
}

const logout = async (dispatch) => {
  try {
    const response = await api.get('/user/logout')
    localStorage.removeItem('user')
    // dispatch(reset())
    dispatch(redirectActions.setRedirect('/login'))
    return response?.data.message
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

const authService = {
  login,
  logout,
}

export default authService
