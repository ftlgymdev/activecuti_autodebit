import React, { useState } from 'react'

export const Autodebet = () => {
  const [form, setForm] = useState({
    nomorKartu: '',
    email: '',
    tanggalTerminate: '',
    file: null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm({ ...form, file: e.dataTransfer.files[0] });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submit
  };

  return (
    <div className='activate-bg'>
      <div className='activate-card'>
        <div className='activate-header'>
          <h2>Pengajuan Terminate</h2>
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
                <label>Tanggal Terminate</label>
                <div className='activate-input-icon'>
                  <span><i className="fa fa-calendar" /></span>
                  <input
                    type="date"
                    name="tanggalTerminate"
                    value={form.tanggalTerminate}
                    onChange={handleChange}
                    placeholder="Masukan Tanggal Terminate"
                  />
                </div>
              </div>
              <div className='activate-form-group'>
                <label>Upload Berkas Bertanda Tangan Basah</label>
                <div
                  className='file-upload-box'
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className='file-upload-content'>
                    <span className='file-upload-icon'><i className="fa fa-cloud-upload" /></span>
                    <div>
                      {form.file ? (
                        <span>{form.file.name}</span>
                      ) : (
                        <>
                          <span>Pilih file atau drag & drop di sini</span><br />
                          <span className='file-upload-desc'>PNG, PDF and Docs Formats. Up to 5 MB</span>
                        </>
                      )}
                    </div>
                    <label className='file-upload-btn'>
                      Browse File
                      <input type='file' style={{ display: 'none' }} onChange={handleFileChange} accept='.png,.pdf,.doc,.docx' />
                    </label>
                  </div>
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
