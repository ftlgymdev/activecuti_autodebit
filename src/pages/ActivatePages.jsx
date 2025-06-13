import React, { useState } from 'react'

const ActivatePages = () => {
  const [form, setForm] = useState({
    nomorKartu: '',
    email: '',
    tanggalAktif: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submit
  };

  return (
    <div className='activate-bg'>
      <div className='activate-card'>
        <div className='activate-header'>
          <h2>Pengajuan Aktif Saat Cuti Membership Berlangsung</h2>
          <p className='activate-subtitle'>(Khusus Member Autodebet)</p>
          <hr />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='activate-grid'>
            <div className='activate-form-section'>
              <div className='activate-form-group'>
                <label>Nomor Kartu</label>
                <div className='activate-input-icon'>
                  <span><i className="fa fa-credit-card" /></span>
                  <input
                    type="text"
                    name="nomorKartu"
                    value={form.nomorKartu}
                    onChange={handleChange}
                    placeholder="Masukan Nomor Kartu"
                  />
                </div>
              </div>
              <div className='activate-form-group'>
                <label>Email Member</label>
                <div className='activate-input-icon'>
                  <span><i className="fa fa-envelope" /></span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Masukan E-mail Member"
                  />
                </div>
              </div>
              <div className='activate-form-group'>
                <label>Tanggal Aktif Kembali</label>
                <div className='activate-input-icon'>
                  <span><i className="fa fa-calendar" /></span>
                  <input
                    type="date"
                    name="tanggalAktif"
                    value={form.tanggalAktif}
                    onChange={handleChange}
                    placeholder="Masukan Tanggal Aktif Kembali"
                  />
                </div>
              </div>
              <button type="submit" className='activate-submit-btn'>
                Submit
              </button>
            </div>
            <div className='activate-info-section'>
              <div>
                <div className='activate-info-title'>Next Cycle Info</div>
                <div className='activate-info-box'>
                  <span><i className="fa fa-info-circle" /></span>
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</span>
                </div>
              </div>
              <div>
                <div className='activate-info-title'>Informational Notes</div>
                <div className='activate-info-box'>
                  <span><i className="fa fa-info-circle" /></span>
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ActivatePages