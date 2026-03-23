import React from "react";
import "../../public/index.css";
import Header from "./Header.jsx";
import Cards from "./Cards.jsx";
import Footer from "./Footer.jsx"
import Navbar from "./Navbar.jsx";
import Button from "./Button.jsx";
import ExpandCompareWin from "./ExpandCompareWin.jsx";


export default function App() {
    const [curField, setField] = React.useState("all");
    const [curCards, setCards] = React.useState([]);
    const [curECState, setECState] = React.useState(false);

    function selectECState() {
        setECState((prev) => !prev);
    }

    function selectCards(card) {
        setCards(prev => {
            const eleIdx = prev.indexOf(card);
            if (eleIdx != -1) {
                return ([...prev].slice(0, eleIdx)).concat([...prev].slice(eleIdx + 1));
            } else {
                return [...prev, card];
            }
        });
    }

    function selectField(field) {
        setField(() => field);
    }

    React.useEffect(() => {
        document.body.style.overflow = curECState ? "hidden" : "";
    }, [curECState]);

    return <div className="container">
        <Button selectedCards={curCards.length} curECState={curECState} selectECState={selectECState} />
        {curECState && <ExpandCompareWin selectECState={selectECState} selectedCards={curCards} />}
        <div id="web-top" >
            <Header />
            <div id="content">
                <Navbar selectField={selectField} curField={curField} />
                <Cards curField={curField} curECState={curECState} selectCards={selectCards} curCards={curCards} />
            </div>
        </div>
        <Footer />
    </div>
}
