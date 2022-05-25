import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Tickets from "./Pages/Tickets";
import {useSelector} from "react-redux";
import NavBar from "./Layout/NavBar";

function App() {
    const auth = useSelector((state) => state.auth);
   
    const token = localStorage.getItem('token');
    return (
    <>
        <BrowserRouter>
            <Switch>
                {(auth.user || token) ?
                    <>
                      
                        <NavBar user={auth.user}/>
                        <div className={"p-4"}>
                            <Route path={"/tickets"} component={Tickets}/>
                            <Route exact={true} path={"/"} render={() => <Redirect to={"/tickets"} />} />
                        </div>
                    </>
                    :
                    <>
                        <Route path={"/sign-in"} component={Login}/>
                        <Route path={"/sign-up"} component={Register}/>
                        <Route exact={true} path={"/"}  render={() => <Redirect to={"/sign-in"} />} />
                    </>
                }
            </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
