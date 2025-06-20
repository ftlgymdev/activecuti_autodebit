import React, { useState, useEffect } from "react";
import { BiCalendar } from 'react-icons/bi';
import { FaAddressCard } from 'react-icons/fa';
import { MdAlternateEmail } from "react-icons/md";
import { getInfoNotesTerminate } from '../api/terminate';
import { getMember } from '../api/member';
import { FaCircleInfo } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { activateLeave, getInfoNotesActivate } from "../api/activate";
import ConfirmModal from '../components/ConfirmModal';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';
import InfoPopover from "../components/InfoPopover";

const ActivateLeavePage = () => {
  const [form, setForm] = useState({
    nomorKartu: "",
    email: "",
    tanggalAktif: "",
  });

  const [formattedDate, setFormattedDate] = useState("");

  const [dataMember, setDataMember] = useState({
    namaMember: '',
    periodeMember: '',
  });
  const [searchStatus, setSearchStatus] = useState('');
  const [infoNotes, setInfoNotes] = useState({
    infoNotes: '',
    nextCycleInfo: '',
  });
  const [isLoading, setIsLoading] = useState({
    infoNotes: false,
    nextCycleInfo: false,
    submit: false,
    search: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const getInfoNotes = async () => {
    setIsLoading({ ...isLoading, infoNotes: true, nextCycleInfo: true });
    try {
      const response = await getInfoNotesActivate();
      if (response?.status) {
        setInfoNotes({
          infoNotes: response?.data?.infoNotes || 'Tidak ada informasi',
          nextCycleInfo: response?.data?.nextCycleInfo || 'Tidak ada informasi',
        });
      } else {
        console.error('Failed to fetch info notes:', response.status);
        setInfoNotes({
          infoNotes: 'Terjadi kesalahan saat mengambil informasi',
          nextCycleInfo: 'Terjadi kesalahan saat mengambil informasi',
        });
      }
    } catch (error) {
      console.error('Error fetching info notes:', error);
      setInfoNotes({
        infoNotes: 'Terjadi kesalahan saat mengambil informasi',
        nextCycleInfo: 'Terjadi kesalahan saat mengambil informasi',
      });
    } finally {
      setIsLoading({ ...isLoading, infoNotes: false, nextCycleInfo: false });
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
          return 'Tanggal aktif harus diisi';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      nomorKartu: true,
      email: true,
      tanggalAktif: true
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
      const response = await activateLeave(form);
      
      if (response?.status) {
        setResponseMessage(response?.message || 'Pengajuan aktif saat cuti berhasil dikirim!');
        setShowSuccessModal(true);
        console.log('Form is valid, submitting:', form);
      } else {
        setResponseMessage(response?.message || 'Gagal mengirim pengajuan aktif saat cuti. Silakan coba lagi.');
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
    // Reset form after successful submission
    setForm({
      nomorKartu: '',
      email: '',
      tanggalAktif: '',
    });
    setDataMember({
      namaMember: '',
      periodeMember: '',
    });
    setSearchStatus('');
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

  return (
    <div className="activate-bg">
      <div className="activate-card">
        <div className="activate-header">
          <h2>Pengajuan Aktif Saat Cuti Membership Berlangsung</h2>
          <p className="activate-subtitle">(Khusus Member Autodebet)</p>
          <hr />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="activate-form-section">
            <div className="activate-form-row">
              <div className="activate-form-group">
                <div className="d-flex justify-content-start align-items-start">
                  <label>Nomor Kartu</label>
                  <InfoPopover 
                    content="Masukkan nomor kartu member yang tertera pada kartu membership Anda. Nomor kartu biasanya terdiri dari 4-16 digit angka."
                    placement="top"
                    className="ms-2"
                  >
                    <IoMdInformationCircleOutline />
                  </InfoPopover>
                </div>
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
            <div className="display-member-box">
              <div className="nama-member-box">{dataMember?.namaMember}</div>
              <div className="periode-member-box">{dataMember?.periodeMember}</div>
            </div>
            ) : (
              <div className="display-member-box">
                <div className="nama-member-box">Nama Member</div>
                <div className="periode-member-box">Periode Member</div>
              </div>
            )}
            <div className="activate-form-group">
              <label>Tanggal Aktif Kembali</label>
              <div className="activate-input-icon">
                <span><BiCalendar/></span>
                <input
                  type="date"
                  name="tanggalAktif"
                  value={form?.tanggalAktif}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Masukan Tanggal Aktif Kembali"
                  className={touched?.tanggalAktif && errors?.tanggalAktif ? 'error' : ''}
                />
              </div>
              {formattedDate && (
                <div className="formatted-date">
                  {formattedDate}
                </div>
              )}
              {touched?.tanggalAktif && errors?.tanggalAktif && (
                <div className="error-message">{errors?.tanggalAktif}</div>
              )}
            </div>
            <div className="activate-info-row">
              <div className="activate-info-block">
                <div className="activate-info-title">Next Cycle Info</div>
                <div className="activate-info-box">
                  <span><IoMdInformationCircleOutline /></span>
                  {isLoading?.nextCycleInfo ? (
                    <span>Loading...</span>
                  ) : (
                    <span 
                      dangerouslySetInnerHTML={{ 
                        __html: infoNotes?.nextCycleInfo 
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="activate-info-block">
                <div className="activate-info-title">Informational Notes</div>
                <div className="activate-info-box">
                  <span><IoMdInformationCircleOutline /></span>
                  {isLoading?.infoNotes ? (
                    <span>Loading...</span>
                  ) : (
                    <span 
                      dangerouslySetInnerHTML={{ 
                        __html: infoNotes?.infoNotes 
                      }}
                    />
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
          message="Apakah Anda yakin ingin mengakhiri masa cuti lebih awal?"
          onConfirm={handleConfirmSubmit}
          onCancel={handleCancelSubmit}
          isLoading={isLoading?.submit}
        >
          <div className="modal-info">
            <div><strong>Nomor Kartu:</strong> {form?.nomorKartu}</div>
            <div><strong>Email:</strong> {form?.email}</div>
            <div><strong>Nama Member:</strong> {dataMember?.namaMember}</div>
            <div><strong>Tanggal Aktif Kembali:</strong> {form?.tanggalAktif}</div>
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

export default ActivateLeavePage;