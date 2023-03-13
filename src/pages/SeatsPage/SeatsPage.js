import styled from "styled-components"
import { useParams, useLocation } from "react-router-dom"
import { useEffect,useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SeatsPage() {
    const[sessao,setSessao] = useState(undefined);
    const [selectedSeats, SetselectedSeats] = useState([]);
    const[name,setName] = useState("");
    const[cpf,setCpf] = useState("");
    const {idSessao} = useParams();
    const location = useLocation()
    const navigate = useNavigate();


    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`

        const promise = axios.get(url)
        promise.then(res => setSessao(res.data))
        promise.catch(err => (err.response.data))
    },[idSessao, location])
        
        if (sessao ===undefined){
            return <div>Carregando...</div>
        }

        function SeatClick(seat) {
            if (!seat.isAvailable) {
              alert("Este assento está indisponível. Por favor, escolha outro.");
              return;
            }
          
            const newSelectedSeats = selectedSeats.includes(seat)
              ? selectedSeats.filter((s) => s !== seat)
              : [...selectedSeats, seat];
          
            SetselectedSeats(newSelectedSeats);
          }
          
        function handleSubmit(p){
            
            p.preventDefault()

            const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
            
            const reserve ={
                ids: selectedSeats.map((seat) => seat.id),
                name: name,
                cpf: cpf

            }

            const promise = axios.post(url, reserve)
            promise.then(res => navigate("/sucesso", { 
                state: { 
                id: res.id,
                selectedSeats: selectedSeats,
                movieTitle: sessao.movie.title,
                dayDate: sessao.day.date,
                dayWeekday: sessao.day.weekday,
                name: name,
                cpf: cpf,
                Hora: sessao.name
            }}));
            promise.catch(err => alert(err.response.data.mensagem)
            
       )}


    return (
        <PageContainer>
            Selecione o(s) assento(s)!

            <SeatsContainer>
                {sessao.seats.map((seat) => ( 
                    <SeatItem data-test="seat"
                    available ={seat.isAvailable}
                    selected = {selectedSeats.includes(seat)}
                    onClick ={() => SeatClick(seat)}
                    style = {{
                        backgroundColor: seat.isAvailable ?
                        selectedSeats.includes(seat) ? "#1AAE9E" : "#C3CFD9" : "#FBE192"
                    }}
                    >
                    
                    {seat.name}
                    </SeatItem>))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle color="#1AAE9E" border="0E7D71"/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#C3CFD9"border="7B8B99"/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#FBE192" border="F7C52B"/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>
            
        
            <FormContainer>
                <form onSubmit={handleSubmit}>
                Nome do Comprador:
                <input data-test="client-name" placeholder="Digite seu nome..." 
                required
                value={name}
                onChange={p => setName(p.target.value)}
                />

                CPF do Comprador:
                <input data-test="client-cpf" placeholder="Digite seu CPF..." 
                value={cpf}
                onChange={p => setCpf(p.target.value)}
                required
                />

                <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
                </form>
                
            </FormContainer>
           
            
            <FooterContainer>
                <div>
                    <img data-test="footer" src={sessao.movie.posterURL} />
                </div>
                <div>
                    <p>{sessao.movie.title}</p>
                    <p>{sessao.day.weekday} - {sessao.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.label`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    form{ display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;}
    button {
        align-self: center;
        cursor: pointer;
    }
    input {
        width: calc(100vw - 60px);
    }
`

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px; 
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.border};         
    background-color: ${props => props.color};  
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid #808F9D;
    background-color: #C3CFD9; 
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor: pointer;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;
    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }
    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`