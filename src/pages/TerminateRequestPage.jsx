import React, { useState, useEffect } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { BsCardImage } from 'react-icons/bs';
import { FaAddressCard, FaFileImage } from 'react-icons/fa';
import { MdAlternateEmail, MdEmail } from 'react-icons/md';
import { getInfoNotesTerminate } from '../api/terminate';
import { getMember } from '../api/member';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import ConfirmModal from '../components/ConfirmModal';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const TerminateRequestPage = () => {
  const [form, setForm] = useState({
    nomorKartu: '',
    email: '',
    tanggalAktif: '',
    file: null,
  });

  const [dataMember, setDataMember] = useState({
    namaMember: '',
    periodeMember: '',
  });
  const [searchStatus, setSearchStatus] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [infoNotes, setInfoNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState({
    infoNotes: false,
    submit: false,
    file: false,
    search: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const getInfoNotes = async () => {
    setIsLoading({ ...isLoading, infoNotes: true });
    try {
      const response = await getInfoNotesTerminate();
      if (response?.status) {
        setInfoNotes(response?.data || 'Tidak ada informasi');
      } else {
        console.error('Failed to fetch info notes:', response.status);
        setInfoNotes('Terjadi kesalahan saat mengambil informasi');
      }
    } catch (error) {
      console.error('Error fetching info notes:', error);
      setInfoNotes('Terjadi kesalahan saat mengambil informasi');
    } finally {
      setIsLoading({ ...isLoading, infoNotes: false });
    }
  };

  const getMember = async () => {
    setIsLoading({ ...isLoading, search: true });
    try {
      const response = await getMember(form);
      if (response?.status) {
        setDataMember({
          namaMember: response?.data?.namaMember,
          periodeMember: response?.data?.periodeMember,
        });
        setSearchStatus('found');
      } else {
        console.error('Failed to fetch member:', response.status);
        setSearchStatus('notfound');
      }
    } catch (error) {
      console.error('Error fetching member:', error);
      setSearchStatus('notfound');
    } finally {
      setIsLoading({ ...isLoading, search: false });
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'nomorKartu':
        if (!value.trim()) {
          return 'Nomor kartu harus diisi';
        }
        if (value.length < 4) {
          return 'Nomor kartu minimal 4 karakter';
        }
        if (value.length > 16) {
          return 'Nomor kartu maksimal 16 karakter';
        }
        return '';
      
      case 'email':
        if (!value.trim()) {
          return 'Email harus diisi';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Format email tidak valid';
        }
        return '';
      
      case 'tanggalAktif':
        if (!value) {
          return 'Tanggal terminate harus diisi';
        }
        const selectedDate = new Date(value);
        const today = new Date();
        const minDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from today
        
        // if (selectedDate < minDate) {
        //   return 'Tanggal terminate minimal 30 hari dari hari ini';
        // }
        // return '';
      
      case 'file':
        if (!value) {
          return 'File harus diupload';
        }
        return '';
      
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleChangeNoCard = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setForm({ ...form, [e.target.name]: value });
    
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '');
    setForm({ ...form, [e.target.name]: value });
    
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tanggalAktif') {
      setFormattedDate(formatDate(value));
      setForm({ ...form, [name]: formatDate(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // file size 10MB
      if (file.size > 10 * 1024 * 1024) {
        setErrors({ ...errors, file: 'Ukuran file maksimal 1MB' });
        return;
      }
      
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, file: 'Format file harus PNG, JPG, atau JPEG' });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, file: reader.result });
        setFileName(file.name);
        setErrors({ ...errors, file: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors({ ...errors, file: 'Ukuran file maksimal 1MB' });
        return;
      }
      
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, file: 'Format file harus PNG, JPG, atau JPEG' });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, file: reader.result });
        setFileName(file.name);
        setErrors({ ...errors, file: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setTouched({
      nomorKartu: true,
      email: true,
      tanggalAktif: true,
      file: true
    });
    
    if (validateForm()) {
      setShowConfirmModal(true);
    } else {
      console.log('Form has errors:', errors);
    }
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);
    setIsLoading({ ...isLoading, submit: true });
    try {
      const response = await activate(form);
      if (response?.status) {
        setResponseMessage(response?.message || 'Pengajuan terminasi berhasil dikirim!');
        setShowSuccessModal(true);
        console.log('Form is valid, submitting:', form);
      } else {
        setResponseMessage(response?.message || 'Gagal mengirim pengajuan terminasi. Silakan coba lagi.');
        setShowErrorModal(true);
        console.error('Failed to submit form:', response.status);
      }
    } catch (error) {
      setResponseMessage('Terjadi kesalahan saat mengirim pengajuan. Silakan coba lagi.');
      setShowErrorModal(true);
      console.error('Error submitting form:', error);
    }
    setIsLoading({ ...isLoading, submit: false });
  };

  const handleCancelSubmit = () => {
    setShowConfirmModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setForm({
      nomorKartu: '',
      email: '',
      tanggalAktif: '',
      file: null,
    });
    setDataMember({
      namaMember: '',
      periodeMember: '',
    });
    setSearchStatus('');
    setPreviewUrl(null);
    setFileName('');
    setTouched({});
    setErrors({});
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  useEffect(() => {
    // getInfoNotes(); //nyalain fungsi ini kalo udah ada apinya
    console.log('Ini get info notes');
  }, []);

  useEffect(() => {
    if (form?.nomorKartu && form?.email) {
      // getMember(); //nyalain fungsi ini kalo udah ada apinya
      console.log('Ini get member');
    } else {
      setDataMember({
        namaMember: '',
        periodeMember: '',
      });
      setSearchStatus('');
    }
  }, [form?.nomorKartu, form?.email]);

  useEffect(() => {
    if (form?.file) {
      setPreviewUrl(form?.file);
    } else {
      setPreviewUrl(null);
      setFileName('');
    }
  }, [form?.file]);

  return (
    <div className="activate-bg">
      <div className="activate-card">
        <div className="activate-header">
          <h2>Pengajuan Terminate</h2>
          <p className="activate-subtitle">(Khusus Member Autodebet)</p>
          <hr />
        </div>
        <form onSubmit={submitForm}>
          <div className="activate-form-section">
            <div className="activate-form-row">
              <div className="activate-form-group">
                <label>Nomor Kartu</label>
                <div className="activate-input-icon">
                  <span><FaAddressCard/></span>
                  <input
                    type="text"
                    name="nomorKartu"
                    value={form?.nomorKartu}
                    onChange={handleChangeNoCard}
                    onBlur={handleBlur}
                    placeholder="Masukan Nomor Kartu"
                    className={touched?.nomorKartu && errors?.nomorKartu ? 'error' : ''}
                  />
                </div>
                {touched?.nomorKartu && errors?.nomorKartu && (
                  <div className="error-message">{errors?.nomorKartu}</div>
                )}
              </div>
              <div className="activate-form-group">
                <label>Email Member</label>
                <div className="activate-input-icon">
                  <span><MdAlternateEmail /></span>
                  <input
                    type="email"
                    name="email"
                    value={form?.email}
                    onChange={handleChangeEmail}
                    onBlur={handleBlur}
                    placeholder="Masukan Email Member"
                    className={touched?.email && errors?.email ? 'error' : ''}
                  />
                </div>
                {touched?.email && errors?.email && (
                  <div className="error-message">{errors?.email}</div>
                )}
              </div>
            </div>
            {searchStatus === 'found' ? (
            <div className="display-member-box" style={{opacity:0.5}}>
              <div className="nama-member-box">{dataMember?.namaMember}</div>
              <div className="periode-member-box" >{dataMember?.periodeMember}</div>
            </div>
            ) : (
              <div className="display-member-box" style={{opacity:0.8}}>
                <div className="nama-member-box">Nama Member</div>
                <div className="periode-member-box">Periode Member</div>
              </div>
            )}
            <div className="activate-form-group">
              <label>Tanggal Terminate (Efektif 30 hari dari hari ini)</label>
              <div className="activate-input-icon">
                <span><BiCalendar/></span>
                <input
                  type="date"
                  name="tanggalAktif"
                  value={form?.tanggalAktif}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Masukan Tanggal Terminate"
                  className={touched?.tanggalAktif && errors?.tanggalAktif ? 'error' : ''}
                />
              </div>
              {touched?.tanggalAktif && errors?.tanggalAktif && (
                <div className="error-message">{errors?.tanggalAktif}</div>
              )}
            </div>
            <div className="activate-info-row">
              <div className="activate-info-block">
                <div className="activate-info-title">Informational Notes</div>
                <div className="activate-info-box">
                  <span><IoMdInformationCircleOutline /></span>
                  {isLoading?.infoNotes ? (
                    <span>Loading...</span>
                  ) : (
                    <span 
                      dangerouslySetInnerHTML={{ 
                        __html: infoNotes 
                      }}
                    />
                  )}
                </div>
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
                    <RiUploadCloud2Fill />
                    </span>
                    <div>
                      {form?.file ? (
                        <span>{fileName}</span>
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
                {touched?.file && errors?.file && (
                  <div className="error-message">{errors?.file}</div>
                )}
              </div>
              <div className="activate-form-group" style={{ flex: 1 }}>
                <label>Preview</label>
                <div className="file-preview-box">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: 120, 
                        borderRadius: 8, 
                        display: 'block', 
                        margin: '0 auto',
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        console.error('Error loading image preview');
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="file-preview-placeholder">
                      <span><FaFileImage style={{ fontSize: 32, color: '#444' }} /></span>
                      <div style={{ color: '#888', fontSize: 14, marginTop: 8 }}>Preview file akan ditampilkan disini</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button disabled={isLoading?.submit} type="submit" className="activate-submit-btn">
              {isLoading?.submit ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        <ConfirmModal
          isOpen={showConfirmModal}
          title="Konfirmasi Pengajuan"
          message="Apakah Anda yakin untuk mengajukan terminasi?"
          onConfirm={handleConfirmSubmit}
          onCancel={handleCancelSubmit}
          isLoading={isLoading?.submit}
        >
          <div className="modal-info">
            <div><strong>Nomor Kartu:</strong> {form?.nomorKartu}</div>
            <div><strong>Email:</strong> {form?.email}</div>
            <div><strong>Nama Member:</strong> {dataMember?.namaMember}</div>
            <div><strong>Tanggal Terminate:</strong> {form?.tanggalAktif}</div>
          </div>
        </ConfirmModal>

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          message={responseMessage}
          onClose={handleCloseSuccessModal}
        />

        {/* Error Modal */}
        <ErrorModal
          isOpen={showErrorModal}
          message={responseMessage}
          onClose={handleCloseErrorModal}
        />
      </div>
    </div>
  );
};

export default TerminateRequestPage;