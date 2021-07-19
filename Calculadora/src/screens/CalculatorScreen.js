import React, { useState } from 'react'
import { Text, View, TouchableOpacity, } from 'react-native'
import styles from '../styles/styles'

module.exports = function CalculatorScreen(){
    // Mapeamento de teclas
    const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "x", 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '=']
    const [currentNumber, setCurrentNumber] = useState("")
    const [lastNumber, setLastNumber] = useState("")
    const operators = ['+', '-', 'x', '/', '%']

    function _isOperator(operator){
        return operators.includes(operator)
    }

    function calculator(params={ operatorPressed: '' }){
        const splitNumbers = currentNumber.split(' ')
        const firstNumber = parseFloat(splitNumbers[0])
        const operator = splitNumbers[1]
        const lastNumber = splitNumbers[2] !== '-' ? parseFloat(splitNumbers[2]) : 0 //Ajusta erro de calculo caso lastNumber == '-'

        //Validação
        if(operator !== '%'){
            if(!firstNumber) if(!splitNumbers[0].includes('0') && splitNumbers[2] !== '-') return
            if(!lastNumber) if(!splitNumbers[2].includes('0') && splitNumbers[2] !== '-') return
        }

        console.log("2 => " + lastNumber)
        // Faz ação referente tecla pressionada
        setLastNumber(`${firstNumber} ${operator} ${lastNumber ? lastNumber : ''} = `)
        switch(operator){
            case '+':
                setCurrentNumber(`${(firstNumber + lastNumber).toString()}${params.operatorPressed ? ` ${params.operatorPressed} ` : ''}`)
                return
            case '-':
                setCurrentNumber(`${(firstNumber - lastNumber).toString()}${params.operatorPressed ? ` ${params.operatorPressed} ` : ''}`)
                return
            case 'x':
                setCurrentNumber(`${(firstNumber * lastNumber).toString()}${params.operatorPressed ? ` ${params.operatorPressed} ` : ''}`)
                return
            case '%':
                //DIVIDE POR 0
                let result = 0
                if(!lastNumber && !splitNumbers[2].includes('0') && splitNumbers[2] !== '-')
                    result = firstNumber / 100
                else
                    result = lastNumber / 100 * firstNumber
                setCurrentNumber(`${result}${params.operatorPressed ? ` ${params.operatorPressed} ` : ''}`)
                return
            case '/':
                //DIVIDE POR 0
                const resultDiv = (firstNumber / lastNumber);
                if((!resultDiv && !resultDiv.toString().includes('0')) || !Number.isFinite(resultDiv)){
                    setLastNumber("Error")
                    setCurrentNumber("")
                    return
                }
                setCurrentNumber(`${resultDiv.toString()}${params.operatorPressed ? ` ${params.operatorPressed} ` : ''}`)
                return
        }
    }

    function handleInput(buttonPressed){
        console.log(buttonPressed) // Mostra no Console a tecla pressionada
        const values = currentNumber.split(' ')
        const lastPartOfCurrentNumber = currentNumber.substring(currentNumber.length - 1, currentNumber.length)
        //LIMITE CASO QUEIRA
        //if(values.length == 1 && values[0].length >= 20) return
        //ALGUNS BOTÕES
        switch(buttonPressed){
            case 'DEL':
                setCurrentNumber(currentNumber.substring(0, (currentNumber.length -
                    (((values.length == 2) || (values.length > 2 && values[2] === '')) ? 3 : (values.length > 2 && values[2] === '-') ? 4 : 1)
                )))
                return
            case 'LIMPAR': // Limpa todo o conteúdo
                setLastNumber("") 
                setCurrentNumber("") 
                return
            case '=':
                if((values.length > 2 && values[2]) || (values.length > 1 && values[1] === '%')) calculator()
                return
            case '.':
                if(!(lastPartOfCurrentNumber === '.'))
                    if(lastPartOfCurrentNumber === ' ' || lastPartOfCurrentNumber === '' || lastPartOfCurrentNumber === '-'){
                        setCurrentNumber(`${currentNumber}0${buttonPressed}`)
                    }else{
                        let indexNow = 0
                        if(values.length > 2) indexNow = 2
                        if(!values[indexNow].includes('.')) break
                    }
                return
            case '+/-':
                if(values.length == 1){
                    if(!values[0]) setCurrentNumber('-')
                    else if(values[0].startsWith('-')) setCurrentNumber(currentNumber.substr(1, currentNumber.length))
                    else setCurrentNumber(`-${currentNumber}`)
                }else{
                    if(values.length > 2){
                        if(!values[2]) setCurrentNumber(`${values[0]} ${values[1]} -`)
                        if(values[2].startsWith('-')) setCurrentNumber(`${values[0]} ${values[1]} ${values[2].substr(1, values[2].length)}`)
                        else setCurrentNumber(`${values[0]} ${values[1]} -${values[2]}`)
                    }
                }
                return
        }
        //Operator
        if(_isOperator(buttonPressed)){
            //Validações
            if(values.length <= 0) return
            if(!values[0] || !parseFloat(values[0])) if(!values[0].includes('0')) return
            if((values.length == 2 || (values.length == 3 ? !values[2] : false)) && _isOperator(values[1])){ //replace
                setCurrentNumber(`${currentNumber.substring(0, (currentNumber.length - 3))} ${buttonPressed} `)
                return
            }
            //faz a conta se já tem outra conta
            if(values.length > 2) calculator({operatorPressed: buttonPressed})
            //inserção do operador
            else if(values.length > 0) setCurrentNumber(currentNumber + " " + buttonPressed + " ")
            return
        }
        //MAXLENGHT FOR NUMBERS CASO QUEIRA
        // if(values.length == 1){
        //     if(values[0].length >= 10) return
        // }else if(values.length > 2){
        //     if(values[2].length >= 10) return
        // }
        setCurrentNumber(`${currentNumber}${buttonPressed}`)
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
                        <TouchableOpacity activeOpacity={0.7} onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#1f0033'}]}>
                            <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
                        </TouchableOpacity>
                    : // Mapeamento dos outros botões
                        <TouchableOpacity activeOpacity={0.9} onPress={() => handleInput(button)} key={button} style={styles.button}>
                            <Text style={[styles.textButton, {color: typeof(button) === 'number' ? '#ddd': '#777'}]}>{button}</Text>
                        </TouchableOpacity>
                )}
            </View>
        </View>
    )
}