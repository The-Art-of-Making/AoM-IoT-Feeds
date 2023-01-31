import { Component } from "react"
import axios from "axios"
import classnames from "classnames"
import Header from "../components/Header"

export default class NewFeed extends Component {

    state = {
        key: "",
        responseMessage: "",
        responseMessageClassName: "",
    }

    newFeed = e => {
        e.preventDefault()
        axios
            .post("/feeds/new", {})
            .then(res => {
                const key = res.data.key
                if (key) {
                    this.setState({
                        key: key,
                        responseMessage: "Successfully created feed",
                        responseMessageClassName: "text-success"
                    })
                }
                else {
                    this.setState({
                        key: "",
                        responseMessage: "Failed to create feed",
                        responseMessageClassName: "text-danger"
                    })
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    key: "",
                    responseMessage: "Failed to create feed",
                    responseMessageClassName: "text-danger"
                })
            })
    }

    render() {
        const keyLength = this.state.key.length > 0
        return (
            <div>
                <Header current="new_feed" />
                <div className="container pt-3">
                    <h2>New Feed</h2>
                    <hr></hr>
                    {
                        (this.state.responseMessage.length > 0) ? <p className={this.state.responseMessageClassName}>{this.state.responseMessage}</p> : null
                    }
                    <p>Key: <span className={classnames((keyLength) ? "text-success" : "text-muted")}>{(keyLength) ? this.state.key : "feed-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}</span></p>
                    <div className="d-grid gap-2">
                        <button className="btn btn-lg btn-primary" onClick={this.newFeed}>Create New Feed</button>
                    </div>
                </div>
            </div >
        )
    }
}