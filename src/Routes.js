import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Faq from "./pages/Faq";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Secret from "./pages/Secret";
import ServiceCreate from "./pages/services/ServiceCreate";
import UserServices from "./pages/services/UserServices";
import SentOffers from "./pages/offers/SentOffers";
import ReceivedOffers from "./pages/offers/ReceivedOffers";
import ReceivedCollaborations from "./pages/collaborations/ReceivedCollaborations";
import CollaborationDetail from "./pages/collaborations/CollaborationDetail";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/profile" component={Profile}/>
    <Route path="/secret" component={Secret}/>
    <Route exact path="/services" component={Services}/>
    <Route path="/services/new" component={ServiceCreate}/>
    <Route path="/services/me" component={UserServices}/>
    <Route path="/services/:id" component={ServiceDetail}/>
    <Route path="/offers/sent" component={SentOffers}/>
    <Route path="/offers/received" component={ReceivedOffers}/>
    <Route path="/collaborations/me" component={ReceivedCollaborations}/>
    <Route path="/collaborations/:id" component={CollaborationDetail}/>
    <Route path="/faq" component={Faq}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
  </Switch>
);


export default Routes;