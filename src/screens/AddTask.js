import React, { Component } from "react"
import { Text, View, Platform,TextInput,TouchableOpacity,
         TouchableWithoutFeedback, Modal, StyleSheet } from "react-native"
import commonStyles from "../commonStyles"

import DateTimePicker from '@react-native-community/datetimepicker'
import moment from "moment"

const initialState = { desc: '', date: new Date(), showDatePicker: false}

export default class AddTask extends Component{
    
    state = {...initialState}

    getDatePicker = () => {
        let datePicker = <DateTimePicker 
                value={this.state.date}
                locale={'pt'}
                onChange={(_,date)=> this.setState({ date, showDatePicker: false })}
                mode='date'
                />
        
        const dateString = moment(this.state.date).format('ddd, DD [de] MMMM [de] YYYY')
        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={()=>this.setState({showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        // Se o método existir no pai envia os dados da tarefa para o pai
        this.props.onSave && this.props.onSave(newTask)

        this.setState({...initialState})
    }
    
    render(){
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType="slide"
            >

                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}
                >
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TouchableOpacity>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Informe a descrição" 
                            value={this.state.desc}
                            onChangeText={desc => this.setState({desc})}
                        />
                        {this.getDatePicker()}
                        <View style={styles.buttons}>
                            <TouchableOpacity 
                                onPress={this.props.onCancel}>

                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.save} >
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}
                >
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        flex: 2,
        backgroundColor: '#fff'
    },
    header:{
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secundary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input:{
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button:{
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    date:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 10,
    }
})