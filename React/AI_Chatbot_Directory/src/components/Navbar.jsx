import React from 'react'
import aiChatBots from "../../public/data.js";
import NavItem from "./NavItem.jsx";

export default function Navbar(props) {
    var navItemsMap = new Map();
    aiChatBots.forEach(bot => {
        bot.specialty.forEach(s => {
            var value = 0;
            if (navItemsMap.get(s) !== undefined) {
                value = navItemsMap.get(s);
            }
            navItemsMap.set(s, value + 1);
        });
    });
    navItemsMap.set("all", aiChatBots.length);
    var navItems = [...navItemsMap].sort((a, b) => b[1] - a[1]);
    return (
        <div id='nav-bar'>
            {navItems.map(([key, value], idx) => <NavItem key={idx} className={props.curField == key ? "selected-nav-item" : ""} field={key} num={value} selectField={props.selectField} />)}
        </div>
    )
}
