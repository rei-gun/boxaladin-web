import axios from 'axios'
import envChecker from '../utils/envChecker'

const getUserAction = (payload) => ({
	type: 'GET_USER',
	payload
})

export const getUser = () => {
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `${envChecker('api')}/users/info`,
			headers: {
				token: localStorage.getItem('token'),
			}
		})
		.then(({data}) => {
			dispatch(getUserAction(data))
		})
		.catch(err => {
				localStorage.removeItem('token')
				window.location.replace('/home')
			}
		)
	}
}

export const refreshToken = () => {
	return (dispatch) => {
		axios({
			method: 'GET',
			url: `${envChecker('api')}/users/token`,
			headers: {
				token: localStorage.getItem('token'),
			}
		})
		.then(({data}) => {
			// console.log('TOKEN LAMA:', localStorage.getItem('token'))
			localStorage.removeItem('token')
			localStorage.setItem('token', data.token)
			// console.log('TOKEN BARU:', localStorage.getItem('token'))
		})
		.catch(err => console.log(err))
	}
}
