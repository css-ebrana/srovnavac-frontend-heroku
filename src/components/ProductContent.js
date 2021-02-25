import React, { Component } from 'react';
import { Card, Container, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import background from "../background.png";
import { Slider } from 'rsuite';
import SearchBar from './SearchBar';
import 'rsuite/dist/styles/rsuite-default.css';
import "../css/style.css";

class ProductContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            brands: [],
            search: decodeURIComponent(this.props.location.search.split("=")[1]),
            addButtonBackgroundColor: "white",
            addButtonTextColor: "#009FE3",
            limit: 9,
            isDisabled: false,
            btnText: "Zobrazit více položek +",
            price: 50000,
            brand: ""
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {

        if (this.state.search === "undefined") {
            fetch('https://srovnavac-backend.herokuapp.com/search/mosaz')
                .then(response => response.json())
                .then(data => this.setState({ data }));
        } else {
            fetch(`https://srovnavac-backend.herokuapp.com/search/${this.state.search}`)
                .then(response => response.json())
                .then(data => this.setState({ data }));
        }

        fetch("https://srovnavac-backend.herokuapp.com/getAllBrands")
            .then(response => response.json())
            .then(brands => this.setState({ brands }));
    }

    onMouseEnter() {
        this.setState({
            addButtonBackgroundColor: "#009FE3",
            addButtonTextColor: "white"
        })
    }
    onMouseLeave() {
        this.setState({
            addButtonBackgroundColor: "white",
            addButtonTextColor: "#009FE3"
        })
    }

    onClick() {
        if (this.state.data.length >= this.state.limit) {
            this.setState({
                limit: this.state.limit + 6,
                isDisabled: false,
                btnText: "Zobrazit více položek +"
            })
        } else {
            this.setState({
                isDisabled: true,
                btnText: "Žádné další produkty..."
            })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSliderChange(e) {
        this.setState({
            price: e
        })
        if (this.state.search === "undefined" && this.state.brand.brand === undefined) {
            fetch(`https://srovnavac-backend.herokuapp.com/getProductsByPrice/mosaz/${e}`)
                .then(response => response.json())
                .then(data => this.setState({ data }));
        } else if (this.state.brand.brand !== undefined) {
            fetch(`https://srovnavac-backend.herokuapp.com/getProductsByPrice/${this.state.brand.brand}/${e}`)
                .then(response => response.json())
                .then(data => this.setState({ data }));
        } else {
            fetch(`https://srovnavac-backend.herokuapp.com/getProductsByPrice/${this.state.search}/${e}`)
                .then(response => response.json())
                .then(data => this.setState({ data }));
        }
    }

    onDropdownClick(brand) {
        this.setState({
            search: undefined,
            brand: brand
        })
        fetch(`https://srovnavac-backend.herokuapp.com/getProductsByBrand/${brand.brand}`)
            .then(response => response.json())
            .then(data => this.setState({ data }));
    }

    render() {
        const { data, limit } = this.state;
        var dataList = []

        dataList = data.slice(0, limit)

        return (
            <div className="App" style={{ backgroundImage: `url(${background})`, minHeight: "800px", marginTop: "5%" }}>
                <SearchBar />
                <Container>
                    <div className="row">
                        <Col md={3} xs={5}>
                            <div className="bold-filter" style={{ fontSize: "16px" }}><b>Filtr</b></div>
                            <Card className="card-filter" border="light" style={{
                                width: '16rem', display: "inline-block", height: '18.2rem',
                                borderRadius: "12px", marginTop: "3%", padding: "32px",
                                boxShadow: "0px 8px 16px rgba(0,0,0,0.1)"
                            }}>
                                <label className="bold" style={{ marginRight: "80%", fontSize: "16px" }}><b>Cena</b></label>
                                <label className="bold" style={{ color: "#009FE3", marginRight: "54.5%", fontSize: "14.4px" }}><b>Do {this.state.price} Kč</b></label>
                                <span className="bold">
                                    <Slider
                                        progress
                                        graduated
                                        min={0}
                                        max={200000}
                                        defaultValue={50000}
                                        step={1000}
                                        value={this.state.value}
                                        name="price"
                                        style={{ color: "#009FE3" }}
                                        onChange={this.onSliderChange.bind(this)}
                                    />
                                </span>
                                <div className="col-sm-8" style={{ marginTop: "10%", height: "50%", overflowY: "auto", position: "absolute", maxHeight: "200px" }} >
                                    <DropdownButton className="regular" id="dropdown-basic-button" title="Všechny značky" style={{ backgroundImage: "linear-gradient(to right, #009FE3, #00CADD)" }}>
                                        {this.state.brands.map((brand, key) => {
                                            return (
                                                <Dropdown.Item as="button" key={key} onSelect={this.onDropdownClick.bind(this, { brand })}> {brand} </Dropdown.Item>
                                            )
                                        })
                                        }
                                    </DropdownButton>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={9}>
                            <div className="bold-results" style={{ fontSize: "16px" }}>Výsledky vyhledávání</div>
                            {this.state.data.length === 0 ? (
                                <div>
                                    <h5 className="bold" style={{ marginTop: "15%" }} > Omlouváme se, ale nenašli jsme žádné produkty dle vaší specifikace... </h5>
                                    <h6 className="bold"> Začněte znovu například vyhledáním produktu </h6>
                                </div>
                            ) : (
                                    dataList.map((product, key) =>
                                        <Card key={key} border="light" style={{
                                            width: '16rem', display: "inline-block", maxHeight: '20rem',
                                            margin: "1.1%", borderRadius: "12px",
                                            boxShadow: "0px 8px 16px rgba(0,0,0,0.1)"
                                        }}>
                                            <Card.Body>
                                                <Card.Text className="regular" style={{ fontSize: "16px", color: "#A8A8A8" }}> {product.brand.toUpperCase()} </Card.Text>
                                                <Card.Title className="regular">
                                                    <a style={{ fontSize: "20px", color: "#212121" }} href={product.link} target="_blank" rel="noopener noreferrer"> {product.title.substring(0, 25) + "..."}</a>
                                                </Card.Title>
                                                <Card.Text className="regular">
                                                    <img id={product.objectID}
                                                        src={product.imageLink}
                                                        alt={product.title.substring(0, product.title.length - 1)}
                                                        width="70px"
                                                        height="70px" />
                                                </Card.Text>
                                                <Card.Text className="regular" style={{ fontSize: "18px", color: "#767676" }}> {product.description.substring(0, 35) + "..."} </Card.Text>
                                                <Card.Text className="bold" style={{ fontSize: "20px", color: "#009FE3" }}> {product.price} CZK</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    )
                                )}
                            {data.length > this.state.limit ? (
                                <button className="bold-button" style={{ backgroundColor: this.state.addButtonBackgroundColor, color: this.state.addButtonTextColor, fontSize: "18px", marginBottom: "3%", marginTop: "3%", padding: "14px 21px", border: "3px solid #009FE3", borderRadius: "12px", outline: "none" }}
                                    disabled={this.state.isDisabled}
                                    onClick={this.onClick.bind(this)}
                                    onMouseEnter={this.onMouseEnter.bind(this)}
                                    onMouseLeave={this.onMouseLeave.bind(this)}>
                                    <b>{this.state.btnText}</b>
                                </button>
                            ) : (
                                    <p></p>
                                )}
                        </Col>
                    </div>
                </Container>
            </div>
        )
    }
}
export default ProductContent;