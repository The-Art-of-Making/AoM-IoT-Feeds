import { Component } from "react"
import axios from "axios"
import Header from "../components/Header"
import SubTable from "../components/SubTable"

export default class FindFeed extends Component {

    state = {
        feeds: []
    }

    componentDidMount() {
        this.getFeeds()
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID)
    }

    getFeeds() {
        axios
            .get("/feeds/feeds")
            .then(res => {
                const feeds = res.data.feeds
                if (feeds) {
                    this.setState({
                        feeds: feeds
                    })
                }
            })
            .catch(err => {
                console.log(err)
                alert(err)
            })
        this.intervalID = setTimeout(this.getFeeds.bind(this), 3000)
    }

    render() {
        return (
            <div>
                <Header current="find_feed" />
                <div className="container pt-3">
                    {
                        (this.state.feeds.length > 0) ?
                            <table className="table table-hover">
                                <thead>
                                    <tr className="table-dark">
                                        <th scope="col">Feed</th>
                                        <th scope="col">Last Data</th>
                                        <th scope="col">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.feeds.map(f => <SubTable key={f._id} f={f} data={f.data} />)
                                    }
                                </tbody>
                            </table>
                            : <p className="text-center">No feed data available</p>
                    }
                </div>
            </div >
        )
    }
}
