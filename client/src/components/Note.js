import React from 'react';
import Nav from './note/Nav'
import Home from './note/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateEdit from './CreateEdit';


function Note(props) {
    return (
        <Router>
            <div className="notes-page">
                <Nav setLogin={props.setLogin} />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create" component={CreateEdit} />
                    <Route path="/edit/:id" component={CreateEdit} />
                </Switch>

            </div>
        </Router>
    );
}

export default Note;