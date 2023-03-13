import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

export default function SucessPage() {
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [dayDate, setDayDate] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [Hora, setHora] = useState("");

  useEffect(() => {
    if (location.state) {
      setSelectedSeats(location.state.selectedSeats);
      setMovieTitle(location.state.movieTitle);
      setDayDate(location.state.dayDate);
      setName(location.state.name);
      setCpf(location.state.cpf);
      setHora(location.state.Hora);
    }
  }, [location.state]);

  return (
    <PageContainer>
      <h1>Pedido feito com sucesso!</h1>

      <TextContainer data-test="movie-info">
        <strong>
          <p>Filme e sessão</p>
        </strong>
        <p>{movieTitle}</p>
        <p>
          {Hora} - {dayDate}
        </p>
      </TextContainer>

      <TextContainer data-test="seats-info">
        <strong>
          <p>Ingressos</p>
        </strong>
        {selectedSeats.map((seat) => (
          <p key={seat.id}>Assento {seat.name}</p>
        ))}
      </TextContainer>

      <TextContainer data-test="client-info">
        <strong>
          <p>Comprador</p>
        </strong>
        <p>Nome: {name}</p>
        <p>CPF: {cpf}</p>
      </TextContainer>
      <Link to="/">
        <button data-test="go-home-btn" >Voltar para Home</button>
      </Link>
    </PageContainer>
  );
}


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`