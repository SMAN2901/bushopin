import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import "./App.css";

class App extends Component {
    state = {
        data: null,
    };

    backgroundImage = "/assets/images/background.jpg";

    setData = (data) => {
        this.setState({ data });
    };

    render() {
        return (
            <div
                className="app"
                style={{ backgroundImage: `url(${this.backgroundImage})` }}
            >
                <Navbar />
                <div className="app-body">
                    <Switch>
                        <Route
                            path="/search"
                            render={() => <Search data={this.state.data} />}
                        />
                        <Route
                            path="/"
                            render={(props) => (
                                <Home setData={this.setData} {...props} />
                            )}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
