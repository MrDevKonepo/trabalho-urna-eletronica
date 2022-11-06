import React from "react";
import "./card.css"
import FormDialog from "../dialog/dialog";

export default function Card(props) {

    const [open, setOpen] = React.useState(false);
    const handleClickCard = () => {
        setOpen(true);
    };

    return (
        <>
            <FormDialog open={open} setOpen={setOpen} idvoto={props.idvoto} eleitor={props.eleitor} senador={props.senador} presidente={props.presidente} listCard={props.listCard} setListCard={props.setListCard}/>
            <div className="card--container" onClick={() => handleClickCard()}>
                <h1 className="card--tittle">{props.eleitor}</h1>
                <p className="card--senador">{props.senador}</p>
                <p className="card--presidente">{props.presidente}</p>
            </div>
        </>
    ) 
}
