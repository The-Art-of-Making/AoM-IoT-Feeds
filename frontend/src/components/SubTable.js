import { useState } from "react"
import classnames from "classnames"
import axios from "axios"

const deleteFeed = key => {
    axios
        .post("/feeds/delete", {}, { headers: { "x-feed-key": key } })
        .catch(err => {
            console.log(err)
            alert("Error deleting feed: " + err)
        })
}

export default function SubTable(props) {
    const [hideSubTable, setHideSubTable] = useState(true)
    return (
        <>
            <tr className={classnames(hideSubTable ? "" : "table-active")} style={{ cursor: "pointer" }} onClick={() => setHideSubTable(!hideSubTable)}>
                {
                    (hideSubTable) ? <th scope="row">&#11208; {props.f.key}</th> : <th scope="row">&#11206; {props.f.key}</th>
                }
                <td>{(props.f.data.length > 0) ? props.f.data[props.f.data.length - 1].value : ""}</td>
                <td>{(props.f.data.length > 0) ? new Date(props.f.data[props.f.data.length - 1].date).toLocaleString() : ""}</td>
            </tr>
            <tr className={classnames(hideSubTable ? "d-none" : "table-success")}>
                <th scope="col">Feed History</th>
                <th scope="col">Value</th>
                <th scope="col">Timestamp</th>
            </tr>
            {
                props.data.map(d =>
                    <tr key={d.date} className={classnames(hideSubTable ? "d-none" : "table-success")}>
                        <td></td>
                        <td>{d.value}</td>
                        <td>{new Date(d.date).toLocaleString()}</td>
                    </tr>
                )
            }
            <tr className={classnames(hideSubTable ? "d-none" : "table-success")}>
                <td><button className="btn btn-outline-danger" onClick={() => deleteFeed(props.f.key)}>Delete Feed</button></td>
                <td></td>
                <td></td>
            </tr>
        </>
    )
}