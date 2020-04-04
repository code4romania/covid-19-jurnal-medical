import React from "react";
import {
  Header as TFHeader,
  DevelopedBy
} from "@code4ro/taskforce-fe-components";

import "./header.scss";
import ProfileItems from "./ProfileItems";
import MenuItems from "./MenuItems";
import Logo from "./Logo";

const Header = () => (
  <>
    <TFHeader
      Logo={<Logo />}
      MenuItems={<MenuItems />}
      ProfileItems={<ProfileItems />}
    />
    <DevelopedBy />
  </>
);

export default Header;
