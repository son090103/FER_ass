import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
    return (
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top bg-dark text-light">
            <div className="col mb-3">
                <a href="/" className="d-flex align-items-center mb-3 text-light text-decoration-none">
                    <svg className="bi me-2" width="40" height="32">
                        <use xlinkHref="#bootstrap"></use>
                    </svg>
                </a>
                <p className="text-light">© 2024</p>
            </div>

            <div className="col mb-3"></div>

            {["Section 1", "Section 2", "Section 3"].map((section, index) => (
                <div className="col mb-3" key={index}>
                    <h5>{section}</h5>
                    <ul className="nav flex-column">
                        {["Home", "Features", "Pricing", "FAQs", "About"].map((item, idx) => (
                            <li className="nav-item mb-2" key={idx}>
                                <a href="/" className="nav-link p-0 text-light">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </footer>
    );
}

export default Footer;
