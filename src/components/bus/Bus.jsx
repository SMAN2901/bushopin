import React, { Component } from "react";
import { bookSeat, unbookSeat, purchaseTicket } from "../../api/bus";
import "./Bus.css";

class Bus extends Component {
    state = {
        viewSeats: false,
        selected: null,
        showForm: false,
        data: {
            name: "",
            email: "",
            phone: "",
            gender: "M",
        },
        message: "",
        error: "",
    };

    colorMap = {
        BLOCKED: "gray",
        AVAILABLE: "cyan",
        BOOKED: "orange",
        SELECTED: "green",
        "SOLD (M)": "blue",
        "SOLD (F)": "red",
    };

    bookTimeOut = null;

    count_available = (seats) => {
        var count = 0;
        for (var i in seats) {
            for (var j in seats[i]) {
                if (seats[i][j] === "AVAILABLE") {
                    count++;
                }
            }
        }
        return count;
    };

    renderKeyValue = (key, value) => {
        return (
            <React.Fragment key={key}>
                <span className="bus-stats-key">{key}</span>
                {" : "}
                <span className="bus-stats-val">{value}</span>
                <br></br>
            </React.Fragment>
        );
    };

    renderInfo = () => {
        var { name, code, lunch, ac } = this.props.data;
        var { start_time, end_time, price, seats } = this.props.data;
        var busStats = {
            DEPURTURE: start_time,
            ARRIVAL: end_time,
            "SEATS AVAILABLE": this.count_available(seats),
        };

        return (
            <div className="bus">
                <div className="bus-info">
                    <span className="bus-name">{name}</span>
                    <br></br>
                    <span className="bus-code">{code}</span>
                    <br></br>
                    <span className="bus-ac">
                        {(lunch ? "LUNCH, " : "") + (ac ? "AC" : "NON-AC")}
                    </span>
                </div>
                <div className="bus-stats">
                    {Object.keys(busStats).map((key) =>
                        this.renderKeyValue(key, busStats[key])
                    )}
                </div>
                <div className="bus-price">
                    <span>{"৳ " + price}</span>
                </div>
                <div className="bus-btn">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            var viewSeats = !this.state.viewSeats;
                            this.setState({ viewSeats });
                        }}
                    >
                        {this.state.viewSeats ? "Hide" : "View Seats"}
                    </button>
                </div>
            </div>
        );
    };

    seatCode = (i, j) => {
        var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return `${alpha[i]}-${j + 1}`;
    };

    renderSeat = (seat, code = null) => {
        if (code && this.state.selected === code) seat = "SELECTED";
        var imgUrl = `/assets/images/seat_${this.colorMap[seat]}.svg`;
        return (
            <img
                alt="seat"
                src={imgUrl}
                className="bus-seat-img"
                width="30"
                height="30"
                onClick={() => {
                    if (code) {
                        if (seat === "AVAILABLE") {
                            if (this.state.selected) {
                                unbookSeat({
                                    index: this.props.index,
                                    code: this.state.selected,
                                });
                                this.setState({ selected: null });
                                clearTimeout(this.bookTimeOut);
                                this.bookTimeOut = null;
                            }
                            var { success } = bookSeat({
                                index: this.props.index,
                                code,
                            });
                            if (success) {
                                this.setState({ selected: code });
                                this.bookTimeOut = setTimeout(() => {
                                    unbookSeat({
                                        index: this.props.index,
                                        code,
                                    });
                                    this.setState({ selected: null });
                                    alert(
                                        "Booked seat released after 10 minute timeout."
                                    );
                                }, 10 * 60 * 1000);
                            }
                        } else if (seat === "SELECTED") {
                            success = unbookSeat({
                                index: this.props.index,
                                code,
                            }).success;
                            if (success) {
                                this.setState({ selected: null });
                                clearTimeout(this.bookTimeOut);
                                this.bookTimeOut = null;
                            }
                        }
                    }
                }}
            />
        );
    };

    renderDetails = () => {
        var { seats, price } = this.props.data;

        return (
            <div className="bus-det">
                <div className="bus-det-map">
                    {Object.keys(this.colorMap).map((key) => (
                        <div className="bus-det-row" key={key}>
                            {this.renderSeat(key)}
                            <span>{key}</span>
                        </div>
                    ))}
                </div>
                <div className="bus-det-seat">
                    {seats.map((row, i) => (
                        <div className="bus-det-row" key={i}>
                            {this.renderSeat(seats[i][0], this.seatCode(i, 0))}
                            {this.renderSeat(seats[i][1], this.seatCode(i, 1))}
                            <div
                                style={{
                                    width: "20px",
                                    height: "2px",
                                }}
                            ></div>
                            {this.renderSeat(seats[i][2], this.seatCode(i, 2))}
                            {this.renderSeat(seats[i][3], this.seatCode(i, 3))}
                            <br></br>
                        </div>
                    ))}
                </div>
                <div className="bus-det-cont">
                    <div className="bus-det-info">
                        {this.renderKeyValue(
                            "SEAT",
                            this.state.selected ? this.state.selected : "N/A"
                        )}
                        {this.renderKeyValue(
                            "CLASS",
                            this.state.selected ? "A-CLASS" : "N/A"
                        )}
                        {this.renderKeyValue(
                            "FARE",
                            this.state.selected ? price : "N/A"
                        )}
                    </div>
                    <div className="bus-det-info">
                        {this.renderKeyValue(
                            "SUB TOTAL",
                            this.state.selected ? `৳ ${price - 50}` : "N/A"
                        )}
                        {this.renderKeyValue(
                            "SERVICE CHARGE",
                            this.state.selected ? "৳ 40" : "N/A"
                        )}
                        {this.renderKeyValue(
                            "INSURANCE FEE",
                            this.state.selected ? "৳ 10" : "N/A"
                        )}
                        <hr></hr>
                        {this.renderKeyValue(
                            "GRAND TOTAL",
                            this.state.selected ? `৳ ${price}` : "N/A"
                        )}
                    </div>
                    {this.state.selected ? (
                        <button
                            className="purchase-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                this.setState({
                                    showForm: true,
                                });
                            }}
                        >
                            PROCEED
                        </button>
                    ) : null}
                </div>
            </div>
        );
    };

    renderInput = (name, label) => {
        return (
            <div className="form-inp-container">
                <label className="form-inp-label" htmlFor={name}>
                    {label}
                </label>
                <input
                    className="form-inp"
                    name={name}
                    type="text"
                    value={this.state.data[name]}
                    onChange={(e) => {
                        var data = { ...this.state.data };
                        data[name] = e.currentTarget.value;
                        this.setState({ data });
                    }}
                ></input>
            </div>
        );
    };

    handleSubmit = (e) => {
        e.preventDefault();
        var { name, email, phone, gender } = this.state.data;
        if (name && email && phone) {
            var { success, message } = purchaseTicket({
                index: this.props.index,
                code: this.state.selected,
                gender,
            });
            if (success) this.setState({ message, error: "", selected: null });
            else {
                unbookSeat({
                    index: this.props.index,
                    code: this.state.selected,
                });
                clearTimeout(this.bookTimeOut);
                this.bookTimeOut = null;
                this.setState({ error: message, message: "", selected: null });
            }
            this.props.updateBusData();
        } else
            this.setState({
                error: "Name, Email and Phone number required",
                message: "",
            });
    };

    renderModal = () => {
        return (
            <div
                className="purchase-container"
                onClick={(e) => {
                    if (e.currentTarget === e.target) {
                        this.setState({
                            showForm: false,
                            error: "",
                            message: "",
                        });
                    }
                }}
            >
                <form className="purchase-form">
                    {this.renderInput("name", "NAME")}
                    {this.renderInput("email", "EMAIL")}
                    {this.renderInput("phone", "PHONE")}
                    <div className="form-inp-container">
                        <label className="form-inp-label" htmlFor="user-gender">
                            GENDER
                        </label>
                        <select
                            className="form-inp"
                            name="user-gender"
                            value={this.state.data.gender}
                            onChange={(e) => {
                                var data = { ...this.state.data };
                                data.gender = e.currentTarget.value;
                                this.setState({ data });
                            }}
                        >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                    <button
                        className="purchase-btn"
                        onClick={this.handleSubmit}
                    >
                        PURCHASE
                    </button>
                    <p className="purchase-msg">{this.state.message}</p>
                    <p className="purchase-error">{this.state.error}</p>
                </form>
            </div>
        );
    };

    render() {
        return (
            <React.Fragment>
                {this.renderInfo()}
                {this.state.viewSeats ? this.renderDetails() : null}
                {this.state.showForm ? this.renderModal() : null}
            </React.Fragment>
        );
    }
}

export default Bus;
