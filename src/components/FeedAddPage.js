import React, { Component } from 'react';

class FeedAddPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feed: "",
            password: "",
            error: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    async onSubmit(e) {
        e.preventDefault();
        let message = "";

        this.setState({
            feed: e.target.feed.value,
            password: e.target.password.value
        })

        await fetch(`https://srovnavac-backend.herokuapp.com/parse/${encodeURIComponent(encodeURIComponent(e.target.feed.value))}/${e.target.password.value}`, { mode: 'no-cors', method: 'POST' })
            .then(function (response) {
                if (!response.ok) {
                    console.log(response)
                    message = "Zadaný feed neexistuje nebo už tam je vložený!"
                } else {
                    message = "Feed je v pořádku vložený"
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        this.setState({ error: message })
    }

    render() {
        return (
            <div style={{ marginLeft: "40%", marginTop: "10%", minHeight: "300px" }}>
                <h3>Vložte URL feedu</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="row" style={{ marginTop: "2%" }}>
                        Feed URL:
                    <input type="text"
                            name="feed"
                            value={this.state.feed}
                            onChange={this.onChange}
                            style={{ marginLeft: "1%" }}
                            required
                        />
                    </div>
                    <div className="row" style={{ marginTop: "1%" }}>
                        Heslo:
                    <input type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            style={{ marginLeft: "3.8%" }}
                            required
                        />
                    </div>

                    {this.state.error ? (
                        <p style={{ color: "red", marginLeft: "-2%" }}>{this.state.error}</p>
                    ) : (
                            <p style={{ color: "green", marginLeft: "-2%" }}></p>
                        )}


                    <div className="row" style={{ marginTop: "1%" }}>
                        <input type="submit"
                            style={{
                                border: "2px solid #009FE3",
                                backgroundImage: "linear-gradient(to right, #009FE3, #00CADD)",
                                color: "white",
                                outline: "none",
                                width: "10%",
                                paddingLeft: "2%",
                                paddingRight: "2%"
                            }}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default FeedAddPage;