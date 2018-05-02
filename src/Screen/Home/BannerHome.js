//@flow
import React, {Component} from 'react';
import RegisterIcon from '../../asset/user/IconCheck.svg'

export default class BannerHome extends Component <{}> {

  render() {
    return (
      <div className="BannerText__container">
        <div className="BannerText__body">
          <div className="BannerText__header">
            <h1 className="BannerText__header__title">Cara Kerja</h1>
          </div>
          <div>
            <div className="BannerText__content">
              <div className="BannerText__icon__left">
                <img src={RegisterIcon} alt="RegisterIcon" className="BannerText__icon__register"/>
              </div>
              <div>
                <h3 className="BannerText__content__title">Registrasi</h3>
                <div>
                  <p className="BannerText__content__paragraph">Kalian kalau mau ikut bermain di boxaladin ini, jangan lupa registrasi terlebih dahulu ya! Ikutin setiap step yang diminta yah, dan jangan lupa verifikasiin akun kamu dengan nomor hape kamu.</p>
                </div>
              </div>
            </div>
            <div className="BannerText__content">
              <div>
                <h3 className="BannerText__content__title">Pilih Jenis Pulsa dan Nominalnya</h3>
                <div>
                  <p className="BannerText__content__paragraph">Nah abis registrasi, langsung aja klik ke jenis pulsa dan nominalnya sesuai dengan keiinginan kalian. Tapi kalian belum bisa nih ngintip harga boxaladin karena kita kunci harganya. Hehehe, penasaran ya?</p>
                </div>
              </div>
              <div className="BannerText__icon__right">
                <img src={RegisterIcon} alt="RegisterIcon" className="BannerText__icon__register"/>
              </div>
            </div>
            <div className="BannerText__content">
              <div className="BannerText__icon__left">
                <img src={RegisterIcon} alt="RegisterIcon" className="BannerText__icon__register"/>
              </div>
              <div>
                <h3 className="BannerText__content__title">Pembelian Kunci</h3>
                <div>
                  <p className="BannerText__content__paragraph">Tapi tenang aja, untuk kalian yang penasaran tinggal beli kunci aladin terus buka deh harganya. <b>Dijamin paling murah 1 dunia!</b> Oh iya, 1x mengintip harga berarti menggunakan 1 kunci aladin yah.</p>
                </div>
              </div>
            </div>
            <div className="BannerText__content">
              <div>
                <h3 className="BannerText__content__title">Waktu Lelang</h3>
                <div>
                  <p className="BannerText__content__paragraph">Jangan kebanyakan mikir, karena siapa cepat dia dapat. Waktu kalian cuman <b>15 detik</b> nih untuk memutuskan apakah kalian akan membeli harga spesial pulsa tersebut atau tidak. Kalau tidak, kalian akan nyesel deh pasti karena kalian akan kembali ke halaman awal lagi.</p>
                </div>
              </div>
              <div className="BannerText__icon__right">
                <img src={RegisterIcon} alt="RegisterIcon" className="BannerText__icon__register"/>
              </div>
            </div>
            <div className="BannerText__content">
              <div className="BannerText__icon__left">
                <img src={RegisterIcon} alt="RegisterIcon" className="BannerText__icon__register"/>
              </div>
              <div>
                <h3 className="BannerText__content__title">Masukkan Nomor Hape</h3>
                <div>
                  <p className="BannerText__content__paragraph">Yeay! Kalian udah dapat harga spesial pulsa tersebut nih. Tinggal masukkin aja nomor hape kalian dan lakukan pembayarannya.</p>
                </div>
              </div>
            </div>
            <div className="BannerText__content">
              <div>
                <h3 className="BannerText__content__title">Pembayaran</h3>
                <div>
                  <p className="BannerText__content__paragraph">Ingat! <b>12 jam</b> itu batas waktu kalian untuk melakukan pembayarannya. Jika melebihi <b>12 jam</b> itu, pulsa kalian akan hangus dan kami lelang kembali. Pulsa kalian akan langsung masuk ke nomor hape tujuan setelah pembayaran berhasil dilakukan ya. </p>
                </div>
              </div>
              <div className="BannerText__icon__right">
                <img src={RegisterIcon} alt="RegisterIcon" className="BannerText__icon__register"/>
              </div>
            </div>
            <div className="BannerText__content">
              <div className="BannerText__icon__left">
                <img src={RegisterIcon} alt="RegisterIcon" className="BannerText__icon__register"/>
              </div>
              <div>
                <h3 className="BannerText__content__title">Ruang Game</h3>
                <div>
                  <p className="BannerText__content__paragraph">Tapi tenang aja, buat kalian yang belum berhasil membeli barangnya, kalian bisa menukarkan kuni aladin kalian ke coin dan memainkannya di ruang game kami. Di ruang game ini kalian bisa menangin hadiah-hadiah menarik loh! SELAMAT MENCOBA.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="BannerText__content__footer">
            <div className="BannerText__icon__footer">
              <img src={RegisterIcon} alt="RegisterIcon" className="BannerText__icon__danger"/>
            </div>
            <label><b>HATI-HATI KETAGIHAN</b></label>
          </div>

        </div>
      </div>
    )
  }
}