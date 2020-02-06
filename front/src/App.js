import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import Home from "./components/Home";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route path="/" component={Home}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;