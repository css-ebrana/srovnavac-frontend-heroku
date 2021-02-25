import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../css/style.css";

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: "",
            isDisabled: true
        }
        this.searchForm = React.createRef()
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        this.searchForm.current.submit()
    }

    render() {
        return (
            <div style={{ marginTop: "4%", marginBottom: "4%" }}>
                <h3 className="bold-header" style={{ position: "relative", left: "30%", marginBottom: "2%", maxWidth: "80%", width: "50%", color: "#575757" }}><b>Vybírejte z tisíců produktů</b></h3>
                <form className="search-form" ref={this.searchForm} onSubmit={this.onSubmit} style={{ borderRadius: "12px", position: "relative", boxShadow: "0px 8px 16px rgba(0,0,0,0.1)" }}>
                    <input className="regular-search" type="text" value={this.state.search} onChange={this.onChange} style={{
                        outline: "none", padding: "12px",
                        borderRadius: "12px", border: "2px solid #009FE3",
                    }}
                        placeholder="Např. šlapací kára" name="search" required />
                    <button className="bold-search" type="submit" style={{
                        borderRadius: "10px", border: "2px solid #009FE3",
                        backgroundImage: "linear-gradient(to right, #009FE3, #00CADD)",
                        color: "white", outline: "none"
                    }}>Vyhledat<FontAwesomeIcon style={{ paddingLeft: "5px" }} icon={faSearch} size="lg" /></button>
                </form>
            </div>
        )
    }
}

export default SearchBar;