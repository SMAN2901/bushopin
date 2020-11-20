import React from "react";
import Form from "../form/Form";
import districts from "../../data/districts";
import "./SearchFormTop.css";

class SearchFormTop extends Form {
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
        },
        loading: false,
    };

    componentDidMount() {
        var { data, loading } = this.props;
        this.setState({ loading });
        if (data) {
            this.setState({ data });
            this.props.getBusData(data);
        }
    }

    componentDidUpdate() {
        if (this.props.loading !== this.state.loading) {
            this.setState({ loading: this.props.loading });
        }
    }

    searchTrips = (e) => {
        e.preventDefault();

        var { start, end } = this.state.data;

        if (start && end && start !== "0" && end !== "0") {
            if (start === end) {
                alert("Select diferent locations");
                return;
            }
            this.props.getBusData(this.state.data);
        } else {
            alert("Select location FROM and TO");
        }
    };

    render() {
        return (
            <React.Fragment>
                <form className="srch-ftop">
                    {this.renderSelectBox("start", "FROM", districts)}
                    {this.renderSelectBox("end", "TO", districts)}
                    {this.renderDateField("journeyDate", "JOURNEY DATE")}
                    {this.renderDateField(
                        "returnDate",
                        "RETURN DATE (OPTIONAL)"
                    )}
                    {this.renderButton("SEARCH", this.searchTrips)}
                </form>
                <div
                    className={
                        "srch-ftop-loader " +
                        (this.state.loading ? "srch-ftop-loading" : "")
                    }
                ></div>
            </React.Fragment>
        );
    }
}

export default SearchFormTop;
