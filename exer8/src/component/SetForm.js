import "../App.css";
function SetFrom() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Form Đặt Vé Máy Bay</h1>
      <div className="mb-3">
        <label className="form-label">Họ tên</label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-person"></i>
          </span>
          <input type="text" className="form-control" placeholder="Họ tên" />

          <span className="input-group-text">vnd</span>
        </div>
        <small className="text-muted">Phải nhập 5 ký tự, in hoa</small>
      </div>

      <div className="mb-3">
        <label className="form-label">Địa chỉ</label>
        <input type="text" className="form-control" placeholder="" />
        <small className="text-muted">Phải nhập 5 ký tự, in hoa</small>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Đi từ</label>
          <select className="form-select">
            <option value="hanoi">Hà Nội</option>
            <option value="danang">Đà Nẵng</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Đến</label>
          <select className="form-select">
            <option value="hcm">TP Hồ Chí Minh</option>
            <option value="camau">Cà Mau</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Chọn chiều đi/khứ hồi</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="return"
            id="return"
          />
          <label className="form-check-label" htmlFor="return">
            Về
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="go"
            id="go"
          />
          <label className="form-check-label" htmlFor="go">
            Đi
          </label>
        </div>
      </div>

      <div className="text-center p-3">
        <button className="btn btn-primary">Đặt Vé</button>
      </div>
    </div>
  );
}

export default SetFrom;
