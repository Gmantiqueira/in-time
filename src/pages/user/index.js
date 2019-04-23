import React from "react";
import { Link } from "react-router-dom";

import { Container, Profile, FormList, FormRow } from "./styles";

import Nav from "../../components/Nav";

import Photo from "../../assets/images/photo.jpg";
import UserIcon from "../../assets/images/user.png";
import StopwatchIcon from "../../assets/images/stopwatch.png";
import RefreshIcon from "../../assets/images/refresh.png";

const User = () => (
    <Container>
        <Profile>
            <div>
                <img src={Photo} alt="Profile" />
            </div>
            <h4>Gmantiqueira</h4>
            <p>gmantiqueira@gmail.com</p>
        </Profile>

        <FormList>
            <span id="time" style={{ color: "#fff" }} />
            <FormRow>
                <label>Team highlight color</label>

                <button onClick="" />
            </FormRow>

            <FormRow>
                <label>in.time/</label>

                <input type="text" readonly value="session" />
            </FormRow>

            <FormRow>
                <label>Visual timer</label>

                <div>
                    <p>vertical</p>
                    <p>circular</p>
                </div>
            </FormRow>

            <FormRow>
                <label>Password required</label>

                <input type="checkbox" />
            </FormRow>
        </FormList>

        <Nav />
    </Container>
);

export default User;
