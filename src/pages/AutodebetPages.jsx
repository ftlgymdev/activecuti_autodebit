import React, { useState, useEffect } from "react";
import { BsCalendar2DateFill, BsCreditCardFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";

export const AutodebetPages = () => {
  const [form, setForm] = useState({
    nomorKartu: "",
    email: "",
    tanggalAktif: "",
  });
  const [namaMember, setNamaMember] = useState("");
  const [searchStatus, setSearchStatus] = useState(""); // '', 'found', 'notfound'

  useEffect(() => {
    // Simulate search: if nomorKartu and email are filled, "find" member
    if (form.nomorKartu && form.email) {
      // Mock: if nomorKartu === '1234' and email === 'test@email.com', found
      if (
        form.nomorKartu === "1234" &&
        form.email.toLowerCase() === "test@email.com"
      ) {
        setNamaMember("Budi Santoso");
        setSearchStatus("found");
      } else {
        setNamaMember("");
        setSearchStatus("notfound");
      }
    } else {
      setNamaMember("");
      setSearchStatus("");
    }
  }, [form.nomorKartu, form.email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submit
  };

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
                <label>Nomor Kartu</label>
                <div className="activate-input-icon">
                  <span>
                    <BsCreditCardFill />
                  </span>
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
                  <span>
                    <MdAlternateEmail />
                  </span>
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
              {searchStatus === "found" ? (
                <div className="nama-member-box">{namaMember}</div>
              ) : searchStatus === "notfound" ? (
                <div className="nama-member-notfound">
                  Member tidak ditemukan
                </div>
              ) : (
                <div className="nama-member-input" style={{opacity:0.5}}>Member tidak ditemukan</div>
              )}
            </div>
            <div className="activate-form-group">
              <label>Tanggal Aktif Kembali</label>
              <div className="activate-input-icon">
                <span>
                  <BsCalendar2DateFill />
                </span>
                <input
                  type="date"
                  name="tanggalAktif"
                  value={form.tanggalAktif}
                  onChange={handleChange}
                  placeholder="Masukan Tanggal Aktif Kembali"
                />
              </div>
            </div>
            <div className="activate-info-row">
              <div className="activate-info-block">
                <div className="activate-info-title">Next Cycle Info</div>
                <div className="activate-info-box">
                  <span>
                    <i className="fa fa-info-circle" />
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  </span>
                </div>
              </div>
              <div className="activate-info-block">
                <div className="activate-info-title">Informational Notes</div>
                <div className="activate-info-box">
                  <span>
                    <i className="fa fa-info-circle" />
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  </span>
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
