import React from "react";

const Filho = (props) => {

    return(

        <div>
            <h2>  Componente Filho  </h2>
            <p>Nome: {props.nome}</p>
            <p>Idade: {props.idade}</p>
        </div>
    );
};

export default Filho;