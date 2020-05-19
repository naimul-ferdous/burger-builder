import React, {Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    
    return class extends Component {
        state= {
            error: null
        }
        componentWillMount() {
            axios.interceptors.request.use(req=> {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(response=> response, error=> {
                this.setState({error: error});
            });
        }
        errorConfirmedHandler= ()=> {
            this.setState({error: null});
        }
        render() {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.mesasge : null}

                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
};

export default withErrorHandler;