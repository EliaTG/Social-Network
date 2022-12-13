exports.IgualValor = (value, EqualValue) => {

    return value === EqualValue;
}

let valor;


exports.usuario = (value) => {


    valor = value;
    return value;
}

exports.result = () => {


    return valor;
}