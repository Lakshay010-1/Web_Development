import React from 'react'

export default function ExpandCompareWin(props) {
    const [scrollY, setScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function renderProperty(key, card) {
        switch (key) {
            case "name":
                return (<a className={"diff-expand-table-item bot-" + key} target='_blank' href={card.url} key={key + card["id"]}>
                    <img
                        className="bot-logo"
                        src={card.imageSrc}
                        alt={card["name"] + "-img"}
                    />
                    <span >{card[key]}</span>
                </a>)
            case "specialty":
                return (
                    <ul className={"diff-expand-table-item bot-" + key}>
                        {card[key].map((s) => <li key={s}>{s}</li>)}
                    </ul>
                )
            case "standoutFeature":
                return (<span key={key} className={"diff-expand-table-item bot-" + key}>{card[key]}</span>)
            case "pricing":
                return (
                    <ul className={"diff-expand-table-item bot-" + key}>
                        <li>
                            Free : <span>{card[key].free ? "Yes" : "No"}</span>
                        </li>

                        <li>Tiers <br /> <ol>{card[key].tiers.map((tier, idx) => (<li key={idx}>{tier.name} : {tier.price}</li>))}</ol></li>
                    </ul>
                )
            case "aiModels":
                return (<span className={"diff-expand-table-item bot-" + key}>{card[key].join(",")}</span>)
            case "pros":
                return (
                    <ul className={"diff-expand-table-item bot-" + key}>{card[key].map((pro, idx) => <li key={idx}>{pro}</li>)}</ul>
                )
            case "cons":
                return (
                    <ul className={"diff-expand-table-item bot-" + key}>{card[key].map((con, idx) => <li key={idx}>{con}</li>)}</ul>
                )
            case "briefHistory":
                return (<span key={key} className={"diff-expand-table-item bot-" + key}>{card[key]}</span>)
            default:
                return (<React.Fragment>Error</React.Fragment>)
        }
    }

    return (
        <div id="diff-expand-page" style={{ top: scrollY + "px" }}>
            <div id="diff-expand-container" style={{ gridTemplateRows: `repeat(${props.selectedCards.length + 1},1fr)` }}>
                {Object.keys(props.selectedCards[0]).filter((key) => key !== "id" && key !== "url" && key !== "imageSrc").map((key) => {
                    return <React.Fragment key={key} >
                        <span className='diff-expand-table-item diff-expand-table-basis' >{key}</span>
                        {
                            props.selectedCards.map((card) => {
                                return <React.Fragment key={card["id"]+"e-d-card"}>{renderProperty(key, card)}</React.Fragment>
                            })
                        }
                    </React.Fragment>
                })}
            </div>

            <div
                id="diff-expand-whitespace"
                onClick={() => props.selectECState()}
            ></div>
        </div>
    );

}