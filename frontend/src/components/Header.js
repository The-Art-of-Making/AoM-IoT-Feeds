import { useState } from "react"
import { Link } from "react-router-dom"

export default function Header(props) {
    const [show, setShow] = useState("show")
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <div className="navbar-brand">AoM IoT Feeds</div>
                <button className="navbar-toggler" type="button" onClick={() => setShow(show === "show" ? "" : "show")}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse " + show}>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link style={{ textDecoration: "none" }} to="/find_feed">
                                <div className={"nav-link " + (props.current === "find_feed" ? "active" : "")}>Find Feed</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link style={{ textDecoration: "none" }} to="/new_feed">
                                <div className={"nav-link " + (props.current === "new_feed" ? "active" : "")}>New Feed</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}