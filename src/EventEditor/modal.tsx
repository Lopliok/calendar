import React, { FormEvent } from 'react';
import styled from "styled-components"

const ModalBackground = styled.div`
  position: absolute;
  opacity: 0.6;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  z-index: 1;

`;

const ModalWrapper = styled.div`
  background: white;
  width: 40vw;
  min-height: 25vw;
  position: absolute;
  border: 0.3rem solid black;
  border-radius: 0.5rem;
  top: 20%;
  left: 30%;
  padding: 1em;
  z-index: 1;
`;


const FieldContainer = styled.div`
    padding: 1em;

    & > label {
        padding-right: 0.2em;
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: center;
`

const NameInput = styled.input` 
fwidth: 230px;
    fheight: 20px;
    tfext-align: right;
`

const formatToDateString = (date: Date) => {

    console.log(date.toJSON())

    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    return date.toJSON().slice(0, 10);
}



const formatMonthOfWeek = (date: Date) =>
    Intl.DateTimeFormat("cs-CZ", {
        dateStyle: "long",
    }).format(date)

const Modal = ({ data, onClickOutside, onConfirm }: { data: any, onClickOutside: () => void, onConfirm: (c: FormEvent<HTMLFormElement>) => void }) => {

    console.log(data)

    return (
        <div>
            <ModalBackground onClick={onClickOutside} />
            <ModalWrapper>
                <h3 className='title'>Vytvořit událost</h3>

                <form onSubmit={onConfirm}>

                    <FieldContainer>
                        <label className='label' htmlFor="date">Datum*</label>
                        <NameInput className='input' required defaultValue={formatToDateString(data.date)} type="date" name="date" id="date"></NameInput>

                    </FieldContainer>
                    <FieldContainer>
                        <label className='label' htmlFor="name">Název*</label>
                        <NameInput className='input' required type="text" name="name" id="name"></NameInput>

                    </FieldContainer>

                    <Flex>

                    </Flex>
                    <Flex>

                        <FieldContainer>
                            <label className='label' htmlFor="from">Od*</label>
                            <input className='input' required type="time" name="from" id="from"></input>
                        </FieldContainer>

                        <FieldContainer>
                            <label className='label' htmlFor="to">Do*</label>
                            <input className='input' required type="time" name="to" id="to"></input>
                        </FieldContainer>



                    </Flex>

                    <FieldContainer>
                        <label className='label' htmlFor="color">Barva</label>
                        <input className='input' type="color" defaultValue="#66b3cc" name="color" id="color"></input>
                    </FieldContainer>








                    <FieldContainer>
                        <input type="submit" value="Uložit"></input>

                    </FieldContainer>


                </form>


            </ModalWrapper>
        </div >
    );
};

export default Modal;