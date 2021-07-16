import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Button } from 'react-native'
import styles from '../styles/styles'

module.exports = function CalculatorScreen(){
    // Mapeamento de teclas
    const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "x", 6, 5, 4, '-', 3, 2, 1, '+', 0, '.', '+/-', '=']

    const [currentNumber, setCurrentNumber] = useState("")
    const [lastNumber, setLastNumber] = useState("")

    function calculator(){
        const splitNumbers = currentNumber.split(' ')
        const fistNumber = parseFloat(splitNumbers[0])
        const lastNumber = parseFloat(splitNumbers[2])
        const operator = splitNumbers[1]

        // Faz ação referente tecla pressionada
        switch(operator){
            case '+':
                setCurrentNumber((fistNumber + lastNumber).toString())
                return
            case '-': 
                setCurrentNumber((fistNumber - lastNumber).toString())
                return
            case 'x':
                setCurrentNumber((fistNumber + lastNumber).toString())
                return
            case '/': 
                setCurrentNumber((fistNumber - lastNumber).toString())
                return
        }
    }

    function handleInput(buttonPressed){
        console.log(buttonPressed) // Mostra no Console a tecla pressionada
        if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "x" | buttonPressed === "/" ){
            setCurrentNumber(currentNumber + " " + buttonPressed + " ")
            return
        }
        switch(buttonPressed){
            case 'DEL':
                setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 2)))
                return
            case 'LIMPAR': // Limpa todo o conteúdo
                setLastNumber("") 
                setCurrentNumber("") 
                return
            case '=':
                setLastNumber(currentNumber + " = ")
                calculator()
                return
            case '+/-':
                return
        }
        setCurrentNumber(currentNumber + buttonPressed)
    }

    return (
        <View style={styles.container}>
            <View style={styles.results}>
                <Text style={styles.historyText}>{lastNumber}</Text>
                <Text style={styles.resultText}>{currentNumber}</Text>
            </View>
            <View style={styles.buttons}>
                {buttons.map((button) => 
                    button === '=' ? // Mapeamento do botão =
                    <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#3dd0e3'}]}>
                    <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
                    </TouchableOpacity>
                    : // Mapeamento dos outros botões
                    <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
                        <Text style={[styles.textButton, {color: typeof(button) === 'number' ? 'black': '#0093a6'}]}>{button}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}