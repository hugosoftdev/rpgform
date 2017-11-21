import React from 'react';
import { PropTypes } from 'prop-types';
import Autosuggest from 'react-autosuggest';


export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
        };

        // bindings
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.filterSuggestions = this.filterSuggestions.bind(this);
        this.renderSuggestionItem = this.renderSuggestionItem.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    }

    onChange(event, { newValue }) {
        this.setState({
            value: newValue,
        });
    }

    onSuggestionsFetchRequested({ value }) {
        this.setState({
            suggestions: this.filterSuggestions(value, this.props.data),
        });
    }

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: [],
        });
    }

    onSuggestionSelected(event, { suggestion }) {
        this.props.handleDataSelection(suggestion);
        this.setState({ value: '' });
    }


    // functions:

    // suggestion logic and parsing
    filterSuggestions(input, suggestionList) {
        const inputValue = input.trim().toLowerCase();
        const inputLength = inputValue.length;

        // return a filtered array containing only the valid strings
        return inputLength === 0 ? [] : suggestionList.filter(
            suggestion =>
                // checks if each element on the array is equivalent to the input prior to input length
                suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    // tells how to render each suggestion
    renderSuggestionItem(suggestion) {
        return (
            <div> {suggestion.name} </div>
        );
    }


    render() {
        const inputProps = {
            placeholder: 'name of the group',
            value: this.state.value,
            onChange: this.onChange,
        };
        return (
            <div id='react-autosuggest-TitleHolder'>
                <div id='react-autosuggest-Div'>
                    <Autosuggest
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionHighlighted={this.props.onSuggestionHighlighted}
                        getSuggestionValue={suggestion => suggestion.name}
                        renderSuggestion={this.renderSuggestionItem}
                        onSuggestionSelected={this.onSuggestionSelected}
                        alwaysRenderSuggestions={true}
                        highlightFirstSuggestion={false}
                        inputProps={inputProps}
                        placeholder='name of the group'
                    />
                    <div style={{ paddingBottom: '10px' }}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    data: PropTypes.array.isRequired,
    handleDataSelection: PropTypes.func.isRequired,
    onSuggestionHighlighted: PropTypes.func,
};
