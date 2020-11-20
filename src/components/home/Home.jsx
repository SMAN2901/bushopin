import React, { Component } from "react";
import SearchForm from "../searchForm/SearchForm";
import "./Home.css";

class Home extends Component {
    state = {};

    render() {
        return (
            <div className="home">
                <div className="home-form-container">
                    <SearchForm {...this.props} />
                </div>
            </div>
        );
    }
}

export default Home;
