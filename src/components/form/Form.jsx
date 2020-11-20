import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
    state = {
        data: {},
        error: {},
        loading: false,
    };

    validation = {};

    onChange = ({ currentTarget: input }) => {
        var { name, value } = input;
        var data = { ...this.state.data };
        var error = { ...this.state.error };
        data[name] = value;
        if (this.validation[name]) error[name] = this.validation[name](value);
        this.setState({ data, error });
    };

    renderSelectBox = (name, label, options) => {
        return (
            <div className="form-inp-container">
                <label className="form-inp-label" htmlFor={name}>
                    {label}
                </label>
                <select
                    className="form-inp"
                    name={name}
                    value={this.state.data[name]}
                    onChange={this.onChange}
                >
                    <option value={0}></option>
                    {options.map((option, index) => (
                        <option value={index + 1} key={index}>
                            {option}
                        </option>
                    ))}
                </select>
                <p className="form-inp-error">{this.state.error[name]}</p>
            </div>
        );
    };

    renderDateField = (name, label) => {
        return (
            <div className="form-inp-container">
                <label className="form-inp-label" htmlFor={name}>
                    {label}
                </label>
                <input
                    className="form-inp"
                    name={name}
                    type="date"
                    value={this.state.data[name]}
                    onChange={this.onChange}
                ></input>
                <p className="form-inp-error">{this.state.error[name]}</p>
            </div>
        );
    };

    renderButton = (text, onClick) => {
        return (
            <button
                className="form-btn"
                onClick={onClick}
                disabled={this.state.loading}
            >
                {text}
            </button>
        );
    };
}

export default Form;
