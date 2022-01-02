import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const DataContext = React.createContext();

class DataProvider extends Component {
    state = {

        detected_emotion: '',

        loading: false,
        authLoading: false,
        sendLoading: false,

        alertMsg: '',
        alertSeverity:'',
    };

    componentDidMount() {

    }
    
    showAlert = (msg, severity) => {
        this.setState({ 
            alertMsg: msg,
            alertSeverity: severity
        });
    }
    hideAlerts = () => {
        this.setState({ 
            alertMsg: '',
            alertSeverity: ''
        });
    }

    render() {
        return (
            <DataContext.Provider 
                value={{
                    ...this.state,
                    showAlert: this.showAlert,
                    hideAlerts: this.hideAlerts
                }} 
            >
                {this.props.children}
            </DataContext.Provider>
        );
    }
}

const DataConsumer = DataContext.Consumer;

export {DataProvider, DataConsumer, DataContext};
