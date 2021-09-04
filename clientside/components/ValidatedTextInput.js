import React, { Component } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import ThemedListItem from 'react-native-elements/dist/list/ListItem';
import { COLORS, BOX } from '../stylesheets/theme'

export default class ValidatedTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: this.props.style
        };
    }

    checkValidation(input) {
        const { pattern } = this.props;
        if (!pattern) return true;

        // string pattern, one validation rule
        if (typeof pattern === 'string') {
            const condition = new RegExp(pattern, 'g')
            return condition.test(input);
        }

        // array patterns, multiple validation rules
        if (typeof pattern === 'object') { 
            const conditions = pattern.map(rule => new RegExp(rule, 'g')); 
            return conditions.map(condition => condition.test(input)); 
        } 
    }

    onChange(input)  {
        const { onChangeText, style } = this.props;
        const isValid = this.checkValidation(input);

        onChangeText(input);
        console.log(isValid)

        if (!isValid) {
            this.state.style = [style, {borderColor: "red"}]
        } else {
            this.state.style = [style, {borderColor: "green"}]
        }
    }



    render() {
        const {
            pattern, 
            value,
            onChangeText,
            placeholder,
            ...props
        } = this.props;

        const {
            style
        } = this.state

        const validated = true;

        return (
            <TextInput
                style={style}
                onChangeText={value => this.onChange(value)}
                value={value}
                placeholder={placeholder}
            />
        )
    }
}

