import React, { useState, useEffect } from 'react';

const ActivatePages = () => {
  const [form, setForm] = useState({
    nomorKartu: '',
    email: '',
    tanggalAktif: '',
    file: null,
  });
  const [namaMember, setNamaMember] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    // Simulate search: if nomorKartu and email are filled, "find" member
    if (form.nomorKartu && form.email) {
      if (
        form.nomorKartu === '1234' &&
        form.email.toLowerCase() === 'test@email.com'
      ) {
        setNamaMember('Budi Santoso');
        setSearchStatus('found');
      } else {
        setNamaMember('');
        setSearchStatus('notfound');
      }
    } else {
      setNamaMember('');
      setSearchStatus('');
    }
  }, [form.nomorKartu, form.email]);

  useEffect(() => {
    if (form.file) {
      const url = URL.createObjectURL(form.file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [form.file]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, file: e.target.files[0] });
    }
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
    <div className="activate-bg">
      <div className="activate-card">
        <div className="activate-header">
          <h2>Pengajuan Terminate</h2>
          <p className="activate-subtitle">(Khusus Member Autodebet)</p>
          <hr />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="activate-form-section">
            <div className="activate-form-row">
              <div className="activate-form-group">
                <label>Nomor Kartu</label>
                <div className="activate-input-icon">
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
              <div className="activate-form-group">
                <label>Email Member</label>
                <div className="activate-input-icon">
                  <span><i className="fa fa-envelope" /></span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Masukan Email Member"
                  />
                </div>
              </div>
            </div>
            {/* Nama Member search result */}
            <div className="activate-form-group">
              {/* <label>Nama Member</label> */}
              {searchStatus === 'found' ? (
                <div className="nama-member-box">{namaMember}</div>
              ) : searchStatus === 'notfound' ? (
                <div className="nama-member-notfound">Member tidak ditemukan</div>
              ) : (
                <div className="nama-member-input" style={{ opacity: 0.5 }}>Nama Member</div>
              )}
            </div>
            <div className="activate-form-group">
              <label>Tanggal Aktif Kembali</label>
              <div className="activate-input-icon">
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
            <div className="activate-form-row">
              <div className="activate-form-group" style={{ flex: 1 }}>
                <label>Upload Berkas Bertanda Tangan Basah</label>
                <div
                  className="file-upload-box"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="file-upload-content">
                    <span className="file-upload-icon">
                      <i className="fa fa-cloud-upload" />
                    </span>
                    <div>
                      {form.file ? (
                        <span>{form.file.name}</span>
                      ) : (
                        <>
                          <span>Pilih file atau drag & drop di sini</span>
                          <br />
                          <span className="file-upload-desc">
                            PNG, JPG and JPEG Up to 5 MB
                          </span>
                        </>
                      )}
                    </div>
                    <label className="file-upload-btn">
                      Browse File
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept=".png,.jpg,.jpeg"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="activate-form-group" style={{ flex: 1 }}>
                <label>Preview</label>
                <div className="file-preview-box">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 8, display: 'block', margin: '0 auto' }}
                    />
                  ) : (
                    <div className="file-preview-placeholder">
                      <span><i className="fa fa-image" style={{ fontSize: 32, color: '#444' }} /></span>
                      <div style={{ color: '#888', fontSize: 14, marginTop: 8 }}>Preview file akan ditampilkan disini</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="activate-info-row">
              <div className="activate-info-block">
                <div className="activate-info-title">Next Cycle Info</div>
                <div className="activate-info-box">
                  <span><i className="fa fa-info-circle" /></span>
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</span>
                </div>
              </div>
              <div className="activate-info-block">
                <div className="activate-info-title">Informational Notes</div>
                <div className="activate-info-box">
                  <span><i className="fa fa-info-circle" /></span>
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</span>
                </div>
              </div>
            </div>
            <button type="submit" className="activate-submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivatePages;