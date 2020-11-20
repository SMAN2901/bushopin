import React, { Component } from "react";
import SearchFormTop from "../searchFormTop/SearchFormTop";
import Bus from "../bus/Bus";
import { searchBus } from "../../api/bus";
import "./Search.css";

class Search extends Component {
    state = {
        data: [],
        loading: false,
    };

    _mounted = false;

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    getBusData = async ({ start, end }) => {
        this.setState({ loading: true });
        try {
            var { data } = await searchBus(start, end);
            if (this._mounted) {
                this.setState({ data, loading: false });
            }
        } catch (ex) {
            this.setState({ data: [], loading: false });
        }
    };

    updateBusData = () => {
        if (this.state.data.length > 0) {
            this.getBusData(this.state.data[0]);
        }
    };

    render() {
        return (
            <div className="srch-container">
                <SearchFormTop
                    getBusData={this.getBusData}
                    data={this.props.data}
                    loading={this.state.loading}
                />
                <div className="srch-list">
                    {this.state.data.map((data, index) => (
                        <Bus
                            data={data}
                            key={index}
                            index={index}
                            updateBusData={this.updateBusData}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Search;
