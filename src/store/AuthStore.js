import create from 'zustand'
// import {devtools,persist} from 'zustand/middleware'
import ky from 'ky'
import jwt_decode from 'jwt-decode'
const useStore = create((set) => ({
  user: {},
  status: null,
  loginGoogle: async (respose) => {  
    const response = await ky.get(
      'https://www.googleapis.com/auth/userinfo.email',
      {
        headers: {
          Authorization: `Bearer ${respose.access_token}`,
        },
      }
    ) 
  },
  validateUser: async () => {
    const accessToken = localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
    set({
      status: null,
    })
    if (accessToken) {
      const resp = ky
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          throwHttpErrors: false,
        })
        .json()
        .then((resp) => { 
          if (resp.message) {
            localStorage.removeItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
            set({
              status: false,
            })
          } else {
            set({
              status: true,
            })
            set({
              user: resp,
            })
          }
        })
        .catch((err) => {
          localStorage.removeItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
          set({
            status: false,
          })
          console.log('error : ', err)
        })
    } else {
      set({
        status: false,
      })
    }
  },
  logOut: () => {
    localStorage.removeItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)
    set({
      status: false,
    })
    set({
      user: {},
    })
  },
  editPerfil: (perfil) => {
    set({
      user: perfil,
    })
  },
  invitadoUSer: () => {
    set({user: {name: 'Mystery user'}})
    set({
      status: true,
    })
  },
}))

export default useStore
