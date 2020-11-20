import React from "react";
import Form from "../form/Form";
import districts from "../../data/districts";
import "./SearchForm.css";

class SearchForm extends Form {
    state = {
        data: {
            start: 0,
            end: 0,
            journeyDate: "",
            returnDate: "",
        },
        error: {
            start: "",
            end: "",
            journeyDate: "",
            returnDate: "",
            common: "",
        },
        loading: false,
    };

    searchTrips = (e) => {
        e.preventDefault();
        var error = { ...this.state.error };
        error.common = "";
        this.setState({ error });

        var { start, end } = this.state.data;

        if (start && end && start !== "0" && end !== "0") {
            if (start === end) {
                error = { ...this.state.error };
                error.common = "Select diferent locations";
                this.setState({ error });
                return;
            }
            this.props.setData(this.state.data);
            this.props.history.push("/search");
        } else {
            error = { ...this.state.error };
            error.common = "Select location FROM and TO";
            this.setState({ error });
        }
    };

    render() {
        return (
            <form className="srch-form">
                <span className="srch-form-title">SEARCH BUSES</span>
                {this.renderSelectBox("start", "FROM", districts)}
                {this.renderSelectBox("end", "TO", districts)}
                {this.renderDateField("journeyDate", "JOURNEY DATE")}
                {this.renderDateField("returnDate", "RETURN DATE (OPTIONAL)")}
                {this.renderButton("SEARCH", this.searchTrips)}
                <p className="srch-err">{this.state.error.common}</p>
            </form>
        );
    }
}

export default SearchForm;
