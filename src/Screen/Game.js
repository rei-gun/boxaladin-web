import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, Form, FormGroup, Input } from 'reactstrap'
import axios from 'axios'

import Coin from '../../src/asset/Game/win/token.png'
import Star from '../../src/asset/Game/win/star.svg'

import win1 from '../../src/asset/Game/win/100rb.png'
import win2 from '../../src/asset/Game/win/50rb1.png'
import win3 from '../../src/asset/Game/win/50rb2.png'
import win4 from '../../src/asset/Game/win/25rb1.png'
import win5 from '../../src/asset/Game/win/25rb2.png'

import WinSfx from '../../src/asset/sound/Win-sfx.mp3'
import LoseSfx from '../../src/asset/sound/Lose-sfx.mp3'


import { getUser } from '../actions/userAction'
import { getUserWins } from '../actions/winAction'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			si1: null,
			si2: null,
			si3: null,

			slot1_atas: 5,
			slot2_atas: 5,
			slot3_atas: 5,

			slot1: 6,
			slot2: 6,
			slot3: 6,

			slot1_bawah: 0,
			slot2_bawah: 0,
			slot3_bawah: 0,

			speed1: 30,
			speed2: 20,
			speed3: 15,

			itemsdummy1: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],
			itemsdummy2: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],
			itemsdummy3: ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'boxaladin'],

			isRunning: false,
			modalWin: false,
			modalLose: false,
			key: 0,
			pulsaAmount: 0,
			notif: '',
			winResult: null,
			gameCount: 1,
			mustWin: false,
		}

		this.toggle = this.toggle.bind(this)
	}

	dropdownConvert=()=>{
		return(
		<div>
			<div>
				<Form onSubmit={this.upCoin}>
					<FormGroup>
						<Input className="dompet__content__key__topup__dropdown" type="select" id="upcoin" name="aladinConvert" onChange={(e) => this.setState({ key: parseInt(e.target.value, 10) })}>
							<option selected="true" disabled="true" value=''>-- Select --</option>
							<option value={1}>1</option>                  
							<option value={2}>2</option>
							<option value={5}>5</option>
							<option value={this.props.userInfo.aladinKeys}>max</option>
						</Input>
					</FormGroup>
					<label>1 Kunci Aladin  = 5 Koin</label>
					<FormGroup>
							<button className="dompet__content__key__button" color="primary" type="submit">Tukar</button>
					</FormGroup>
				</Form>
			</div>
		<div>
			<label className="alert__dompetAladin">{this.state.notif2}</label>
		</div>
	</div>
		)
	}

	

	render() {

		return (
			<div className="game">
				<div className="game__container">
					<label>ALADIN GAME</label>
					<label>1 Koin = 1x Main</label>
					<div>
						<div className="game__convert">
								<label>Tukar Kunci Jadi Koin</label>
								{this.dropdownConvert()}
							</div>
						<label className="alert__game">{this.state.notif}</label>
							<div  className="game__slotCoin">
								<img className="game__slotCoin__icon" src={Coin} alt="coin"/>
								<label> <b> : {this.props.userInfo.coin}</b></label>
							</div>
							<div className="game__slotItems">
								<div className="game__slotItems__boxContainer">
									<div className="game__slotItems__boxContainer__box">
										<div className={this.state.itemsdummy1[this.state.slot1_atas]} />
										<div className={this.state.itemsdummy1[this.state.slot2_atas]} />
										<div className={this.state.itemsdummy1[this.state.slot3_atas]} />
									</div>
									<div className="game__slotItems__boxContainer__box">
										<div className={this.state.itemsdummy1[this.state.slot1]} />
										<div className={this.state.itemsdummy1[this.state.slot2]} />
										<div className={this.state.itemsdummy1[this.state.slot3]} />
									</div>
									<div className="game__slotItems__boxContainer__box">
										<div className={this.state.itemsdummy1[this.state.slot1_bawah]} />
										<div className={this.state.itemsdummy1[this.state.slot2_bawah]} />
										<div className={this.state.itemsdummy1[this.state.slot3_bawah]} />
									</div>
								</div>
							</div>

					</div>
					<div className="game__slotButton">
							<button disabled={this.state.isRunning} className="game__slotButton__start" onClick={ () => this.start() }>START</button>
							<button disabled={!this.state.isRunning} className="game__slotButton__start" onClick={ () => this.stop() }>STOP</button>
					</div>

				</div>

				<div className="game__prize">
					<label className="game__prize__title">Game Prize</label>
					<label>
						Dapatkan hadiah pulsa Rp. 10.000,- dengan mendapatkan salah satu kombinasi bawah ini GRATIS!
					</label>

					<div className="game__prize__row">
						<div className="game__prize__container">
							<img className="game__prize__img" src={win1} alt="coin" />
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src={win2} alt="coin" />
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src={win3} alt="coin" />
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src={win4} alt="coin" />
						</div>

						<div className="game__prize__container">
							<img className="game__prize__img" src={win5} alt="coin" />
						</div>
					</div>

				</div>

					<Modal isOpen={this.state.modalWin} className="gameModal">
						<ModalHeader toggle={this.toggle} className="gameModal__Top"></ModalHeader>
							<div className="gameModal__Container">

								<div className="gameModal__Container__item">
									<img className="gameModal__icon" src={Star} alt="Star" />
								</div>

								<label className="gameModal__Container__text">
									selamat
								</label>

								<label className="gameModal__Container__text">
									anda mendapatkan hadiah
								</label>

								<label className="gameModal__Container__text">
									berupa Rp.{this.state.pulsaAmount.toLocaleString(['ban', 'id'])} pulsa gratis
								</label>
							</div>
					</Modal>

				{ this.state.modalLose ? <audio src={LoseSfx} autoPlay /> : null }
				{ this.state.modalWin ? <audio src={WinSfx} autoPlay /> : null }
			</div>
		)
	}

	componentDidMount() {
		this.props.getUser()
		this.getGameCount()
	}
	//

	async getGameCount() {
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_HOST}/lose`,
			headers: {
				key: process.env.REACT_APP_KEY
			}
		})
		.then( async ({data}) => {
			await this.setState({gameCount: data[0].count})
		})
		.catch(err => console.log(err))
	}

	// increaseGameCount() {
	// 	axios({
	// 		method: 'GET',
	// 		url: `${process.env.REACT_APP_API_HOST}/lose/increase`
	// 	})
	// 	.then(({data}) => {
	// 		this.getGameCount()
			// return console.log(data)
	// 	})
		// .catch(err => console.log(err))
	// }

	upCoin = (e) => {
		e.preventDefault()

		if (this.state.key <= 0) {
			return this.setState({
        notif: "Harus Lebih Besar Dari 0",
      })
		} else if (this.state.key === null || this.state.key === '') {
			return this.setState({
				notif: "Tidak Boleh Kosong",
			})
		}	else {
			this.setState({
				notif:""
			})
		}

		// CEK SISA ALADIN KEY LANGSUNG DARI API
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_HOST}/users/info`,
			headers: {
				token: localStorage.getItem('token'),
				key: process.env.REACT_APP_KEY
			}
		})
		.then(({data}) => {
			if (this.state.key > data.aladinKeys) {
				return this.setState({
					notif: "Aladin Key Tidak Cukup",
				})
			} else {

				// REQUEST UPDATE ALADIN KEY DAN COIN KE API
				axios({
					method: 'PUT',
					url: `${process.env.REACT_APP_API_HOST}/users/upcoin`,
					data: {
						key: this.state.key
					},
					headers: {
						token: localStorage.getItem('token'),
						key: process.env.REACT_APP_KEY
					}
				})
				.then(response => {

					this.setState({
						coin: 0,
						key: null
					})

					document.getElementById('upcoin').value = ''
					this.props.getUser()

				})
				.catch(err => console.log(err))

			}
		})
		.catch(err => console.log(err))

		// if (this.state.key > this.props.userInfo.aladinKeys) {
		// 	return this.setState({
    //     notif: "Aladin Key Tidak Cukup",
    //   })
		// }

	}

	submitResult(result) {
		if (result === 0) {
			// this.reset()
			this.setState({
				modalLose: true,
			})
			return
		} else {


			// const slots = [ slot1, slot2, slot3 ]
			// const stars = slots.filter(data => data === 6)

			// console.log('starts:', stars)
			// console.log('Total bintang: ', stars.length)

			axios({
				method: 'POST',
				url: `${process.env.REACT_APP_API_HOST}/win`,
				headers: {
					token: localStorage.getItem('token'),
					key: process.env.REACT_APP_KEY
					},
				data: {
					star: result
				}
			})
			.then(({data}) => {
				this.setState({
					pulsaAmount: data.data.gamerule.pulsaAmount,
					winResult: data.data,
					modalWin:true,
				})

				this.props.getUser()
				this.props.getUserWins()

			})
			.catch(err => console.log(err))

		}
	}

	toggle() {
		this.setState({
			pulsaAmount: 0,
			modalWin: false,
		})
		this.reset()

		this.props.history.push('/claimfreepulsa', this.state.winResult)
	}

	handleResult() {
		switch (this.state.slot1.toString() + this.state.slot2.toString() + this.state.slot3.toString()) {
			case '666':
				return 5

			case '000':
				return 4

			case '555':
				return 3

			case '560':
				return 2

			case '065':
				return 1

			default:
				return 0
		}
	}

	handleBingo() {
		// if (this.state.slot3 === this.state.itemsdummy3.length - 1 && (this.state.slot1 === this.state.slot2 && this.state.slot2 === this.state.slot3) ) {
		// 	this.setState({ slot3: this.state.slot3 - (this.state.itemsdummy3.length - 1) })
		// }

		switch (this.handleResult()) {
			case 5:
				return this.setState({
					slot3_atas: 6,
					slot3: 0,
					slot3_bawah: 1
				})

			case 4:
				return this.setState({
					slot3_atas: 0,
					slot3: 1,
					slot3_bawah: 2
				})

			case 3:
				return this.setState({
					slot3_atas: 5,
					slot3: 6,
					slot3_bawah: 0
				})

			case 2:
				return this.setState({
					slot3_atas: 0,
					slot3: 1,
					slot3_bawah: 2
				})

			case 1:
				return this.setState({
					slot3_atas: 5,
					slot3: 6,
					slot3_bawah: 0
				})

			default:
				return null
		}
	}

	async start() {
		// this.increaseGameCount()
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_HOST}/lose`
		})
		.then( async ({data}) => {
			if (((data[0].count) >= 50) && ((data[0].count) % 50 === 0)) {
				await this.setState({mustWin: true})
			}

			axios({
				method: 'GET',
				url: `${process.env.REACT_APP_API_HOST}/win/checkcoin/user`,
				headers:{
					token: localStorage.getItem('token'),
					key: process.env.REACT_APP_KEY
				},
			})
			.then(data => {
				var coinUser = data.data.coin
				if (data.data.message === 'limit habis') {
					if ( coinUser <= 0 || coinUser === -1 )  {
						this.setState({
							notif: "Maaf Anda tidak punya coin untuk bermain game."
						})
					}
						axios({
							method: 'PUT',
							url: `${process.env.REACT_APP_API_HOST}/users/coin`,
							headers: {
								token: localStorage.getItem('token'),
								key: process.env.REACT_APP_KEY
							},
							data: {
								coin: this.props.userInfo.coin
							}
						})
						.then(({data}) => {
							this.props.getUser()
						})
						.catch(err => {
							console.log(err)
						})

						this.start1()
						this.start2()
						this.start3()

						this.setState({
							isRunning: true,
							notif: '',
							modalLose: false,
							mustWin: false
						})
						
				} else if (data.data.result <=5 && data.data.result >= 0) {
					var check = data.data.result
					if ( coinUser <= 0 || coinUser === -1 )  {
						this.setState({
							notif: "Maaf Anda tidak punya coin untuk bermain game."
						})
					}
					else if ( check <= 3 ) {
						axios({
							method: 'PUT',
							url: `${process.env.REACT_APP_API_HOST}/users/coin`,
							headers: {
								token: localStorage.getItem('token'),
								key: process.env.REACT_APP_KEY
							},
							data: {
								coin: this.props.userInfo.coin
							}
						})
						.then(({data}) => {
							this.props.getUser()
						})
						.catch(err => {
							console.log(err)
						})

						this.start1()
						this.start2()
						this.start3()

						this.setState({
							isRunning: true,
							notif: '',
							modalLose: false
						})

					}
				}
			})
			.catch(err => console.log(err))

		})
		.catch(err => console.log(err))



	}

	async stop() {
		this.stop1()
		this.stop2()
		this.stop3()

		await this.handleBingo()

    // HANDLE PEMAIN KE 21 OTOMATIS WIN
		if (this.state.mustWin === true) {

			await this.setState({
				slot1_atas: 6,
				slot2_atas: 5,
				slot3_atas: 4,

				slot1: 0,
				slot2: 6,
				slot3: 5,

				slot1_bawah: 1,
				slot2_bawah: 0,
				slot3_bawah: 6,
			})
		}

		this.getGameCount()

		this.submitResult(this.handleResult())

		this.setState({
			si1: null,
			si2: null,
			si3: null,
			isRunning: false,
			mustWin: false
		})

		// this.toggle()
	}

	reset() {
		this.setState({
			slot1: 6,
			slot2: 6,
			slot3: 6,

			slot1_atas: 5,
			slot2_atas: 5,
			slot3_atas: 5,

			slot1_bawah: 0,
			slot2_bawah: 0,
			slot3_bawah: 0
		})
	}

	start1() {


		var _this = this
		var i = 0

		this.setState.si1 = setInterval(function() {

			_this.setState({
				slot1: i,
				slot1_atas: i === 0 ? _this.state.itemsdummy1.length-1 : i-1,
				slot1_bawah: i === _this.state.itemsdummy1.length-1 ? 0 : i+1
			})

			if (i < _this.state.itemsdummy1.length-1) {
				i++
			} else {
				i=0
			}

  	}, this.state.speed1)

	}

	stop1() {

		clearInterval(this.setState.si1)
	}

	start2() {


		var _this = this
		var i = 0

		this.setState.si2 = setInterval(function() {

			_this.setState({
				slot2: i,
				slot2_atas: i === 0 ? _this.state.itemsdummy2.length-1 : i-1,
				slot2_bawah: i === _this.state.itemsdummy1.length-1 ? 0 : i+1
			})

			if (i < _this.state.itemsdummy2.length-1) {
				i++
			} else {
				i=0
			}

  	}, this.state.speed2)

	}

	stop2() {

		clearInterval(this.setState.si2)
	}

	start3() {


		var _this = this
		var i = 0

		this.setState.si3 = setInterval(function() {

			_this.setState({
				slot3: i,
				slot3_atas: i === 0 ? _this.state.itemsdummy1.length-1 : i-1,
				slot3_bawah: i === _this.state.itemsdummy1.length-1 ? 0 : i+1
			})

			if (i < _this.state.itemsdummy3.length-1) {
				i++
			} else {
				i=0
			}

  	}, this.state.speed3)

	}

	stop3() {

		clearInterval(this.setState.si3)
	}




}

const mapStateToProps = (state) => {
	return {
		userInfo: state.userReducer.userInfo,
		userWins: state.winReducer.userWins,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: () => dispatch(getUser()),
		getUserWins: () => dispatch(getUserWins())
	}
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Game)

export default connectComponent
